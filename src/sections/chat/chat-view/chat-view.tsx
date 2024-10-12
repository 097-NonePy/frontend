import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Box } from '@mui/material';
import { ChatHeader } from './ChatHeader';
import { ChatMessages } from './ChatMessages';
import { ChatInput } from './ChatInput';
import { ChatMenu } from './ChatMenu';
import './colors.css';
import './chat-styles.css';

interface Message {
  text: string;
  isUser: boolean;
}

interface Chat {
  chatName: string;
  chatId: number;
  messages: Message[];
}

export function ChatBot() {
  const [chats, setChats] = useState<{ [key: number]: Chat }>({
    1: { chatName: 'Chat 1', chatId: 1, messages: [] },
  });
  const [currentChatId, setCurrentChatId] = useState<number>(1);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [thinkingDots, setThinkingDots] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [pastChatsOpen, setPastChatsOpen] = useState(false);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [chats, currentChatId, scrollToBottom]);

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setThinkingDots((prev) => (prev.length < 10 ? `${prev} .` : '.'));
      }, 300);
      return () => clearInterval(interval);
    }
    return undefined;
  }, [loading]);

  const handleSend = async () => {
    if (inputValue.trim() === '') return;
    console.log('Entering Value', inputValue);
    const newMessage: Message = { text: inputValue, isUser: true };

    setChats((prevChats) => {
      const updatedChats = { ...prevChats };
      if (updatedChats[currentChatId].messages.slice(-1)[0]?.text !== newMessage.text) {
        updatedChats[currentChatId].messages = [
          ...updatedChats[currentChatId].messages,
          newMessage,
        ];
      }
      return updatedChats;
    });

    setInputValue('');
    setLoading(true);

    try {
      const response = await fetchBotReply(inputValue);
      const reader = response.body?.getReader();
      const decoder = new TextDecoder('utf-8');
      let botReplyText = '';

      // Read the stream
      while (true) {
        const { done, value } = await reader!.read();
        if (done) break;
        botReplyText += decoder.decode(value, { stream: true });

        // Update the chat with the new part of the bot reply
        setChats((prevChats) => {
          const updatedChats = { ...prevChats };
          const lastMessageIndex = updatedChats[currentChatId].messages.length - 1;

          // Check if the last message is from the bot and update it
          if (lastMessageIndex >= 0 && !updatedChats[currentChatId].messages[lastMessageIndex].isUser) {
            updatedChats[currentChatId].messages[lastMessageIndex].text += botReplyText; // Append text
          } else {
            const botReply: Message = { text: botReplyText, isUser: false };
            updatedChats[currentChatId].messages = [
              ...updatedChats[currentChatId].messages,
              botReply,
            ];
          }
          return updatedChats;
        });
      }
    } catch (error) {
      console.error('Error in handleSend:', error);
      const errorMessage: Message = {
        text: "I'm sorry, an error occurred while processing your request.",
        isUser: false,
      };

      setChats((prevChats) => {
        const updatedChats = { ...prevChats };
        if (updatedChats[currentChatId].messages.slice(-1)[0]?.text !== errorMessage.text) {
          updatedChats[currentChatId].messages = [
            ...updatedChats[currentChatId].messages,
            errorMessage,
          ];
        }
        return updatedChats;
      });
    } finally {
      setLoading(false);
    }
  };

  const [language, setLanguage] = useState('en');

  const fetchBotReply = async (question: string) => {
    const response = await fetch('http://localhost:8000/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, thread_id: currentChatId, language }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response;
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  const handleReset = () => {
    setChats({ 1: { chatName: 'Chat 1', chatId: 1, messages: [] } });
    setCurrentChatId(1);
    setInputValue('');
    setLoading(false);
    setThinkingDots('');
    handleMenuClose();
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setPastChatsOpen(false);
  };

  const handleCreateNewChat = () => {
    setChats((prevChats) => {
      const newChatId = Object.keys(prevChats).length + 1;
      return {
        ...prevChats,
        [newChatId]: { chatName: `Chat ${newChatId}`, chatId: newChatId, messages: [] },
      };
    });
    setCurrentChatId(Object.keys(chats).length + 1);
    setInputValue('');
    handleMenuClose();
  };

  const handleSelectPastChat = (chatId: number) => {
    setCurrentChatId(chatId);
    handleMenuClose();
  };

  const handlePastChatsClick = () => {
    setPastChatsOpen((prev) => !prev);
  };

  return (
    <Box className="chat-wrapper">
      <ChatHeader onMenuClick={handleMenuClick} setLanguage={setLanguage} language={language} />
      <ChatMessages
        messages={chats[currentChatId].messages}
        loading={loading}
        thinkingDots={thinkingDots}
        ref={chatContainerRef}
      />
      <ChatInput
        value={inputValue}
        onChange={setInputValue}
        onSend={handleSend}
        onKeyPress={handleKeyPress}
        loading={loading}
      />
      <ChatMenu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        pastChats={Object.values(chats)}
        pastChatsOpen={pastChatsOpen}
        onCreateNewChat={handleCreateNewChat}
        onPastChatsClick={handlePastChatsClick}
        onSelectPastChat={handleSelectPastChat}
        onReset={handleReset}
      />
    </Box>
  );
}
