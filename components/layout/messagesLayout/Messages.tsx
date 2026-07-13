"use client";

import React, { useState, useRef, useEffect } from "react";
import { Box, Stack } from "@mui/material";
import { Chat, Message } from "./types";
import { ChatsSidebar } from "./components/ChatsSidebar";
import { ChatWindow } from "./components/ChatWindow";
import WhatsAppButton from "@/components/layout/dashboard/contracts/WhatsAppButton";

const mockChatsData: Chat[] = [
  {
    id: "khalid",
    name: "Khalid M.",
    avatarInitials: "KM",
    avatarColor: "#166CA9", // Blue
    propertyTitle: "3BR Villa - Al Nakheel",
    lastMessageExcerpt: "I'm thinking around SAR",
    time: "10:45 AM",
    unreadCount: 1,
    messages: [
      {
        id: "k1",
        sender: "other",
        text: "Is the price negotiable?",
        time: "10:40 AM",
      },
      {
        id: "k2",
        sender: "other",
        text: "I'm thinking around SAR 1,90,000.",
        time: "10:45 AM",
      },
    ],
  },
  {
    id: "sara",
    name: "Sara Al-Otaibi",
    avatarInitials: "SO",
    avatarColor: "#10753E", // Green
    propertyTitle: "Commercial Shop - Al Olaya",
    lastMessageExcerpt: "The lease agreement, 2 months",
    time: "Yesterday",
    unreadCount: 0,
    messages: [
      {
        id: "s1",
        sender: "other",
        text: "I saw your listing. What documents are needed for the transfer?",
        time: "Yesterday",
      },
      {
        id: "s2",
        sender: "me",
        text: "The lease agreement, 2 months advance, and the landlord's approval letter.",
        time: "Yesterday",
        status: "read",
      },
    ],
  },
  {
    id: "mohammed",
    name: "Mohammed H.",
    avatarInitials: "MH",
    avatarColor: "#ED6C02", // Orange
    propertyTitle: "3BR Villa - Al Nakheel",
    lastMessageExcerpt: "Is the villa still available?",
    time: "Mon",
    unreadCount: 0,
    messages: [
      {
        id: "m1",
        sender: "other",
        text: "Is the villa still available?",
        time: "Mon",
      },
    ],
  },
];

const MessagesLayout = () => {
  const [chats, setChats] = useState<Chat[]>(mockChatsData);
  const [activeChatId, setActiveChatId] = useState<string>("sara");
  const [inputText, setInputText] = useState<string>("");

  const threadContainerRef = useRef<HTMLDivElement>(null);

  const activeChat = chats.find((c) => c.id === activeChatId) || chats[0];

  // Auto scroll to bottom of messages
  const scrollToBottom = (behavior: "smooth" | "auto" = "smooth") => {
    if (threadContainerRef.current) {
      threadContainerRef.current.scrollTo({
        top: threadContainerRef.current.scrollHeight,
        behavior,
      });
    }
  };

  // Scroll instantly on chat change
  useEffect(() => {
    scrollToBottom("auto");
  }, [activeChatId]);

  // Scroll smoothly when new messages are added
  useEffect(() => {
    scrollToBottom("smooth");
  }, [activeChat.messages]);

  // Handle select chat
  const handleSelectChat = (id: string) => {
    setActiveChatId(id);
    // Mark as read
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === id ? { ...chat, unreadCount: 0 } : chat
      )
    );
  };

  // Handle Send Message
  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: "me",
      text: inputText.trim(),
      time: "Just now",
      status: "sent",
    };

    setChats((prevChats) =>
      prevChats.map((chat) => {
        if (chat.id === activeChatId) {
          return {
            ...chat,
            lastMessageExcerpt: inputText.trim(),
            time: "Just now",
            messages: [...chat.messages, newMessage],
          };
        }
        return chat;
      })
    );

    setInputText("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Box
      sx={{
        maxWidth: "1200px",
        margin: "0 auto",
        height: "calc(100vh - 48px)",
      }}
    >
      <Stack
        direction="row"
        sx={{
          height: "100%",
          backgroundColor: "#FFFFFF",
          borderRadius: "20px",
          border: "1px solid #0135470D",
          boxShadow: "0px 4px 24px rgba(1, 53, 71, 0.02)",
          overflow: "hidden",
        }}
      >
        {/* Left Side: Chats List */}
        <ChatsSidebar
          chats={chats}
          activeChatId={activeChatId}
          onSelectChat={handleSelectChat}
        />

        {/* Right Side: Conversation Area */}
        <ChatWindow
          activeChat={activeChat}
          inputText={inputText}
          onChangeInputText={setInputText}
          onSendMessage={handleSendMessage}
          onKeyPress={handleKeyPress}
          threadContainerRef={threadContainerRef}
        />
      </Stack>

      {/* Floating WhatsApp Widget */}
      <WhatsAppButton />
    </Box>
  );
};

export default MessagesLayout;
