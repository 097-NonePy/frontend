import React from 'react';
import { Box, Paper, Typography } from '@mui/material';

export interface Message {
  text: string;
  isUser: boolean;
}

export const ChatMessages = React.forwardRef<
  HTMLDivElement,
  {
    messages: Message[];
    loading: boolean;
    thinkingDots: string;
  }
>(({ messages, loading, thinkingDots }, ref) => (
  <Box className="chat-container" ref={ref}>
    {messages.length === 0 && !loading && (
      <Paper className="message-box left">
        <Typography>
          What would you like to know about candidates, their promises, or election details? Our
          AI-powered Election Bot is here to help!
        </Typography>
      </Paper>
    )}
    {messages.map((msg, index) => (
      <Paper key={index} className={`message-box ${msg.isUser ? 'right' : 'left'}`}>
        <Typography>{msg.text}</Typography>
      </Paper>
    ))}
    {loading && (
      <Paper className="message-box left">
        <Typography>{thinkingDots}</Typography>
      </Paper>
    )}
  </Box>
));
