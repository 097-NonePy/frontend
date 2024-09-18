import React from 'react';
import { Box, TextField, Button } from '@mui/material';
import { Icon } from '@iconify/react';

export const ChatInput = ({
  value,
  onChange,
  onSend,
  onKeyPress,
  loading,
}: {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onKeyPress: (event: React.KeyboardEvent) => void;
  loading: boolean;
}) => (
  <Box className="chat-input-container">
    <TextField
      className="chat-input"
      fullWidth
      variant="outlined"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onKeyPress}
      placeholder="Type your message..."
    />
    <Button
      className="send-button"
      variant="contained"
      onClick={onSend}
      disabled={loading}
      endIcon={<Icon icon="mdi:send" />}
    >
      Send
    </Button>
  </Box>
);
