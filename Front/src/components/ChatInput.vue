<template>
  <form @submit.prevent="onSend" class="flex items-end gap-2 rounded-2xl border border-gray-200 bg-white p-2 shadow-sm">
    <textarea v-model="text" :disabled="isSending" @keydown.enter.exact.prevent="onSend" rows="1"
      class="max-h-32 flex-1 resize-none rounded-xl bg-gray-50 p-3 text-gray-700 outline-none transition focus:bg-white focus:ring-2 focus:ring-primary disabled:opacity-60"
      placeholder="Écrivez votre message..." />

    <button type="submit" :disabled="!text.trim() || isSending"
      class="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-white transition hover:scale-105 hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50">
      <Send v-if="!isSending" :size="20" />
      <LoaderCircle v-if="isSending" :size="20" class="animate-spin" />
    </button>
  </form>
</template>

<script lang="ts" setup>
//@ts-ignore
import { v4 as uuid } from 'uuid'
import { ref } from 'vue';
import { LoaderCircle, Send } from '@lucide/vue';

import { ChatConversation, ChatMessage, User } from '../Data/DataType';
import { useChatStore } from '../Store/chat';
import { onAddService } from '../Data/service';
import { socket } from '../Socket/socket';

const props = defineProps<{
  conversation: ChatConversation,
  currentUser: User
}>();

const chatStore = useChatStore();
const text = ref<string>('');
const isSending = ref(false);

const onSend = async () => {
  if (!text.value.trim() || isSending.value) return;

  isSending.value = true;

  const message = text.value.trim();

  const newChatMessage: ChatMessage = {
    content: message,
    conversationId: props.conversation.id,
    id: uuid(),
    senderId: props.currentUser.id,
    createdAt: new Date().toISOString(),
  };

  try {
    const response = await onAddService("sendMessage", newChatMessage);

    if (response === "success") {
      chatStore.newChatMessage(newChatMessage);

      socket.emit("sendMessage", {
        newChatMessage,
        receiverId: "",
      });

      text.value = "";
    }
  } catch (err) {
    console.error(err);
  } finally {
    isSending.value = false;
  }
};
</script>