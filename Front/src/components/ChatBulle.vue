<template>
  <div :class="message.senderId === currentUser?.id ? 'send' : 'receive'" v-for="(message, index) in chatMessage"
    :key="index">
    {{ message.content }}
  </div>
</template>
<script lang="ts" setup>
import { ChatMessage, User } from '../Data/DataType';

const props = defineProps<{ currentUser: User, chatMessage: ChatMessage[] }>()

</script>
<style lang="scss" scoped>
@use '../assets/Style/Style.scss' as *;
.send {
  background-color: $mostly;
  color: $white;
  align-self: flex-start;
  padding: .5em 1em;
  border-radius: 1em;
}

.receive {
  background-color: $black;
  color: $white;
  align-self: flex-end;
  padding: .5em 1em;
  border-radius: 1em;
}
</style>