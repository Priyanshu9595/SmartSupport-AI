# SupportFlow AI (SmartSupport AI) 🚀

SupportFlow AI is a modern, full-stack customer support automation platform designed to streamline interactions, reduce manual workload, and provide 24/7 intelligent assistance. Built with a stunning glassmorphic UI, it seamlessly integrates an AI-powered chatbot, ticket management, lead generation, and automated appointment booking.

---

## ✨ Features

- **🤖 Intelligent AI Chatbot**: A 24/7 conversational AI widget that understands context, answers FAQs, and automatically guides users.
- **📚 Self-Updating Knowledge Base**: A central hub for support articles. The AI learns from resolved tickets to suggest new FAQs automatically.
- **🎫 Comprehensive Ticket Management**: Customers can easily submit and track support tickets, while admins have a dedicated dashboard to manage, reply, and resolve issues.
- **🧲 Conversational Lead Capture**: Automatically detects sales intent within chats and seamlessly collects visitor contact details without boring static forms.
- **📅 Automated Appointment Booking**: Allows users to schedule meetings directly through the chat. Generates mock Google Meet links and manages the admin schedule.
- **💎 Modern Glassmorphic UI**: A beautiful, highly responsive, and dynamic user interface built with Tailwind CSS, featuring floating 3D orbs and frosted glass components.

---

## 🛠️ Tech Stack

**Frontend:**
- [React.js](https://reactjs.org/) (Vite)
- [Tailwind CSS](https://tailwindcss.com/) (Styling & Glassmorphism)
- [React Router](https://reactrouter.com/) (Navigation)
- [Lucide React](https://lucide.dev/) (Icons)

**Backend:**
- [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/) (Mongoose ODM)
- [Groq / Google Gemini API](https://groq.com/) (AI & NLP Engine)
- [JWT](https://jwt.io/) (Authentication)
- [Nodemailer](https://nodemailer.com/) (Email Automation)

---

## 🚀 Getting Started (Local Development)

Follow these steps to get the project up and running on your local machine.

### 1. Clone the repository
```bash
git clone https://github.com/Priyanshu9595/SmartSupport-AI.git
cd SmartSupport-AI
```

### 2. Setup the Backend
Open a terminal and navigate to the `backend` directory:
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory with the following variables:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GROQ_API_KEY=your_groq_api_key
EMAIL_USER=your_smtp_email
EMAIL_PASS=your_smtp_password
CLIENT_URL=http://localhost:5173
```

Start the backend server:
```bash
npm run dev
```

### 3. Setup the Frontend
Open a new terminal and navigate to the `frontend` directory:
```bash
cd frontend
npm install
```

Start the frontend development server:
```bash
npm run dev
```

### 4. Access the Application
Open your browser and navigate to `http://localhost:5173/`.

---

## 🌐 Deployment (Render.com)

This application is configured for easy deployment on Render.com.

1. **Backend (Web Service)**: Create a Node Web Service, set the Root Directory to `backend`, Build Command to `npm install`, and Start Command to `npm start`. Add your environment variables.
2. **Frontend (Static Site)**: Create a Static Site, set the Root Directory to `frontend`, Build Command to `npm install && npm run build`, and Publish Directory to `dist`. Add `VITE_API_URL` pointing to your deployed backend.
3. Update the `CLIENT_URL` in your backend environment variables to point to your new frontend URL.

*(Note: The frontend includes a `public/_redirects` file to handle client-side routing natively on Render).*

---

## 📄 License
This project is licensed under the MIT License.
