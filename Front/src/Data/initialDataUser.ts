import { useAuthStore } from "../Store/auth";
import { useChatStore } from "../Store/chat";
import { useUserStore } from "../Store/user";
import { ChatConversation, ChatMessage, ConversationUser, User } from "./DataType";
import { onGetByIdService, onGetService } from "./service";

export const initializeDataUser = async (currentUser: User) => {
  const authStore = useAuthStore();
  const userStore = useUserStore();
  const chatStore = useChatStore();

  const [
    allUsers,
    chatConversations,
    conversationUser,
    allConversationUser
  ] = await Promise.all([
    onGetService<User>("getusers"),
    onGetByIdService<ChatConversation>("getchatconversation", currentUser.id),
    onGetByIdService<ConversationUser>(
      "getconversationuser",
      currentUser.id,
      chatStore.currentChatConversation.id
    ),
    onGetByIdService<ConversationUser>(
      "getconversationusers",
      currentUser.id
    )
  ]);

  userStore.setAllUser(allUsers);
  userStore.setCurrentUser(currentUser);
  authStore.setAuthenticated(true);

  chatStore.setChatConversations(chatConversations);
  chatStore.setConversationUser(conversationUser);

  const messages = await Promise.all(
    allConversationUser.map(c =>
      onGetByIdService<ChatMessage>("getchatmessage", c.idConversation)
    )
  );

  chatStore.setAllChatMessage(messages.flat());
};