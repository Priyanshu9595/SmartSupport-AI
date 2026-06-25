import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

const testGemini = async () => {
  try {
    console.log("Using API Key:", process.env.GEMINI_API_KEY.substring(0, 10) + "...");
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const modelsToTest = [
      "gemini-flash-latest",
      "gemini-2.5-flash",
      "gemini-2.0-flash",
      "gemini-1.5-flash-latest"
    ];

    for (const modelName of modelsToTest) {
      try {
        console.log(`Trying ${modelName}...`);
        const m = genAI.getGenerativeModel({ model: modelName });
        const res = await m.generateContent("hello");
        console.log(`SUCCESS with ${modelName}! Response: ${res.response.text()}`);
      } catch(e) { 
        console.error(`Failed ${modelName}:`, e.message); 
      }
    }
  } catch (error) {
    console.error("Gemini Test Failed!");
    console.error(error);
  }
};

testGemini();
