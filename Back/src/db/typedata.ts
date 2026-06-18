export interface User {
  id : string;
  userName : string;
  surName : string;
  email : string;
  pseudo : string;
  password : string;
  roleUser : string;
  tel : string;
  status : boolean;
  avatar : string;
}
export interface ChatMessage {
  id: string;
  conversationId?: string | null;
  content?: string;
  senderId: string;
  file?: string | null;
}

export interface ChatConversation {
  id: string;
  name?: string;
  isRead: boolean;
  userIdConversations: string[];
  icon?: string;
}

export interface ConversationUser {
  idConversation: string;
  idUser: string;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
}