<template>
  <div class="flex h-screen w-full items-center justify-center bg-slate-50">
    <div class="flex flex-col items-center gap-6">

      <div class="flex h-20 w-20 animate-pulse items-center justify-center rounded-3xl bg-primary text-white">
        <MessageCircle :size="42" />
      </div>
      <div class="text-center">
        <h1 class="text-2xl font-bold text-slate-800">
          Chat App
        </h1>
        <p class="mt-2 text-slate-500">
          Chargement de vos conversations...
        </p>
      </div>
      <div class="flex gap-2">
        <span class="h-3 w-3 animate-bounce rounded-full bg-primary"></span>
        <span class="h-3 w-3 animate-bounce rounded-full bg-primary" style="animation-delay: .15s"></span>
        <span class="h-3 w-3 animate-bounce rounded-full bg-primary" style="animation-delay: .3s"></span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { MessageCircle } from '@lucide/vue';

</script>