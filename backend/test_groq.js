import Groq from 'groq-sdk';
import dotenv from 'dotenv';
dotenv.config();

const testGroq = async () => {
  try {
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    const messages = [
      { role: "system", content: "You are a test bot." },
      { role: "user", content: "I want to book an appointment" }
    ];

    const chatCompletion = await groq.chat.completions.create({
      messages: messages,
      model: "llama-3.1-8b-instant",
    });

    console.log("SUCCESS:", chatCompletion.choices[0]?.message?.content);
  } catch (e) {
    console.error("GROQ ERROR:", e.message);
  }
};
testGroq();
