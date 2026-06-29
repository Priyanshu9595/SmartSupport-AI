import { createGoogleMeetEvent } from './src/utils/googleMeet.js';

(async () => {
  console.log("Testing Google Meet creation...");
  const link = await createGoogleMeetEvent({
    serviceType: "Test Service",
    customerName: "Test User",
    email: "test@example.com",
    dateTime: new Date(Date.now() + 86400000).toISOString()
  });
  console.log("Result:", link);
  process.exit();
})();
