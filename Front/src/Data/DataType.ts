export type Participant = {
  user: User;
};

export type UserRole = "admin" | "user";
export type ChatMessage = {
  id: string;
  conversationId: string;
  content: string;
  senderId: string;
  file?: string; // Optional file attachment
  createdAt?: string;
  updatedAt?: string;
};
export type ChatConversation = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt?: string;
  icon?: string;
  isRead: boolean;
  userIdConversations: string[]; // IDs of users in the conversation
  lastMessage?: ChatMessage;
};
// Pour les conversations lu et non lu
export type ConversationUser = {
  idConversation: string;
  idUser: string;
  isRead: boolean;
};
export type User = {
  id: string;
  userName: string;
  surName: string;
  email: string;
  pseudo: string;
  password: string;
  status: boolean;
  roleUser: string;
  tel : string;
  createdAt?: string;
  updatedAt?: string;
  avatar?: string; // Optional avatar URL
};
// Pour les correspondances de chat
