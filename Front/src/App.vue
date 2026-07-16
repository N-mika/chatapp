<template>
  <div class="flex gap-0.5 h-screen w-full">
    <Login v-if="!authStore.isAuthenticated" />
    <div v-else class="flex gap-0.5 flex-1">
      <SideBare />
      <router-view></router-view>
    </div>
  </div>
</template>
<script setup lang="ts">
import SideBare from './components/Sidebare/SideBare.vue';
import { onMounted } from 'vue';
import type { User } from './Data/DataType';
import Login from './components/Login.vue';
import { useAuthStore } from './Store/auth.ts';
import { initializeDataUser } from './Data/initialDataUser.ts';

const authStore = useAuthStore();

onMounted(async () => {
  const user = localStorage.getItem("user");

  if (!user) return;

  const currentUser: User = JSON.parse(user);

  await initializeDataUser(currentUser);
});
</script>
