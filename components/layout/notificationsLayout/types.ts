import React from "react";

export type NotificationType = "message" | "save" | "approval" | "expiry" | "verification";

export interface NotificationItem {
  id: string;
  type: NotificationType;
  text: React.ReactNode;
  time: string;
  isUnread: boolean;
}
