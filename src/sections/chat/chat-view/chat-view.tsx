import React, { useState, useEffect, useRef } from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import './colors.css';
import './chat-styles.css';

export function ChatBot() {
  const [userMessages, setUserMessages] = useState<string[]>([]);
  const [botReplies, setBotReplies] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [thinkingDots, setThinkingDots] = useState('');

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setThinkingDots((prev) => (prev.length < 10 ? `${prev} .` : '.'));
      }, 300);
      return () => clearInterval(interval);
    }
    return undefined;
  }, [loading]);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [userMessages, botReplies]);
  const handleSend = async () => {
    if (inputValue.trim() === '') return;

    setUserMessages([...userMessages, inputValue]);
    setBotReplies([...botReplies, '']);
    setInputValue('');
    setLoading(true);

    try {
      const response = await fetchBotReply(inputValue);

      setBotReplies((prevReplies) => {
        const newReplies = [...prevReplies];
        newReplies[newReplies.length - 1] = response.status
          ? "I'm sorry, I couldn't process your request at the moment."
          : response.answer;
        return newReplies;
      });
    } catch (error) {
      console.error('Error in handleSend:', error);
      setBotReplies((prevReplies) => {
        const newReplies = [...prevReplies];
        newReplies[newReplies.length - 1] =
          "I'm sorry, an error occurred while processing your request.";
        return newReplies;
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchBotReply = async (question: string) => {
    try {
      const response = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      return { answer: data.answer };
    } catch (error) {
      console.error('Error fetching bot reply:', error);
      return {
        answer: "I'm sorry, I couldn't process your request at the moment.",
        status: 'error',
      };
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <Box className="chat-wrapper">
      <Box className="chat-container" ref={chatContainerRef}>
        {userMessages.map((msg, index) => (
          <React.Fragment key={index}>
            <Paper className="message-box right">
              <Typography>{msg}</Typography>
            </Paper>
            {index < botReplies.length - 1 || !loading ? (
              <Paper className="message-box left">
                <Typography>{botReplies[index]}</Typography>
              </Paper>
            ) : null}
          </React.Fragment>
        ))}

        {loading && (
          <Paper className="message-box left">
            <Typography>{thinkingDots}</Typography>
          </Paper>
        )}
      </Box>

      <Box className="chat-input-container">
        <TextField
          className="chat-input"
          fullWidth
          variant="outlined"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type your message..."
        />
        <Button className="send-button" variant="contained" onClick={handleSend} disabled={loading}>
          Send
        </Button>
      </Box>
    </Box>
  );
}
