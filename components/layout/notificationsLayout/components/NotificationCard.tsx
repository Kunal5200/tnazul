import React from "react";
import { Box, Typography } from "@mui/material";
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  CheckCircleOutlineOutlined,
  AccessTimeOutlined,
  ShieldOutlined,
} from "@mui/icons-material";
import { poppins, poppins700 } from "@/utils/fonts";
import { COLORS } from "@/utils/enum";
import { NotificationItem, NotificationType } from "../types";

interface NotificationCardProps {
  notification: NotificationItem;
  onClick: (id: string) => void;
}

const CONFIG: Record<
  NotificationType,
  {
    icon: React.ComponentType<{ sx?: any }>;
    iconColor: string;
    bgColor: string;
    borderUnread: string;
    bgUnread: string;
  }
> = {
  message: {
    icon: ChatBubbleOutlineOutlined,
    iconColor: "#166CA9",
    bgColor: "#166CA914",
    borderUnread: "rgba(22, 108, 169, 0.25)",
    bgUnread: "rgba(22, 108, 169, 0.02)",
  },
  save: {
    icon: FavoriteBorderOutlined,
    iconColor: "#FF5C5C",
    bgColor: "#FF5C5C1A",
    borderUnread: "rgba(255, 92, 92, 0.25)",
    bgUnread: "rgba(255, 92, 92, 0.02)",
  },
  approval: {
    icon: CheckCircleOutlineOutlined,
    iconColor: "#10753E",
    bgColor: "#10753E14",
    borderUnread: "rgba(16, 117, 62, 0.25)",
    bgUnread: "rgba(16, 117, 62, 0.02)",
  },
  expiry: {
    icon: AccessTimeOutlined,
    iconColor: "#ED6C02",
    bgColor: "#ED6C0214",
    borderUnread: "rgba(237, 108, 2, 0.25)",
    bgUnread: "rgba(237, 108, 2, 0.02)",
  },
  verification: {
    icon: ShieldOutlined,
    iconColor: "#8A3FFC",
    bgColor: "#8A3FFC14",
    borderUnread: "rgba(138, 63, 252, 0.25)",
    bgUnread: "rgba(138, 63, 252, 0.02)",
  },
};

export const NotificationCard: React.FC<NotificationCardProps> = ({
  notification,
  onClick,
}) => {
  const { icon: Icon, iconColor, bgColor, borderUnread, bgUnread } = CONFIG[notification.type];

  return (
    <Box
      onClick={() => onClick(notification.id)}
      sx={{
        display: "flex",
        alignItems: "center",
        p: "20px 24px",
        borderRadius: "16px",
        border: "1px solid",
        borderColor: notification.isUnread ? borderUnread : "#01354714",
        backgroundColor: notification.isUnread ? bgUnread : "#FFFFFF",
        cursor: "pointer",
        transition: "all 0.25s ease",
        "&:hover": {
          boxShadow: "0px 4px 16px rgba(1, 53, 71, 0.03)",
          transform: "translateY(-1px)",
        },
      }}
    >
      {/* Icon Circle */}
      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: "50%",
          backgroundColor: bgColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mr: 3,
          flexShrink: 0,
        }}
      >
        <Icon sx={{ color: iconColor, fontSize: 22 }} />
      </Box>

      {/* Content */}
      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
        <Typography
          sx={{
            fontFamily: poppins.style.fontFamily,
            fontSize: "14.5px",
            color: COLORS.SECONDARY,
            fontWeight: 500,
            lineHeight: 1.5,
          }}
        >
          {notification.text}
        </Typography>
        <Typography
          sx={{
            fontFamily: poppins.style.fontFamily,
            fontSize: "12px",
            color: "#7A9BAB",
            fontWeight: 500,
            mt: 0.5,
          }}
        >
          {notification.time}
        </Typography>
      </Box>
    </Box>
  );
};
