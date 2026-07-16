import {
  ChatConversation,
  ChatMessage,
  ConversationUser,
  User,
} from "./DataType";

export const conversationVoid = {
  id: "",
  name: "",
  createdAt: "",
  isRead: false,
  userIdConversations: [], // IDs of users in the conversation
};
export const emptyMessage = {
  idMessage: "",
  idUser: "",
  content: "",
};

export const emptyUser: User = {
  id: "",
  userName: "",
  surName: "",
  email: "",
  pseudo: "",
  password: "",
  createdAt: "",
  updatedAt: "",
  avatar: "",
  status: false,
  roleUser: "",
  tel: "",
};

export const emptyConversationUser: ConversationUser = {
  idConversation: "",
  idUser: "",
  isRead: false,
};

export const emptyChatMessage: ChatMessage = {
  id: "",
  conversationId: "",
  content: "",
  file: "",
  createdAt: "",
  updatedAt: "",
  senderId: "",
};

export const emptyChatConversation: ChatConversation = {
  id: "c1",
  name: "",
  createdAt: "",
  updatedAt: "",
  icon: "",
  userIdConversations: [],
  lastMessage: undefined,
};
