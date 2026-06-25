import ChatbotConversation from '../models/ChatbotConversation.js';
import KnowledgeBase from '../models/KnowledgeBase.js';
import Groq from 'groq-sdk';

import Appointment from '../models/Appointment.js';
import Lead from '../models/Lead.js';
import Ticket from '../models/Ticket.js';

export const handleChatbotMessage = async (req, res) => {
  try {
    const { sessionId, message } = req.body;
    const msgLower = message.toLowerCase();

    // Fetch conversation history first
    let conversation = await ChatbotConversation.findOne({ sessionId });
    if (!conversation) {
      conversation = new ChatbotConversation({ sessionId, messages: [] });
    }

    let intent = 'support';
    let reply = "I'm a virtual assistant. How can I help you today?";

    // Mock NLP Intent Routing for simple intents (Unresolved only now)
    if (msgLower.includes('human') || msgLower.includes('agent') || msgLower.includes('complain') || msgLower.includes('error')) {
      intent = 'unresolved';
      reply = "I'm sorry you're having trouble. Let me connect you with a human agent. Please fill out this support ticket.";
    }
    else {
      // AI Processing
      try {
        const kbArticles = await KnowledgeBase.find({ status: 'published' });
        let kbContext = "KNOWLEDGE BASE:\n";
        if (kbArticles.length > 0) {
          kbArticles.forEach(a => {
            kbContext += `Q: ${a.question}\nA: ${a.answer}\n\n`;
          });
        } else {
          kbContext += "No articles published yet.\n";
        }

        const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
        const systemPrompt = `You are a helpful customer support and appointment booking chatbot.

${kbContext}

INSTRUCTIONS:
You are chatting with a user. The chat history is provided in the messages above.
1. If the user wants an "Appointment" or book a call, you must collect EXACTLY 4 details: Name, Email, Date (YYYY-MM-DD), Time (HH:MM).
   - CRITICAL: Read the ENTIRE chat history. Do NOT ask for a detail if the user has already provided it!
   - If ANY of the 4 details are still missing, reply by asking for ONLY the missing info. Return intent: "booking_in_progress".
   - If you have collected ALL 4 details, IMMEDIATELY return intent: "book_appointment". Include "bookingData".
2. If the user asks about "Pricing", demo, or sales, they are a LEAD. Collect 4 details: Name, Email, Phone, Interest.
   - Read the chat history. If missing, reply asking for ONLY the missing info. Return intent: "lead_in_progress".
   - If you have ALL 4 details, IMMEDIATELY return intent: "capture_lead". Include "leadData".
3. If the user wants to CREATE A SUPPORT TICKET, collect exactly 4 details: Name, Email, Category, Message.
   - Read chat history. If missing, reply politely asking for ONLY the missing info. Return intent: "ticket_in_progress".
   - If you have ALL 4 details, you MUST IMMEDIATELY return intent: "create_ticket". Include "ticketData".
4. If the user wants to CHECK TICKET STATUS, ask for their Ticket ID. Return intent: "check_ticket_status". If they provide the ID, include it in the JSON as "ticketId".
5. If the user asks a free text question:
   - Level 2: Search the KNOWLEDGE BASE context above. If you find the exact answer, return intent: "support" and the answer.
   - Level 3: If the exact answer is NOT in the KB, DO NOT guess or hallucinate. You MUST politely say you don't have the exact answer and ask them to provide their Name, Email, Category, and Issue to create a support ticket. Return intent: "ticket_in_progress".

CRITICAL: You must ALWAYS return ONLY a valid JSON object matching one of these formats:
Format A: {"intent": "booking_in_progress", "reply": "What time would you like to book?"}
Format B: {"intent": "book_appointment", "reply": "Your appointment is booked!", "bookingData": {"name": "John", "email": "j@ex.com", "date": "2026-07-01", "time": "14:30"}}
Format C: {"intent": "lead_in_progress", "reply": "What is your phone number?"}
Format D: {"intent": "capture_lead", "reply": "Thanks, our sales team will contact you!", "leadData": {"name": "Rahul", "email": "r@ex.com", "phone": "1234567890", "interest": "pricing"}}
Format E: {"intent": "ticket_in_progress", "reply": "Could you provide your email?"}
Format F: {"intent": "create_ticket", "reply": "Your ticket is created!", "ticketData": {"name": "Alice", "email": "a@ex.com", "category": "bug", "message": "Login fails"}}
Format G: {"intent": "check_ticket_status", "reply": "What is your Ticket ID?", "ticketId": "TCK-1234"}
Format H: {"intent": "support", "reply": "The answer is..."}`;

        const messages = [{ role: "system", content: systemPrompt }];
        conversation.messages.forEach(m => {
          messages.push({ role: m.role === 'user' ? 'user' : 'assistant', content: m.text });
        });
        messages.push({ role: "user", content: `CURRENT MESSAGE: ${message}\n\n(Remember: You MUST return ONLY a JSON object and NOTHING else.)` });

        const chatCompletion = await groq.chat.completions.create({
          messages: messages,
          model: "llama-3.3-70b-versatile",
        });

        const responseText = chatCompletion.choices[0]?.message?.content || "";
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (!jsonMatch) throw new Error("No JSON found");
        
        const parsed = JSON.parse(jsonMatch[0]);
        reply = parsed.reply;
        if (parsed.intent) intent = parsed.intent;

        // Handle the actual booking
        if (intent === 'book_appointment' && parsed.bookingData) {
          const { name, email, date, time } = parsed.bookingData;
          const dateTime = new Date(`${date}T${time}`);
          
          await Appointment.create({
            customerName: name,
            email: email,
            dateTime: dateTime,
            meetingLink: `https://meet.google.com/mock-${Math.random().toString(36).substr(2, 6)}`,
            status: 'Pending'
          });
        }

        // Handle the actual lead capture
        if (intent === 'capture_lead' && parsed.leadData) {
          const { name, email, phone, interest } = parsed.leadData;
          await Lead.create({
            name,
            email,
            phone,
            interestedService: interest,
            source: 'chatbot',
            status: 'New'
          });
        }

        // Handle ticket creation
        if (intent === 'create_ticket' && parsed.ticketData) {
          const { name, email, category, message: ticketMessage } = parsed.ticketData;
          const ticketId = 'TCK-' + Math.floor(1000 + Math.random() * 9000);
          await Ticket.create({
            ticketId,
            customerName: name,
            customerEmail: email,
            category: category,
            subject: 'Support Ticket from Chatbot',
            description: ticketMessage,
            status: 'Open',
            priority: 'Medium',
            source: 'chatbot'
          });
          reply = `Your support ticket has been created successfully! Your Ticket ID is: ${ticketId}. Our team will contact you soon.`;
        }

        // Handle checking ticket status
        if (intent === 'check_ticket_status' && parsed.ticketId) {
          const ticket = await Ticket.findOne({ ticketId: parsed.ticketId.toUpperCase() });
          if (ticket) {
            reply = `The status of your ticket ${ticket.ticketId} is currently: ${ticket.status}.`;
          } else {
            reply = `I could not find a ticket with the ID ${parsed.ticketId}. Please check the ID and try again.`;
          }
        }

      } catch (aiError) {
        console.error("Groq API Error (Falling back to Offline AI):", aiError.message);
        import('fs').then(fs => fs.appendFileSync('groq_error.log', aiError.stack + '\n\n'));
        // Fallback KB Search
        const kbArticles = await KnowledgeBase.find({ status: 'published' });
        let matchedArticle = null;
        for (let article of kbArticles) {
          const qClean = article.question.toLowerCase().replace(/[^a-z0-9 ]/g, ''); 
          if (msgLower.includes(qClean)) {
            matchedArticle = article;
            break;
          }
        }
        if (matchedArticle) {
          reply = matchedArticle.answer;
        } else {
          reply = "I'm having trouble connecting to my brain right now. Please submit a support ticket so a human agent can assist you!";
        }
      }
    }

    // Save conversation
    conversation.messages.push({ role: 'user', text: message });
    conversation.messages.push({ role: 'model', text: reply });
    await conversation.save();
    
    res.json({ reply, intent });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getConversations = async (req, res) => {
  try {
    const conversations = await ChatbotConversation.find().sort('-createdAt');
    res.json(conversations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
