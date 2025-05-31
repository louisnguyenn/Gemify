# 🎧 Gemify

Gemify is a modern web application that allows users to explore music in a smarter way. By integrating the **Spotify API** and **Gemini API**, Gemify lets users search for artists, view their albums, track listings, and release dates — and even chat with an AI music expert for song recommendations or detailed artist insights.

---

## 🚀 Features

- 🔍 **Search by Artist**  
  Quickly search for any music artist using the Spotify API.

- 💿 **View Albums and Tracks**  
  Instantly view all albums released by the artist, along with:
  - Album names  
  - Track listings  
  - Release dates

- 🤖 **Chat with Gemini AI**  
  Ask the chatbot anything like:
  - “What’s the meaning behind this song?”  
  - “Can you recommend songs similar to this artist?”  
  - “Tell me about the artist’s musical style or history”

  Powered by **Gemini API** with custom prompt engineering for insightful and context-aware responses.

---

## 🛠️ Technologies Used

- **React.js** – Frontend framework  
- **Spotify Web API** – To fetch artist, album, and track data  
- **Gemini API (Google AI)** – For AI-powered music insights  
- **Prompt Engineering** – To optimize chatbot responses  
- **Bootstrap / CSS** – For UI and styling

---

## 🔑 Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/gemify.git
   cd gemify
   
2. Install dependencies:
   npm install
   
3. Create a .env file in the root with the following:
   VITE_SPOTIFY_CLIENT_ID=your_spotify_client_id
   VITE_SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
   VITE_GEMINI_API_KEY=your_gemini_api_key

4. Run the app:
   npm run dev

## 🙌 Credits
Created by Louis Nguyen
Powered by Spotify and Google Gemini APIs
Template used from CodeDex
