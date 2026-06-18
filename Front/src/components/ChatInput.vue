<template>
  <form @submit.prevent="onSend" class=" bg-white p-2 gap-0 rounded-2xl flex">
    <textarea @keydown.enter="onSend" id="message"
      class="w-full resize-none border-none bg-white p-3 outline-none "
      placeholder="Encrivez votre message" v-model="text"></textarea>
    <button type="submit" class="bg-primary text-white font-bold px-4 py-2 self-center rounded-xl">Envoie</button>
  </form>
</template>
<script lang="ts" setup>
//@ts-ignore
import { v4 as uuid } from 'uuid'
import { ref } from 'vue';
import { ChatConversation, ChatMessage, User } from '../Data/DataType';
import { useChatStore } from '../Store/chat';
import { onAddService } from '../Data/service';
import { socket } from '../Socket/socket';

const props = defineProps<{ conversation: ChatConversation, currentUser: User }>();
const chatStore = useChatStore();

const text = ref<string>('');

const onSend = async () => {
  let newChatMessage: ChatMessage = {
    content: text.value,
    conversationId: props.conversation.id,
    id: uuid(),
    senderId: props.currentUser.id
  }
  try {
    const response = await onAddService('sendMessage', newChatMessage);
    if (response == 'success') {
      chatStore.newChatMessage(newChatMessage);
      socket.emit('sendMessage', { newChatMessage, receiverId: '' });
    }
  }
  catch (err) {
    console.log(err)
  }
  text.value = ''
}
</script>
<style scoped></style>