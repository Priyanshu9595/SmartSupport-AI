import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

const testGemini = async () => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });
    const result = await model.generateContent("Hello!");
    console.log("SUCCESS! Output:", result.response.text());
  } catch (error) {
    console.error("FAILED! Error details:", error.message);
  }
};

testGemini();
