export interface Message {
  id: string;
  sender: "me" | "other";
  text: string;
  time: string;
  status?: "sent" | "read";
}

export interface Chat {
  id: string;
  name: string;
  avatarInitials: string;
  avatarColor: string;
  propertyTitle: string;
  lastMessageExcerpt: string;
  time: string;
  unreadCount: number;
  messages: Message[];
}
