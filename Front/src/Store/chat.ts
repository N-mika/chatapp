import { defineStore } from "pinia";
import type {
  ChatConversation,
  ChatMessage,
  ConversationUser,
} from "../Data/DataType";
import { ref } from "vue";
// import { AllMessages } from "../Data/Data";
import { emptyChatConversation } from "../Data/DataEmpty";

export const useChatStore = defineStore("chatStore", () => {
  const chatConversations = ref<ChatConversation[]>([]);
  const conversationUser = ref<ConversationUser[]>([]);
  const currentChatMessageUser = ref<ChatMessage[]>([]);
  const currentChatConversation = ref<ChatConversation>(emptyChatConversation);

  const setChatConversations = (convs: ChatConversation[]) => {
    chatConversations.value = convs;
  };
  const setChatConversationUser = (convUser: ConversationUser[]) => {
    conversationUser.value = convUser;
  };
  const setCurrentConversation = (currentConversation: ChatConversation ) => {
    currentChatConversation.value = currentConversation;
  };
  const setChatMessage = (currentChatMessage: ChatMessage[] ) => {
    // there we set service to get message for databases allMessages
    currentChatMessageUser.value =currentChatMessage;
  };
  const newChatMessage = (chatMessageUser: ChatMessage) => {
    currentChatMessageUser.value.push(chatMessageUser);
  };

  return {
    chatConversations,
    currentChatMessageUser,
    conversationUser,
    currentChatConversation,
    setChatConversations,
    setChatMessage,
    setChatConversationUser,
    newChatMessage,
    setCurrentConversation,
  };
});
