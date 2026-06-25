import Groq from 'groq-sdk';
import dotenv from 'dotenv';
dotenv.config();

const testPrompt = async () => {
  try {
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    let conversationHistory = `Ticket Subject: Ritesh\nDescription: What is the salary of Ritesh my friend?\n\nMessages:\nAdmin User (Agent): 100000\n`;
    
    const prompt = `Based on the following resolved customer support ticket, generate a concise and helpful FAQ (Frequently Asked Question). 
CRITICAL RULES:
1. Return ONLY a valid JSON object with 'question' and 'answer' properties. No other text.
2. The 'answer' MUST contain the exact information provided by the Agent/Admin in the messages. Do NOT censor, filter, or hide information. If the Admin gave a number (e.g. salary, price), you MUST use that exact number in your answer.

${conversationHistory}`;

    console.log("Sending prompt...");
    const chatCompletion = await groq.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "llama-3.1-8b-instant",
    });

    const responseText = chatCompletion.choices[0]?.message?.content || "";
    console.log("RAW OUTPUT:\n", responseText);

    try {
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (!jsonMatch) throw new Error("No JSON found");
        const faqData = JSON.parse(jsonMatch[0]);
        console.log("PARSED SUCCESSFULLY:", faqData);
    } catch (e) {
        console.log("JSON PARSE ERROR:", e.message);
    }

  } catch (error) {
    console.error("FAILED! Error details:", error.message);
  }
};

testPrompt();
