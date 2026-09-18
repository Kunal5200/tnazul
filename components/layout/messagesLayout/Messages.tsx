"use client";

import React, { useState, useRef, useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { Chat, Message } from "./types";
import { ChatsSidebar } from "./components/ChatsSidebar";
import { ChatWindow } from "./components/ChatWindow";
import WhatsAppButton from "@/components/layout/dashboard/contracts/WhatsAppButton";
import { useSearchParams } from "next/navigation";
import { useSendMessages } from "@/hooks/messages/useSendMessages";
import { useGetMessagesList } from "@/hooks/messages/useGetMessagesList";
import { useUserDetail } from "@/hooks/user/useUserDetail";

const MessagesLayout = () => {
  const searchParams = useSearchParams();
  const receiverId = searchParams.get("receiverId");

  const [activeChatId, setActiveChatId] = useState<string>("");
  const [inputText, setInputText] = useState<string>("");
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);

  const threadContainerRef = useRef<HTMLDivElement>(null);
  const { sendMessage } = useSendMessages();
  const { userData } = useUserDetail();

  const {
    getMessageList,
    data: listData,
    loading: listLoading,
  } = useGetMessagesList();

  console.log("data");

  useEffect(() => {
    getMessageList({ page: 1, limit: 50 });
  }, []);

  const apiChats: Chat[] = React.useMemo(() => {
    if (!listData?.docs) return [];

    const uniqueChats = new Map<string, Chat>();
    const currentUserId = userData?._id;

    listData.docs.forEach((doc: any) => {
      let otherUser = null;

      if (Array.isArray(doc.users)) {
        if (doc.users.length === 2) {
          otherUser =
            doc.users.find((u: any) => u && u._id !== currentUserId) ||
            doc.users[1];
        } else if (doc.users.length > 0) {
          otherUser =
            doc.users.find((u: any) => u && u._id !== currentUserId) ||
            doc.users[0];
        }
      }

      let otherUserId = otherUser?._id || doc._id;
      let otherUserName =
        otherUser?.name && otherUser?._id !== currentUserId
          ? otherUser.name
          : "Unknown";

      const existing = uniqueChats.get(otherUserId);

      if (
        !existing ||
        (existing.name === "Unknown" && otherUserName !== "Unknown")
      ) {
        uniqueChats.set(otherUserId, {
          id: otherUserId,
          name: otherUserName,
          avatarInitials:
            otherUserName !== "Unknown"
              ? otherUserName.substring(0, 2).toUpperCase()
              : "U",
          avatarColor: "#5A7A8A",
          time: doc.lastMessageAt
            ? new Date(doc.lastMessageAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "",
          propertyTitle: "",
          lastMessageExcerpt: doc.lastMessage || "",
          unreadCount: 0,
          messages: [],
        });
      } else if (existing && !existing.time && doc.lastMessageAt) {
        // If we have a newer time, update it (assuming first encountered is usually newest, but just in case)
        existing.time = new Date(doc.lastMessageAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        existing.lastMessageExcerpt =
          doc.lastMessage || existing.lastMessageExcerpt;
      }
    });

    return Array.from(uniqueChats.values());
  }, [listData, userData?._id]);

  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    setChats((prevChats) => {
      let newChats = [...apiChats];

      if (receiverId) {
        const existingInApi = newChats.find((c) => c.id === receiverId);
        if (!existingInApi) {
          const existingLocal = prevChats.find((c) => c.id === receiverId);
          newChats.unshift(
            existingLocal || {
              id: receiverId,
              name: "New Contact",
              avatarInitials: "NC",
              avatarColor: "#9c27b0",
              propertyTitle: "Property Inquiry",
              lastMessageExcerpt: "",
              time: "Just now",
              unreadCount: 0,
              messages: [],
            }
          );
        }
      }
      return newChats;
    });
  }, [apiChats, receiverId]);

  console.log("apichats:::::", apiChats);

  // Set initial active chat if receiverId is provided in URL
  useEffect(() => {
    if (receiverId) {
      setActiveChatId(receiverId);
    }
  }, [receiverId]);

  // Fallback to selecting the first available chat if none is active
  useEffect(() => {
    if (!activeChatId && !receiverId && apiChats.length > 0) {
      setActiveChatId(apiChats[0].id);
    }
  }, [apiChats, activeChatId, receiverId]);

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

  // Handle select chat
  const handleSelectChat = (id: string) => {
    setActiveChatId(id);
    // Mark as read
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === id ? { ...chat, unreadCount: 0 } : chat,
      ),
    );
  };

  // Handle Send Message
  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    // Send the message via API
    sendMessage({
      receiverId: activeChatId,
      message: inputText.trim(),
    });

    setInputText("");

    // Trigger ChatWindow to refetch messages immediately
    setRefreshTrigger((prev) => prev + 1);

    // Refresh the chats list after a slight delay to allow backend to process
    setTimeout(() => {
      getMessageList({ page: 1, limit: 50 });
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  console.log(":::chats", chats);

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
        {activeChat && (
          <ChatWindow
            activeChat={activeChat}
            inputText={inputText}
            onChangeInputText={setInputText}
            onSendMessage={handleSendMessage}
            onKeyPress={handleKeyPress}
            threadContainerRef={threadContainerRef}
            refreshTrigger={refreshTrigger}
          />
        )}
      </Stack>

      {/* Floating WhatsApp Widget */}
      <WhatsAppButton />
    </Box>
  );
};

export default MessagesLayout;
