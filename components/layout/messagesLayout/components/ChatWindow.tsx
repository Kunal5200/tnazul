import React from "react";
import { Box, Typography, Avatar, IconButton, InputBase, Stack } from "@mui/material";
import { Send, DoneAll } from "@mui/icons-material";
import { COLORS } from "@/utils/enum";
import { poppins, poppins700 } from "@/utils/fonts";
import { Chat } from "../types";

interface ChatWindowProps {
  activeChat: Chat;
  inputText: string;
  onChangeInputText: (text: string) => void;
  onSendMessage: () => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  threadContainerRef: React.RefObject<HTMLDivElement | null>;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  activeChat,
  inputText,
  onChangeInputText,
  onSendMessage,
  onKeyPress,
  threadContainerRef,
}) => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        backgroundColor: "#FFFFFF",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 2.5,
          px: 3,
          display: "flex",
          alignItems: "center",
          borderBottom: "1px solid #01354714",
        }}
      >
        <Avatar
          sx={{
            width: 48,
            height: 48,
            backgroundColor: activeChat.avatarColor,
            fontSize: "14px",
            fontFamily: poppins700.style.fontFamily,
            fontWeight: 700,
            mr: 2,
          }}
        >
          {activeChat.avatarInitials}
        </Avatar>
        <Box>
          <Typography
            sx={{
              fontFamily: poppins700.style.fontFamily,
              fontWeight: 700,
              fontSize: "16px",
              color: COLORS.SECONDARY,
            }}
          >
            {activeChat.name}
          </Typography>
          <Typography
            sx={{
              fontFamily: poppins.style.fontFamily,
              fontSize: "12px",
              color: "#7A9BAB",
              fontWeight: 500,
            }}
          >
            {activeChat.propertyTitle}
          </Typography>
        </Box>
      </Box>

      {/* Message Thread */}
      <Box
        ref={threadContainerRef}
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          p: 3,
          display: "flex",
          flexDirection: "column",
          gap: 2.5,
          backgroundColor: "#FFFFFF",
          "&::-webkit-scrollbar": {
            width: "4px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(1, 53, 71, 0.1)",
            borderRadius: "4px",
          },
        }}
      >
        {activeChat.messages.map((message) => {
          const isMe = message.sender === "me";
          return (
            <Box
              key={message.id}
              sx={{
                alignSelf: isMe ? "flex-end" : "flex-start",
                maxWidth: "70%",
                display: "flex",
                flexDirection: "column",
                alignItems: isMe ? "flex-end" : "flex-start",
              }}
            >
              {/* Bubble */}
              <Box
                sx={{
                  backgroundColor: isMe ? COLORS.SECONDARY : "#F4F7F8",
                  color: isMe ? COLORS.WHITE : COLORS.SECONDARY,
                  borderRadius: isMe ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                  px: 2.5,
                  py: 1.8,
                  boxShadow: "none",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: poppins.style.fontFamily,
                    fontSize: "13.5px",
                    fontWeight: 500,
                    lineHeight: 1.5,
                  }}
                >
                  {message.text}
                </Typography>
              </Box>

              {/* Time / Status info */}
              <Stack
                direction="row"
                spacing={0.5}
                sx={{ alignItems: "center", mt: 0.5, px: 0.5 }}
              >
                <Typography
                  sx={{
                    fontFamily: poppins.style.fontFamily,
                    fontSize: "11px",
                    color: "#7A9BAB",
                  }}
                >
                  {message.time}
                </Typography>
                {isMe && (
                  <DoneAll
                    sx={{
                      fontSize: 14,
                      color: message.status === "read" ? "#166CA9" : "#7A9BAB",
                    }}
                  />
                )}
              </Stack>
            </Box>
          );
        })}

      </Box>

      {/* Bottom Input Area */}
      <Box
        sx={{
          p: 2.5,
          px: 3,
          borderTop: "1px solid #01354714",
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        {/* Input field */}
        <Box
          sx={{
            flexGrow: 1,
            backgroundColor: "#F4F7F8",
            borderRadius: "30px",
            px: 2.5,
            py: 1,
            display: "flex",
            alignItems: "center",
            border: "1px solid #0135470D",
          }}
        >
          <InputBase
            value={inputText}
            onChange={(e) => onChangeInputText(e.target.value)}
            onKeyDown={onKeyPress}
            placeholder="Type a message..."
            fullWidth
            sx={{
              fontFamily: poppins.style.fontFamily,
              fontSize: "13.5px",
              color: COLORS.SECONDARY,
              fontWeight: 500,
            }}
          />
        </Box>

        {/* Send Button */}
        <IconButton
          onClick={onSendMessage}
          disabled={!inputText.trim()}
          sx={{
            width: 44,
            height: 44,
            backgroundColor: "#F4F7F8",
            color: inputText.trim() ? COLORS.SECONDARY : "#7A9BAB",
            border: "1px solid #0135470D",
            "&:hover": {
              backgroundColor: "#EEF6FA",
            },
            "&.Mui-disabled": {
              backgroundColor: "#F4F7F8",
              color: "#D1DDE2",
            },
            transition: "all 0.2s ease",
          }}
        >
          <Send sx={{ fontSize: 18 }} />
        </IconButton>
      </Box>
    </Box>
  );
};
