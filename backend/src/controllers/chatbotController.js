import ChatbotConversation from '../models/ChatbotConversation.js';
import KnowledgeBase from '../models/KnowledgeBase.js';
import Groq from 'groq-sdk';

import Appointment from '../models/Appointment.js';
import Lead from '../models/Lead.js';
import Ticket from '../models/Ticket.js';
import { sendEmail } from '../utils/email.js';
import { createGoogleMeetEvent } from '../utils/googleMeet.js';

export const handleChatbotMessage = async (req, res) => {
  try {
    const { sessionId, message, userName, userEmail } = req.body;
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
      // 1. LOCAL KNOWLEDGE BASE SEARCH FIRST
      const kbArticles = await KnowledgeBase.find({ status: 'published' });
      let matchedArticle = null;
      
      // Simple offline search matching words
      for (let article of kbArticles) {
        const qClean = article.question.toLowerCase().replace(/[^a-z0-9 ]/g, '').trim(); 
        const msgClean = msgLower.replace(/[^a-z0-9 ]/g, '').trim();
        
        // Only match if the question is substantial and is found in the message, or vice-versa, but safely.
        if (qClean.length > 5 && (msgClean === qClean || msgClean.includes(qClean))) {
          matchedArticle = article;
          break;
        }
      }

      if (matchedArticle) {
        // We found an answer in the KB! Skip Groq entirely to save time/money
        reply = matchedArticle.answer;
        intent = 'support';
      } else {
        // 2. NO LOCAL MATCH -> USE GROQ AI for intent routing and complex answers
        try {
          let kbContext = "KNOWLEDGE BASE:\n";
          if (kbArticles.length > 0) {
            kbArticles.forEach(a => {
              kbContext += `Q: ${a.question}\nA: ${a.answer}\n\n`;
            });
          } else {
            kbContext += "No articles published yet.\n";
          }

          const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
          
          const currentDate = new Date();
          const currentDateStr = currentDate.toISOString().split('T')[0];
          const currentTimeStr = currentDate.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata' });

          const systemPrompt = `You are a helpful customer support and appointment booking chatbot.

${kbContext}

USER INFO: 
Name: ${userName || "Unknown"}
Email: ${userEmail || "Unknown"}
Current Date: ${currentDateStr}
Current Time: ${currentTimeStr}

INSTRUCTIONS:
You are chatting with a user. You MUST ALWAYS return ONLY a valid JSON object.
Use the Current Date and Time to calculate relative dates (e.g. "tomorrow", "next monday").

CRITICAL RULE: If Name and Email are provided in USER INFO (i.e. they are not "Unknown"), YOU ALREADY HAVE THEM! DO NOT ask the user for their name or email under ANY circumstances.
CRITICAL RULE 2: NEVER ask for multiple pieces of missing information at once. Always ask for exactly ONE missing detail at a time (e.g., if both Name and Email are missing, ask ONLY for Name first. Never ask "What is your name and email?").

1. BOOKING AN APPOINTMENT: You need EXACTLY 4 details: Name, Email, Date (YYYY-MM-DD), Time (HH:MM).
   - STEP A: ALWAYS check USER INFO. If Name/Email are present, automatically use them. DO NOT ask the user to provide them.
   - STEP B: Read the ENTIRE chat history. If the user ALREADY provided their Name, Email, Date, or Time, REMEMBER IT. DO NOT ASK FOR IT AGAIN!
   - STEP C: If details are still missing, return intent: "booking_in_progress" and ask for ONLY ONE missing detail at a time.
   - STEP D: If you have ALL 4 details, IMMEDIATELY return intent: "book_appointment" and include "bookingData".

2. CAPTURING A LEAD (Pricing/Sales/Demo): You need EXACTLY 4 details: Name, Email, Phone, Interest.
   - Name and Email MUST be taken from USER INFO if present. DO NOT ASK FOR THEM.
   - If details are missing, return intent: "lead_in_progress" and ask for ONLY ONE missing detail at a time.
   - If you have ALL 4 details, return intent: "capture_lead" and include "leadData".

3. CREATING A SUPPORT TICKET: You need EXACTLY 4 details: Name, Email, Category, Message.
   - Name and Email MUST be taken from USER INFO if present. DO NOT ASK FOR THEM.
   - If details are missing, return intent: "ticket_in_progress" and ask for ONLY ONE missing detail at a time.
   - If you have ALL 4 details, return intent: "create_ticket" and include "ticketData".

4. CHECK TICKET STATUS: If the user asks about their ticket status:
   - If Email is NOT in USER INFO ("Unknown"), return intent: "support" and reply EXACTLY: "Please log in to view your account details."
   - If Email is in USER INFO, ask for Ticket ID (if not provided). Return intent: "check_ticket_status". If provided, include "ticketId".
   
5. CHECK APPOINTMENT: If the user asks about their appointment date or status:
   - If Email is NOT in USER INFO ("Unknown"), return intent: "support" and reply EXACTLY: "Please log in to view your account details."
   - If Email is in USER INFO, return intent: "check_appointment" and include "email" from USER INFO.

6. GENERAL SUPPORT/CHITCHAT: Answer politely. Return intent: "support".

7. KNOWLEDGE BASE / Q&A: 
   - Answer from KNOWLEDGE BASE if possible. 
   - STRICT RULE: If the user asks a general question, a programming question (like "what is python"), or anything UNRELATED to SupportFlow, our website, or our services, YOU MUST REFUSE TO ANSWER. Politely explain that you are a customer support bot for SupportFlow and can only answer questions related to our services. Return intent: "support".
   - If it's a specific question related to the website but you don't know the answer, return intent: "unknown_query".

8. CHECK HISTORY: If the user asks for their history (e.g. "my history", past tickets, appointments, "history"):
   - If Email is in USER INFO (not "Unknown"), return intent: "check_history".
   - If Email is NOT in USER INFO ("Unknown"), return intent: "support" and reply EXACTLY: "Please log in to view your history."

CRITICAL: Return ONLY JSON matching these formats:
{"intent": "booking_in_progress", "reply": "What time would you like to book?"}
{"intent": "book_appointment", "reply": "Your appointment is booked!", "bookingData": {"name": "John", "email": "j@ex.com", "date": "2026-07-01", "time": "14:30"}}
{"intent": "lead_in_progress", "reply": "What is your phone number?"}
{"intent": "capture_lead", "reply": "Thanks!", "leadData": {"name": "Rahul", "email": "r@ex.com", "phone": "1234567890", "interest": "pricing"}}
{"intent": "ticket_in_progress", "reply": "Could you provide your email?"}
{"intent": "create_ticket", "reply": "Created!", "ticketData": {"name": "Alice", "email": "a@ex.com", "category": "bug", "message": "Login fails"}}
{"intent": "check_ticket_status", "reply": "What is your Ticket ID?", "ticketId": "TCK-1234"}
{"intent": "check_appointment", "reply": "Checking your appointments...", "email": "j@ex.com"}
{"intent": "check_history", "reply": "Checking your history..."}
{"intent": "support", "reply": "The answer is..."}
{"intent": "unknown_query", "reply": "I don't have information about that."}`;

        const messages = [{ role: "system", content: systemPrompt }];
        conversation.messages.forEach(m => {
          messages.push({ role: m.role === 'user' ? 'user' : 'assistant', content: m.text });
        });
        messages.push({ role: "user", content: `CURRENT MESSAGE: ${message}\n\n(Remember: You MUST return ONLY a JSON object and NOTHING else.)` });

        const chatCompletion = await groq.chat.completions.create({
          messages: messages,
          model: "llama-3.3-70b-versatile",
          response_format: { type: "json_object" }
        });

        const responseText = chatCompletion.choices[0]?.message?.content || "";
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (!jsonMatch) throw new Error("No JSON found");
        
        const parsed = JSON.parse(jsonMatch[0]);
        reply = parsed.reply;
        if (parsed.intent) intent = parsed.intent;

        if (intent === 'book_appointment' && parsed.bookingData) {
          const { name, email, date, time } = parsed.bookingData;
          const dateTime = new Date(`${date}T${time}:00+05:30`);
          
          if (dateTime < new Date()) {
            intent = 'booking_in_progress';
            reply = 'The time you selected is in the past. Please choose a future date and time for your appointment.';
          } else {
            let meetingLink = await createGoogleMeetEvent({ serviceType: "Chatbot Booking", customerName: name, email, dateTime });
            
            if (!meetingLink) {
              const uniqueRoomId = Math.random().toString(36).substring(2, 12) + Math.random().toString(36).substring(2, 12);
              meetingLink = `https://meet.jit.si/SmartSupport-${uniqueRoomId}`;
            }

            await Appointment.create({
              customerName: name,
              email: email,
              dateTime: dateTime,
              meetingLink: meetingLink,
              status: 'Pending'
            });

            // Send instant confirmation email
            const emailSubject = 'Booking Confirmation - SmartSupport AI';
            const emailBody = `Hi ${name},\n\nWe have received your booking request via our Virtual Assistant.\n\nDate & Time: ${dateTime.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' })}\nMeeting Link: ${meetingLink}\n\nOur team will review this and confirm shortly. You will receive a reminder 24 hours before the meeting.\n\nBest,\nSupportFlow AI Team`;
            
            sendEmail(email, emailSubject, emailBody).catch(e => console.error('Failed to send booking email from chatbot:', e));
          }
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
          if (!userEmail || userEmail === 'Unknown') {
            reply = "Please log in to view your account details.";
          } else {
            const ticket = await Ticket.findOne({ ticketId: parsed.ticketId.toUpperCase() });
            if (ticket) {
              reply = `The status of your ticket ${ticket.ticketId} is currently: ${ticket.status}.`;
            } else {
              reply = `I could not find a ticket with the ID ${parsed.ticketId}. Please check the ID and try again.`;
            }
          }
        }
        
        // Handle checking appointment
        if (intent === 'check_appointment' && parsed.email) {
          if (!userEmail || userEmail === 'Unknown') {
            reply = "Please log in to view your account details.";
          } else {
            const emailToCheck = (parsed.email && parsed.email.toLowerCase() !== 'unknown') ? parsed.email.toLowerCase() : userEmail.toLowerCase();
            
            if (emailToCheck !== userEmail.toLowerCase()) {
              reply = "It is not your email id.";
            } else {
              const appointment = await Appointment.findOne({ email: emailToCheck }).sort({ dateTime: -1 });
              if (appointment) {
                const timeString = appointment.dateTime.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' });
                reply = `You have an appointment on ${timeString}. The status is: ${appointment.status}. You can join using this link: ${appointment.meetingLink}`;
              } else {
                reply = `I could not find any appointments booked under the email ${emailToCheck}.`;
              }
            }
          }
        }

        // Handle checking general history for logged in user
        if (intent === 'check_history') {
          if (userEmail && userEmail !== 'Unknown') {
            const userTickets = await Ticket.find({ customerEmail: userEmail.toLowerCase() }).sort({ createdAt: -1 }).limit(3);
            const userAppointments = await Appointment.find({ email: userEmail.toLowerCase() }).sort({ dateTime: -1 }).limit(3);
            
            let historyReply = "Here is your recent history:\n";
            let hasHistory = false;
            
            if (userTickets.length > 0) {
              hasHistory = true;
              historyReply += `\n**Recent Tickets:**\n` + userTickets.map(t => `- ${t.ticketId}: ${t.status} (${t.subject})`).join('\n');
            }
            if (userAppointments.length > 0) {
              hasHistory = true;
              historyReply += (hasHistory ? `\n\n` : `\n`) + `**Recent Appointments:**\n` + userAppointments.map(a => `- ${new Date(a.dateTime).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' })}: ${a.status}`).join('\n');
            }
            
            if (!hasHistory) {
              reply = "I couldn't find any recent tickets or appointments associated with your email account.";
            } else {
              reply = historyReply;
            }
          } else {
            reply = "Please log in to view your history.";
          }
        }
        
        // Handle unknown query - Save to KB as draft
        if (intent === 'unknown_query') {
          await KnowledgeBase.create({
            title: `Unanswered: ${msgLower.substring(0, 30)}...`,
            question: message,
            answer: "Pending Admin Answer",
            category: "Uncategorized",
            status: "draft"
          });
        }

        } catch (aiError) {
          console.error("Groq API Error:", aiError.message);
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
