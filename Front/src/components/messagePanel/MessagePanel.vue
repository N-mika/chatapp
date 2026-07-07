<template>
  <div v-if="conversation.id !== ''" class="flex flex-1 h-screen flex-col bg-gray-50">
    <!-- Header -->
    <div  class="flex items-center justify-between border-b border-gray-200 bg-white px-5 py-3 shadow-sm">
      <div class="flex items-center gap-3">
        <!-- Avatar -->
        <div class="flex h-11 w-11 items-center justify-center rounded-full bg-primary font-bold text-white">
          {{ conversation.name?.charAt(0).toUpperCase() }}
        </div>
        <div>
          <h2 class="font-semibold text-gray-800">
            {{ conversation.name }}
          </h2>
          <div class="flex items-center gap-1 text-xs text-gray-500">
            <span class="h-2 w-2 rounded-full bg-green-500"></span>
            En ligne
          </div>
        </div>
      </div>
    </div>
    <!-- Messages -->
    <div class="flex-1 overflow-y-auto p-4">
      <ChatBulle :chatMessage="chatStore.currentChatMessageUser" :current-user="userStore.currentUser"/>
    </div>
    <!-- Input -->
    <div class="border-t border-gray-200 bg-white p-3">
      <Input :currentUser="userStore.currentUser" :conversation="conversation"/>
    </div>
  </div>
  <!-- Aucun chat sélectionné -->
  <div
    v-else
    class="flex h-screen flex-col items-center justify-center bg-gray-50 text-center"
  >
    <div
      class="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-200 text-gray-400"
    >
      💬
    </div>
    <h2 class="text-lg font-semibold text-gray-700">
      Veuillez sélectionner une conversation
    </h2>
    <p class="mt-2 text-sm text-gray-500">
      Choisissez une discussion dans la liste pour commencer à échanger.
    </p>
  </div>
</template>
<script lang="ts" setup>
//@ts-ignore
import { v4 as uuid } from 'uuid';
import { ChatConversation, ChatMessage } from '../../Data/DataType';
import { conversationVoid, } from '../../Data/DataEmpty';
import { useRoute } from 'vue-router';
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { useUserStore } from '../../Store/user';
import { useChatStore } from '../../Store/chat';
import Input from "../ChatInput.vue";
import ChatBulle from '../ChatBulle.vue';
import { onGetByIdService, onGetByIdServiceReturnObjet } from '../../Data/service.ts';
import { socket } from '../../Socket/socket.ts';

const userStore = useUserStore();
const chatStore = useChatStore();
const route = useRoute();

const conversation = ref<ChatConversation>(conversationVoid);

onMounted(() => {
  const idCurrentConversation = route.params.id;
  loadData(idCurrentConversation as string);
});
watch(
  () => route.fullPath,
  () => {
    const idCurrentConversation = route.params.id;
    loadData(idCurrentConversation as string);
  }
)
const loadData = async (idCurrentConversation: string) => {
  if (idCurrentConversation) {
    socket.emit('joinConversation', idCurrentConversation);
    socket.off('newMessage');
    socket.on('newMessage', (newChatMessage: ChatMessage) => {
      chatStore.newChatMessage(newChatMessage);
    });
    try {
      const currentChatMessage = await onGetByIdService<ChatMessage>('getchatmessage', idCurrentConversation as string);
      const currentChatConversation = await onGetByIdServiceReturnObjet<ChatConversation>('getcurrentconversation', idCurrentConversation as string);
      chatStore.setCurrentConversation(currentChatConversation);
      console.log(chatStore.currentChatConversation, idCurrentConversation);
      chatStore.setChatMessage(currentChatMessage);
      conversation.value = chatStore.currentChatConversation;
    }
    catch (err) { console.log(err) };
  }
}
onUnmounted(() => {
  socket.off('newMessage');
});
</script>
<style lang="scss" src="./MessagePanel.scss" scoped></style>