<template>
  <div class="flex gap-0.5 h-screen w-full">
    <Login v-if="!authStore.isAuthenticated" />
    <div v-else class="flex gap-0.5 flex-1">
      <SideBare />
      <router-view></router-view>
    </div>
  </div>
</template>
<script setup lang="ts">
// import './App.scss'
import SideBare from './components/Sidebare/SideBare.vue';
import { onMounted } from 'vue';
import { onGetByIdService, onGetService } from './Data/service';
import { useChatStore } from './Store/chat';
import type { ChatConversation, ConversationUser, User } from './Data/DataType';
import { useUserStore } from './Store/user.ts';
import Login from './components/Login.vue';
import { useAuthStore } from './Store/auth.ts';
// import { currentUser } from './Data/Data.ts';

const authStore = useAuthStore();
const chatStore = useChatStore();
const userStore = useUserStore();
onMounted(async () => {
  const user = localStorage.getItem("user");
  const currentUser = user ? JSON.parse(user) : null;
  if (user && currentUser) {
    const allUsers = await onGetService<User>('getusers');
    const chatConversations = await onGetByIdService<ChatConversation>('getchatconversation', currentUser.id);
    const conversationUser = await onGetByIdService<ConversationUser>('getconversationuser', currentUser.id, chatStore.currentChatConversation.id);
    userStore.setAllUser(allUsers);
    authStore.setAuthenticated(true);
    userStore.setCurrentUser(currentUser);
    chatStore.setChatConversations(chatConversations);
    chatStore.setChatConversationUser(conversationUser);
  }
})
</script>
