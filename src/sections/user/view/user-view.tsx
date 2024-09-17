import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Paper, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';

interface MessageBoxProps {
  align: 'left' | 'right';
}

const ChatContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  height: '80vh',
  overflowY: 'auto',
  padding: '16px',
  border: '1px solid #ccc',
  borderRadius: '8px',
});

const MessageBox = styled(Paper)<MessageBoxProps>(({ theme, align }) => ({
  padding: '8px 16px',
  margin: '8px 0',
  maxWidth: '60%',
  alignSelf: align === 'right' ? 'flex-end' : 'flex-start',
  backgroundColor: align === 'right' ? theme.palette.primary.light : theme.palette.grey[200],
}));

const ChatInputContainer = styled(Box)({
  display: 'flex',
  marginTop: '16px',
});

export function ChatBot() {
  const [userMessages, setUserMessages] = useState<string[]>([]);
  const [botReplies, setBotReplies] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (inputValue.trim() === '') return;

    setUserMessages([...userMessages, inputValue]);
    setBotReplies([...botReplies, '......']);
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

  return (
    <Box>
      <ChatContainer>
        {userMessages.map((msg, index) => (
          <React.Fragment key={index}>
            <MessageBox align="right">
              <Typography>{msg}</Typography>
            </MessageBox>
            <MessageBox align="left">
              <Typography>{botReplies[index]}</Typography>
            </MessageBox>
          </React.Fragment>
        ))}

        {loading && (
          <MessageBox align="left">
            <CircularProgress size={20} />
          </MessageBox>
        )}
      </ChatContainer>

      <ChatInputContainer>
        <TextField
          fullWidth
          variant="outlined"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your message..."
        />
        <Button variant="contained" color="primary" onClick={handleSend} disabled={loading}>
          Send
        </Button>
      </ChatInputContainer>
    </Box>
  );
}
