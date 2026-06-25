import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

const testPrompt = async () => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

    const prompt = `You are an intelligent support agent.
Read the following Knowledge Base. 
Then, read the user's support ticket.
First, if the Knowledge Base provides a direct solution, write a helpful response strictly based on the Knowledge Base.
Second, if the Knowledge Base DOES NOT have the answer, you are allowed to use your general AI knowledge to answer the user's question accurately.
However, if the question requires account-specific details (like billing, passwords, order status) or you truly do not know the answer, you MUST reply exactly with the word: NO_MATCH

KNOWLEDGE BASE:
No articles published yet.

User Ticket Subject: "President"
User Ticket Description: "Who is the President of India?"`;

    console.log("Sending prompt...");
    const result = await model.generateContent(prompt);
    console.log("SUCCESS! Output:", result.response.text());
  } catch (error) {
    console.error("FAILED! Error details:", error.message);
  }
};

testPrompt();
