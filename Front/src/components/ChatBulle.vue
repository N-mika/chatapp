<template>
  <div class="flex flex-col gap-3 w-full">
    <div
      v-for="(message, index) in chatMessage"
      :key="index"
      class="flex"
      :class="message.senderId === currentUser?.id 
        ? 'justify-end' 
        : 'justify-start'"
    >
      <div
        class="max-w-[75%] rounded-2xl px-4 py-2 text-sm shadow-sm whitespace-pre-wrap"
        :class="message.senderId === currentUser?.id
          ? 'bg-primary text-white rounded-br-none'
          : 'bg-gray-200 text-gray-800 rounded-bl-none'"
      >

        {{ message.content }}

      </div>

    </div>

  </div>
</template>


<script lang="ts" setup>
import { ChatMessage, User } from '../Data/DataType';

defineProps<{
  currentUser: User,
  chatMessage: ChatMessage[]
}>()
</script>