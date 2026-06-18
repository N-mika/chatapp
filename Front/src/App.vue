<template>
  <div class="flex gap-0.5 h-screen">
    <SideBare />
    <router-view></router-view>
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

const chatStore = useChatStore();
const userStore = useUserStore();
onMounted(async () => {
  const allUsers = await onGetService<User>('getusers');
  const chatConversations = await onGetByIdService<ChatConversation>('getchatconversation', userStore.currentUser.id);
  const conversationUser = await onGetByIdService<ConversationUser>('getconversationuser', userStore.currentUser.id, chatStore.currentChatConversation.id);
  userStore.setAllUser(allUsers);
  chatStore.setChatConversations(chatConversations);
  chatStore.setChatConversationUser(conversationUser);
})
</script>
