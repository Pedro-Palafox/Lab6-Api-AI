import { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [apiKey, setApiKey] = useState('');
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [showKey, setShowKey] = useState(false);

  const handleSend = async () => {
    if (!apiKey) {
      alert('Por favor ingresa tu API Key de Gemini');
      return;
    }

    try {
      const res = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          contents: [
            {
              parts: [
                {
                  text: input,
                },
              ],
            },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const result = res.data.candidates?.[0]?.content?.parts?.[0]?.text || 'No se recibió respuesta.';
      setResponse(result);
    } catch (error) {
      console.error(error);
      setResponse(`Error: ${error.response?.data?.error?.message || error.message}`);
    }
  };

  return (
    <div className="container">
      <h1>Gemini AI Interface</h1>
      <p>Create anything you want</p>

      <label>Gemini API Key</label>
      <input
        type={showKey ? 'text' : 'password'}
        placeholder="Enter your Gemini API key here"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
      />
      <button className="show-btn" onClick={() => setShowKey(!showKey)}>
        {showKey ? 'Hide' : 'Show'}
      </button>
      <p className="note">Your API key is stored locally in your browser and never sent to our servers.</p>

      <label>What do you want to do?</label>
      <textarea
        placeholder="Describe what you'd like to do..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button className="send-btn" onClick={handleSend}>Ask</button>

      {response && (
        <div className="response">
          <h3>Response</h3>
          <h6>{response}</h6>
        </div>
      )}
    </div>
  );
}

export default App;
