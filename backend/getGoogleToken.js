import { google } from 'googleapis';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const PORT = 3000;
const REDIRECT_URI = `http://localhost:${PORT}/oauth2callback`;

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  REDIRECT_URI
);

const scopes = [
  'https://www.googleapis.com/auth/calendar.events'
];

const url = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes,
  prompt: 'consent' // Force to get refresh token
});

const app = express();
let server;

app.get('/oauth2callback', async (req, res) => {
  const code = req.query.code;
  if (!code) {
    res.send('No code found in URL.');
    return;
  }

  try {
    const { tokens } = await oauth2Client.getToken(code);
    res.send('<h1>Success!</h1><p>You can close this tab and check your terminal.</p>');
    
    console.log('\n==============================================');
    console.log('SUCCESS! Copy the token below into your backend/.env file:\n');
    console.log(`GOOGLE_REFRESH_TOKEN=${tokens.refresh_token}`);
    console.log('\n(Note: Save it securely. Do not share it.)');
    console.log('==============================================\n');
    
    // Shut down the temporary server
    setTimeout(() => {
      server.close();
      process.exit(0);
    }, 1000);

  } catch (error) {
    res.send('Error retrieving access token: ' + error.message);
    console.error('Error retrieving access token', error);
  }
});

server = app.listen(PORT, () => {
  console.log('\n==============================================');
  console.log('1. Go to your Google Cloud Console > APIs & Services > Credentials');
  console.log('2. Edit your OAuth Client ID');
  console.log(`3. ADD this exact URL to "Authorized redirect URIs": ${REDIRECT_URI}`);
  console.log('4. Save it.');
  console.log('5. Then, visit the following URL to authorize:');
  console.log('\n' + url + '\n');
  console.log('==============================================');
  console.log(`Waiting for authorization on port ${PORT}...`);
});
