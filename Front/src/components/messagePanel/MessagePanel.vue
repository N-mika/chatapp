<template>
  <div v-if="conversation.id !== ''" class="message-panel">
    <div class="head justify-between">
      <div class="flex">
        <div class="pdp"></div>
        <div class="detail">
          <div class="name">{{ conversation.name }}</div>
          <!-- <div class="status" :class="status?.status ? 'online' : 'offline'"></div> -->
        </div>
      </div>
      <div class="flex">
        Se deconecter
      </div>
    </div>
    <div class="message-containe">
      <ChatBulle :chatMessage="chatStore.currentChatMessageUser" :current-user="currentUser" />
    </div>
    <div class="p-2">
      <Input :currentUser="currentUser" :conversation="conversation" />
    </div>
  </div>
  <div v-else class="message-no-select">
    <h2>Veuillez selectionner une conversation</h2>
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
const currentUser = userStore.currentUser;
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