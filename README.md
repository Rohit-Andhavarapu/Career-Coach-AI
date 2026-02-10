# AI Career Coach & Interviewer

A professional, AI-driven interview simulation tool designed to help candidates practice for Technical and Behavioral job interviews. Built with **React**, **TypeScript**, **Tailwind CSS**, and the **Google Gemini API**, this application offers a realistic interview experience with detailed feedback and performance analytics.

![App Screenshot](https://via.placeholder.com/800x450.png?text=AI+Career+Coach+Interface)

## ✨ Features

*   **Customizable Interviews**: Define your target role (e.g., "Senior React Developer"), experience level (Beginner to Advanced), and interview mode.
*   **Three Interview Modes**:
    *   **Technical**: Focuses on hard skills, coding concepts, and system design.
    *   **HR / Behavioral**: Focuses on soft skills, culture fit, and situational questions.
    *   **Mixed**: A balanced combination of both.
*   **Resume Context**: Optionally paste your resume summary to get questions tailored specifically to your background.
*   **Realistic AI Persona**: The AI adapts its tone and difficulty based on your responses, asking relevant follow-up questions.
*   **Comprehensive Feedback**: Generates a detailed report at the end of the session, including:
    *   Radar Chart visualizing key metrics (Technical Accuracy, Communication, Confidence).
    *   Bullet-pointed Strengths and Areas for Improvement.
    *   Hiring Recommendation (Strong Hire, Hire, Consider, No Hire).
*   **Minimalist Design**: A clean, distraction-free UI using a Zinc/Neutral color palette and Inter typography.

## 🛠️ Tech Stack

*   **Frontend**: React 19, TypeScript, Vite (implied)
*   **Styling**: Tailwind CSS
*   **AI Integration**: Google Gemini API (`@google/genai`)
*   **Visualization**: Recharts
*   **Font**: Inter (Google Fonts)

## 🚀 Getting Started

### Prerequisites

*   Node.js (v16 or higher)
*   npm or yarn
*   A **Google Gemini API Key** (Get one at [Google AI Studio](https://aistudio.google.com/))

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/ai-career-coach.git
    cd ai-career-coach
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**
    This project expects the API key to be available via `process.env.API_KEY`.
    
    *If using Vite:*
    Create a `.env` file in the root directory:
    ```env
    VITE_API_KEY=your_actual_api_key_here
    ```
    *(Note: You may need to adjust `services/geminiService.ts` to read `import.meta.env.VITE_API_KEY` depending on your bundler, or use a bundler that polyfills `process.env`).*

4.  **Run the application**
    ```bash
    npm start
    # or
    npm run dev
    ```

5.  **Open in Browser**
    Navigate to `http://localhost:5173` (or the port shown in your terminal).

## 📖 How to Use

1.  **Setup**: Enter your Name, Target Role, and select your Experience Level.
2.  **Resume**: (Optional) Paste your resume summary to tailor the questions.
3.  **Start**: Click "Begin Interview."
4.  **The Interview**: Answer the AI's questions. It will ask follow-ups based on your replies.
5.  **Finish**: Click "End & Get Feedback" (or wait for the question limit).
6.  **Review**: Analyze your scores, read the detailed feedback, and see if you got the job!

## 📂 Project Structure
