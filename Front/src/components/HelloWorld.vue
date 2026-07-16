<template>
  <div class="flex w-full h-screen flex-col items-center justify-center bg-gray-50 text-center">
    <div class="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-200 text-gray-400">
      <MessageCircle :size="42" />
    </div>
    <h2 class="text-lg font-semibold text-gray-700">
      Veuillez sélectionner une conversation
    </h2>
    <p class="mt-2 text-sm text-gray-500">
      Choisissez une discussion dans la liste pour commencer à échanger.
    </p>
  </div>
</template>
<script setup lang="ts">
import { MessageCircle } from '@lucide/vue';

</script>
<style scoped></style>
