import React from "react";
import { Box, Typography, Avatar, Divider, Stack } from "@mui/material";
import { COLORS } from "@/utils/enum";
import { poppins, poppins700 } from "@/utils/fonts";
import { Chat } from "../types";

interface ChatsSidebarProps {
  chats: Chat[];
  activeChatId: string;
  onSelectChat: (id: string) => void;
}

export const ChatsSidebar: React.FC<ChatsSidebarProps> = ({
  chats,
  activeChatId,
  onSelectChat,
}) => {
  const totalUnread = chats.reduce((acc, c) => acc + c.unreadCount, 0);

  return (
    <Box
      sx={{
        width: "380px",
        borderRight: "1px solid #01354714",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        flexShrink: 0,
      }}
    >
      {/* Header */}
      <Box sx={{ p: 3, pb: 2 }}>
        <Typography
          sx={{
            fontFamily: poppins700.style.fontFamily,
            fontWeight: 700,
            fontSize: "22px",
            color: COLORS.SECONDARY,
          }}
        >
          Messages
        </Typography>
        <Typography
          sx={{
            fontFamily: poppins.style.fontFamily,
            fontWeight: 500,
            fontSize: "13px",
            color: "#7A9BAB",
            mt: 0.5,
          }}
        >
          {totalUnread > 0 ? `${totalUnread} unread` : "No unread messages"}
        </Typography>
      </Box>

      <Divider sx={{ borderColor: "#01354714" }} />

      {/* List scrollable */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          py: 1,
          "&::-webkit-scrollbar": {
            width: "4px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(1, 53, 71, 0.1)",
            borderRadius: "4px",
          },
        }}
      >
        {chats.map((chat) => {
          const isSelected = chat.id === activeChatId;
          return (
            <Box
              key={chat.id}
              onClick={() => onSelectChat(chat.id)}
              sx={{
                px: 3,
                py: 2,
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                backgroundColor: isSelected ? "#F4F7F8" : "transparent",
                borderLeft: isSelected
                  ? `4px solid ${COLORS.SECONDARY}`
                  : "4px solid transparent",
                "&:hover": {
                  backgroundColor: "#F4F7F8",
                },
                transition: "all 0.2s ease",
              }}
            >
              {/* Avatar */}
              <Avatar
                sx={{
                  width: 48,
                  height: 48,
                  backgroundColor: chat.avatarColor,
                  fontSize: "14px",
                  fontFamily: poppins700.style.fontFamily,
                  fontWeight: 700,
                  mr: 2,
                }}
              >
                {chat.avatarInitials}
              </Avatar>

              {/* Info */}
              <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    noWrap
                    sx={{
                      fontFamily: poppins700.style.fontFamily,
                      fontWeight: 700,
                      fontSize: "14px",
                      color: COLORS.SECONDARY,
                    }}
                  >
                    {chat.name}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: poppins.style.fontFamily,
                      fontSize: "11px",
                      color: "#7A9BAB",
                      flexShrink: 0,
                    }}
                  >
                    {chat.time}
                  </Typography>
                </Stack>

                <Typography
                  noWrap
                  sx={{
                    fontFamily: poppins.style.fontFamily,
                    fontSize: "12px",
                    color: "#7A9BAB",
                    mt: 0.2,
                    fontWeight: 500,
                  }}
                >
                  {chat.propertyTitle}
                </Typography>

                <Typography
                  noWrap
                  sx={{
                    fontFamily: poppins.style.fontFamily,
                    fontSize: "12px",
                    color: chat.unreadCount > 0 ? COLORS.SECONDARY : "#5A7A8A",
                    mt: 0.5,
                    fontWeight: chat.unreadCount > 0 ? 700 : 500,
                  }}
                >
                  {chat.lastMessageExcerpt}
                </Typography>
              </Box>

              {/* Unread badge */}
              {chat.unreadCount > 0 && (
                <Box
                  sx={{
                    ml: 1.5,
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    backgroundColor: COLORS.SECONDARY,
                    color: COLORS.WHITE,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "10px",
                    fontFamily: poppins700.style.fontFamily,
                    fontWeight: 700,
                  }}
                >
                  {chat.unreadCount}
                </Box>
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
