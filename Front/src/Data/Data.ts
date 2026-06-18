import { ref } from "vue";
import {
  User,
  ChatConversation,
  ChatMessage,
  ConversationUser,
} from "./DataType";
export const currentUser: User = {
  id: "u1",
  userName: "Mika",
  surName: "Tieko",
  email: "mika@email.com",
  pseudo: "mika",
  password: "123456",
  status: true,
  roleUser: "user",
  tel: "0344444",
  avatar: "https://i.pravatar.cc/150?img=1",
};
export const users = ref<User[]>([]);
export const AllMessages: ChatMessage[] = [];
export const ChatConversations: ChatConversation[] = [];
export const conversationUsers: ConversationUser[] = [];