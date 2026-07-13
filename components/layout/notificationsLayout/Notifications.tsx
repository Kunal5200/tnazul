"use client";

import React, { useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { poppins, poppins700 } from "@/utils/fonts";
import { COLORS } from "@/utils/enum";
import WhatsAppButton from "@/components/layout/dashboard/contracts/WhatsAppButton";
import { NotificationCard } from "./components/NotificationCard";
import { NotificationItem } from "./types";

const initialNotifications: NotificationItem[] = [
  {
    id: "n1",
    type: "message",
    text: (
      <>
        <strong>Khalid M.</strong> sent you a message about <strong>'3BR Villa - Al Nakheel'</strong>
      </>
    ),
    time: "10 min ago",
    isUnread: true,
  },
  {
    id: "n2",
    type: "save",
    text: (
      <>
        <strong>Sara Al-Otaibi</strong> saved your <strong>'Commercial Shop - Al Olaya'</strong> listing
      </>
    ),
    time: "1 hr ago",
    isUnread: true,
  },
  {
    id: "n3",
    type: "approval",
    text: (
      <>
        Your listing <strong>'Commercial Shop - Al Olaya Tower'</strong> has been approved and is now live.
      </>
    ),
    time: "3 hrs ago",
    isUnread: false,
  },
  {
    id: "n4",
    type: "expiry",
    text: (
      <>
        Your listing <strong>'3BR Villa'</strong> will expire in 18 months. Consider boosting it.
      </>
    ),
    time: "Yesterday",
    isUnread: false,
  },
  {
    id: "n5",
    type: "verification",
    text: (
      <>
        Your identity verification is complete. You can now access all platform features.
      </>
    ),
    time: "2 days ago",
    isUnread: false,
  },
];

const NotificationsLayout = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);

  const unreadCount = notifications.filter((n) => n.isUnread).length;

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isUnread: false })));
  };

  const handleCardClick = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isUnread: false } : n))
    );
  };

  return (
    <Box
      sx={{
        maxWidth: "1200px",
        margin: "0 auto",
        height: "calc(100vh - 48px)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header Panel */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3.5,
          flexShrink: 0,
        }}
      >
        <Stack direction="row" spacing={1} sx={{ alignItems: "baseline" }}>
          <Typography
            sx={{
              fontFamily: poppins700.style.fontFamily,
              fontWeight: 700,
              fontSize: "22px",
              color: COLORS.SECONDARY,
            }}
          >
            Notifications
          </Typography>
          <Typography
            sx={{
              fontFamily: poppins.style.fontFamily,
              fontSize: "14px",
              color: "#7A9BAB",
              fontWeight: 500,
            }}
          >
            ({unreadCount > 0 ? `${unreadCount} unread` : "No unread"})
          </Typography>
        </Stack>

        <Typography
          onClick={handleMarkAllRead}
          sx={{
            fontFamily: poppins700.style.fontFamily,
            fontWeight: 700,
            fontSize: "14px",
            color: "#166CA9",
            cursor: "pointer",
            transition: "color 0.2s ease",
            "&:hover": {
              color: "#125484",
            },
          }}
        >
          Mark all read
        </Typography>
      </Box>

      {/* Notifications List Scrollable Box */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          pb: 4,
          pr: 1, // spacing for scrollbar
          "&::-webkit-scrollbar": {
            width: "4px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(1, 53, 71, 0.1)",
            borderRadius: "4px",
          },
        }}
      >
        {notifications.map((notification) => (
          <NotificationCard
            key={notification.id}
            notification={notification}
            onClick={handleCardClick}
          />
        ))}
      </Box>

      {/* Floating WhatsApp Widget */}
      <WhatsAppButton />
    </Box>
  );
};

export default NotificationsLayout;
