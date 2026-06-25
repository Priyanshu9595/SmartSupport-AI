import Groq from 'groq-sdk';
import dotenv from 'dotenv';
dotenv.config();

const testPrompt = async () => {
  try {
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    const kbContext = `KNOWLEDGE BASE:\nNo articles published yet.\n`;
    const prompt = `You are an intelligent support agent.
Read the following Knowledge Base. 
Then, read the user's support ticket.
First, if the Knowledge Base provides a direct solution, write a helpful response strictly based on the Knowledge Base.
Second, if the Knowledge Base DOES NOT have the answer, you are allowed to use your general AI knowledge to answer the user's question accurately.
However, if the question requires account-specific details (like billing, passwords, order status) or you truly do not know the answer, you MUST reply exactly with the word: NO_MATCH

${kbContext}

User Ticket Subject: "Age"
User Ticket Description: "What is your age?"`;

    console.log("Sending prompt...");
    const chatCompletion = await groq.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "llama-3.1-8b-instant",
    });

    console.log("SUCCESS! Output:", chatCompletion.choices[0]?.message?.content);
  } catch (error) {
    console.error("FAILED! Error details:", error.message);
  }
};

testPrompt();
