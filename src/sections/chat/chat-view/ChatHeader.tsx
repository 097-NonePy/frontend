import React, { MouseEvent, useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { Icon } from '@iconify/react';

interface ChatHeaderProps {
  onMenuClick: (event: React.MouseEvent<HTMLElement>) => void;
  setLanguage: (language: string) => void; // Assuming setLanguage is a function that takes a string and returns void
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ onMenuClick, setLanguage }) => {
  // State to manage the anchor element for the dropdown menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    handleClose();
  };

  return (
    <Box
      className="chat-header"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      padding="10px"
      height="50px"
    >
      <Typography variant="h6" sx={{ fontSize: '16px', padding: '0px 25px', textAlign: 'center' }}>
        Ask any question about candidates, their promises, and election details. Our AI-powered
        Election Bot has you covered!
      </Typography>
      <IconButton onClick={onMenuClick}>
        <Icon icon="mdi:menu" width="24" height="24" />
      </IconButton>
    </Box>
  );
};
