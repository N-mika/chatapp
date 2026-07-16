<template>
  <div class="flex gap-0.5 h-screen w-full">
    <LoadingPage v-if="authStore.isLoading"/>
    <Login v-else-if="!authStore.isAuthenticated" />
    <div v-else class="flex gap-0.5 flex-1">
      <SideBare />
      <router-view></router-view>
    </div>
  </div>
</template>
<script setup lang="ts">
import SideBare from './components/Sidebare/SideBare.vue';
import { onMounted } from 'vue';
import Login from './components/Login.vue';
import { useAuthStore } from './Store/auth.ts';
import { initializeDataUser } from './Data/initialDataUser.ts';
import LoadingPage from './components/LoadingPage.vue';

const authStore = useAuthStore();

onMounted(async () => {
  authStore.setLoading(true);
  try {
    const user = localStorage.getItem("user");

    if (user) {
      await initializeDataUser(JSON.parse(user));
    }
  } finally {
    authStore.setLoading(false);
  }

});
</script>
