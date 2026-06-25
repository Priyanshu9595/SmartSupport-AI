const postMsg = async (url, body) => {
  const r = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  return r.json();
};

const testBookingFlow = async () => {
  const sessionId = 'test-booking-session-new6';
  const url = 'http://localhost:5000/api/chatbot/message';

  console.log("Turn 1: User provides all details");
  let res = await postMsg(url, { sessionId, message: 'I want to book an appointment. My name is Bob, my email is bob@test.com. The date is 2026-08-15 and the time is 10:30' });
  console.log("AI:", res.reply);
  console.log("Intent:", res.intent, "\n");
};

testBookingFlow().catch(console.error);
