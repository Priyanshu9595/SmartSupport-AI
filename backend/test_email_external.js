import { sendEmail } from './src/utils/email.js';

async function test() {
  try {
    await sendEmail('rk5061285@gmail.com', 'Test Email', 'This is a test.');
    console.log('Success');
  } catch (err) {
    console.error('Error:', err);
  }
}
test();
