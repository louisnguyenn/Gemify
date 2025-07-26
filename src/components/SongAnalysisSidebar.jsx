import { useState, useRef, useEffect } from 'react';
import { FormControl, Button } from 'react-bootstrap';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const SongAnalysisSidebar = ({ isOpen, onClose }) => {
  const [songQuery, setSongQuery] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const analyzeSong = async () => {
    if (!songQuery.trim()) return;

    const userMessage = songQuery;
    setSongQuery('');
    setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
    setIsLoading(true);

    try {
      const prompt = `You are a knowledgeable music expert. The user asks: "${userMessage}"
                     Please provide detailed insights about:
                     - Musical elements (if relevant)
                     - Lyrics meaning and interpretation (if relevant)
                     - Historical or cultural context (if relevant)
                     - Technical aspects (if relevant)
                     - Information about the artist (if relevant)
                     - Information about the album (if relevant)
                     - Information about the song (if relevant)
                     Keep the response very short, concise, simple, easy to read and understand, and all in one paragraph. Do not use markdown.`;

        const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + API_KEY, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        throw new Error(errorData.error?.message || 'API request failed');
      }

      const data = await response.json();
      console.log('API Response:', data);
      
      const formattedResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      
      setMessages(prev => [...prev, { text: formattedResponse, isUser: false }]);
    } catch (error) {
      console.error('Error analyzing with Gemini:', error);
      setMessages(prev => [...prev, { 
        text: 'Sorry, I encountered an error while analyzing your query. Please try again.',
        isUser: false 
      }]);
    }
    setIsLoading(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      analyzeSong();
    }
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-content">
        {messages.length === 0 && (
          <div className="message ai-message">
            Hi! I'm your music analysis assistant. Ask me anything about songs, artists, lyrics, or music theory!
          </div>
        )}
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.isUser ? 'user-message' : 'ai-message'}`}
          >
            {message.text}
          </div>
        ))}
        {isLoading && (
          <div className="message ai-message">
            Thinking...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="sidebar-input-area">
        <div className="input-container">
          <FormControl
            as="textarea"
            rows={2}
            placeholder="Ask anything"
            value={songQuery}
            onChange={(e) => setSongQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="chat-input"
          />
          <Button 
            onClick={analyzeSong}
            disabled={isLoading}
            className="send-button"
          >
            →
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SongAnalysisSidebar;
