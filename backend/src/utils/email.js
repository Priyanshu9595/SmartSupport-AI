import dotenv from 'dotenv';
dotenv.config();

export const sendEmail = async (to, subject, text) => {
  try {
    const apiKey = process.env.API_KEY_FOR_EMAIL;
    
    if (!apiKey) {
      console.warn('API_KEY_FOR_EMAIL is not defined in environment variables.');
    }

    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        sender: {
          name: "SupportFlow AI",
          email: process.env.SENDER_EMAIL || 'priyanshuraj9595@gmail.com'
        },
        to: [{ email: to }],
        subject: subject,
        textContent: text
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Brevo API Error: ${response.status} - ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    console.log('Message sent via Brevo API: %s', data.messageId);
    return data;
  } catch (error) {
    console.error('Error sending email:', error.message || error);
    throw error;
  }
};
