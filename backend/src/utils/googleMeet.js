import { google } from 'googleapis';
import dotenv from 'dotenv';
dotenv.config();

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3000/oauth2callback'
);

// Generate a Google Meet Link for an appointment
export const createGoogleMeetEvent = async (appointmentData) => {
  try {
    if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET || !process.env.GOOGLE_REFRESH_TOKEN) {
      return null;
    }

    oauth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN
    });

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    // Ensure proper date objects
    const startTime = new Date(appointmentData.dateTime);
    // Assuming appointments are 1 hour long
    const endTime = new Date(startTime.getTime() + 60 * 60 * 1000);

    const event = {
      summary: `SmartSupport AI - ${appointmentData.serviceType} with ${appointmentData.customerName}`,
      description: `Automated appointment booked via SupportFlow AI.\n\nCustomer Email: ${appointmentData.email}\nPhone: ${appointmentData.phone || 'N/A'}\nService: ${appointmentData.serviceType}`,
      start: {
        dateTime: startTime.toISOString(),
      },
      end: {
        dateTime: endTime.toISOString(),
      },
      conferenceData: {
        createRequest: {
          requestId: `supportflow-${Date.now()}`,
          conferenceSolutionKey: {
            type: 'hangoutsMeet'
          }
        }
      }
    };

    const response = await calendar.events.insert({
      calendarId: 'primary',
      resource: event,
      conferenceDataVersion: 1
    });

    if (response.data && response.data.hangoutLink) {
      return response.data.hangoutLink;
    }
    return null;
  } catch (error) {
    console.error("Error creating Google Meet Event:", error.message);
    return null;
  }
};
