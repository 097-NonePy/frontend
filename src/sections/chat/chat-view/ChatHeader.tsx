import React, { MouseEvent, useState } from 'react';
import { Box, Typography, IconButton, Menu, MenuItem, Button } from '@mui/material';
import { Icon } from '@iconify/react';

interface ChatHeaderProps {
  onMenuClick: (event: React.MouseEvent<HTMLElement>) => void;
  setLanguage: (language: string) => void;
  language: string;
}

const languageMapping: { [key: string]: string } = {
  English: 'en',
  Sinhala: 'si',
  Tamil: 'ta',
  Singlish: 'seng',
  'gen z slang': 'slang',
};

const reverseMapping = (obj: { [key: string]: string }): { [key: string]: string } => {
  const reversed: { [key: string]: string } = {};
  Object.entries(obj).forEach(([key, value]) => {
    reversed[value] = key;
  });
  return reversed;
};

const reversedLanguageMapping = reverseMapping(languageMapping);
const getKeyByValue = (value: string): string | undefined => reversedLanguageMapping[value];

export const ChatHeader: React.FC<ChatHeaderProps> = ({ onMenuClick, setLanguage, language }) => {
  // State to manage the anchor element for the dropdown menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (lang: string) => {
    const languageCode = languageMapping[lang];
    setLanguage(languageCode);
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
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        {getKeyByValue(language)}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {['English', 'Sinhala', 'Tamil', 'Singlish', 'gen z slang'].map((lang) => (
          <MenuItem key={lang} onClick={() => handleLanguageChange(lang)}>
            {lang}
          </MenuItem>
        ))}
      </Menu>
      <IconButton onClick={onMenuClick}>
        <Icon icon="mdi:menu" width="24" height="24" />
      </IconButton>
    </Box>
  );
};
