<template>
  <div class="sidebare">
    <input type="text" v-model="search" class="border bg-white border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Recherche...">
    <div class="all-user">
      <RouterLink :to="`/message/${conversation.id}`" class="user"
        v-for="(conversation, index) in conversationFiltred" :key="index">
        <div class="pdp"></div>
        <div class="detail">
          <div class="name">{{ conversation.name }}</div>
          <!-- <div class="status" v-if="conversation.userIdConversations.length >= 3"
            :class="conversation.userIdConversations.find(({ status }) => status === true) ? 'online' : 'offline'" /> -->
          <!-- <div class="status" v-else :class="getOtherUser(conversation, idActualuser)?.status ? 'online' : 'offline'" /> -->
        </div>
      </RouterLink>
    </div>
    <div class="new-chat">New Conversation</div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue';
import { useChatStore } from '../../Store/chat';

const search = ref<string>('');
const chatStore = useChatStore();

const conversationFiltred = computed(() => {
  return chatStore.chatConversations.filter(({ name }) => `${name}`.toLowerCase().indexOf(search.value.toLocaleLowerCase()) > -1)
})
</script>
<style lang="scss" src="./SideBare.scss" scoped></style>