const postMsg = async (url, body) => {
  const r = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  return r.json();
};

const testLeadFlow = async () => {
  const sessionId = 'test-lead-session-2';
  const url = 'http://localhost:5000/api/chatbot/message';

  console.log("Turn 1: User asks for pricing");
  let res = await postMsg(url, { sessionId, message: 'I want pricing' });
  console.log("AI:", res.reply);
  console.log("Intent:", res.intent, "\n");

  console.log("Turn 2: User provides all details");
  res = await postMsg(url, { sessionId, message: 'My name is Alice, email is alice@test.com, phone is 9876543210, and my interest is pricing' });
  console.log("AI:", res.reply);
  console.log("Intent:", res.intent, "\n");
};

testLeadFlow().catch(console.error);
