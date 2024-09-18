import React from 'react';
import { Menu, MenuItem, Collapse, Box } from '@mui/material';
import { Icon } from '@iconify/react';
import { Message } from './ChatMessages';

interface Chat {
  chatName: string;
  chatId: number;
  messages: Message[];
}

export const ChatMenu = ({
  anchorEl,
  open,
  onClose,
  pastChats,
  pastChatsOpen,
  onCreateNewChat,
  onPastChatsClick,
  onSelectPastChat,
  onReset,
}: {
  anchorEl: null | HTMLElement;
  open: boolean;
  onClose: () => void;
  pastChats: Chat[];
  pastChatsOpen: boolean;
  onCreateNewChat: () => void;
  onPastChatsClick: () => void;
  onSelectPastChat: (chatId: number) => void;
  onReset: () => void;
}) => (
  <Menu anchorEl={anchorEl} open={open} onClose={onClose}>
    <MenuItem onClick={onCreateNewChat}>Create New Chat</MenuItem>
    <MenuItem onClick={onPastChatsClick}>
      Go to Past Chats
      <Icon icon={pastChatsOpen ? 'mdi:chevron-up' : 'mdi:chevron-down'} width="24" height="24" />
    </MenuItem>
    <Collapse in={pastChatsOpen} timeout="auto" unmountOnExit>
      <Box sx={{ pl: 4 }}>
        {pastChats.map((chat) => (
          <MenuItem key={chat.chatId} onClick={() => onSelectPastChat(chat.chatId)}>
            {chat.chatName}
          </MenuItem>
        ))}
      </Box>
    </Collapse>
    <MenuItem onClick={onReset}>Reset Chats</MenuItem>
  </Menu>
);
