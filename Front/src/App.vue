<template>
  <div class="flex gap-0.5 h-screen w-full">
    <Login v-if="login" @login="handleLogin"/>
    <div v-else class="flex gap-0.5 flex-1" >
      <SideBare />
      <router-view></router-view>
    </div>
  </div>
</template>
<script setup lang="ts">
// import './App.scss'
import SideBare from './components/Sidebare/SideBare.vue';
import { onMounted, ref } from 'vue';
import { onGetByIdService, onGetService } from './Data/service';
import { useChatStore } from './Store/chat';
import type { ChatConversation, ConversationUser, User } from './Data/DataType';
import { useUserStore } from './Store/user.ts';
import Login from './components/Login.vue';

const login = ref<boolean>(true);

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
const handleLogin = (form: { email: string, password: string, remember: boolean }) => {
  console.log('Login form submitted:', form);
  // Here you can add your login logic, e.g., call an API to authenticate the user
  // If login is successful, set login to false to show the main app
  login.value = false;
}
</script>
