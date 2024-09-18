import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { Icon } from '@iconify/react';

export const ChatHeader = ({
  onMenuClick,
}: {
  onMenuClick: (event: React.MouseEvent<HTMLElement>) => void;
}) => (
  <Box
    className="chat-header"
    display="flex"
    justifyContent="space-between"
    alignItems="center"
    padding="10px"
    height="50px"
  >
    <Typography variant="h6">ChatBot</Typography>
    <IconButton onClick={onMenuClick}>
      <Icon icon="mdi:menu" width="24" height="24" />
    </IconButton>
  </Box>
);
