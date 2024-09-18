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
    <Typography
      variant="h6"
      sx={{ fontSize: '16px', padding: '0px 25px', textAlign: 'center' }}
    >
      Ask any question about candidates, their promises, and election details. Our
      AI-powered Election Bot has you covered!
    </Typography>
    <IconButton onClick={onMenuClick}>
      <Icon icon="mdi:menu" width="24" height="24" />
    </IconButton>
  </Box>
);
