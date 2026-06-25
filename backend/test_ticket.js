import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const postMsg = async (url, body) => {
  const r = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  return r.json();
};

const testTicketFlow = async () => {
  const sessionId = 'test-ticket-session-2';
  const url = 'http://localhost:5000/api/chatbot/message';

  console.log("Turn 3: User provides category");
  let res = await postMsg(url, { sessionId, message: 'payment' });
  console.log("AI:", res.reply);
  console.log("Intent:", res.intent, "\n");
};

testTicketFlow().catch(console.error);
