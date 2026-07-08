<template>
  <transition name="fade">
    <div v-if="modelValue" class="fixed inset-0 z-50 flex items-center justify-center">
      <!-- Overlay -->
      <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="close"></div>
      <!-- Modal -->
      <div class="relative w-[90%] max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <!-- Header -->
        <div class="mb-5 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
              <MessageCirclePlus :size="22" />
            </div>
            <div>
              <h2 class="font-bold text-gray-800">
                Nouvelle conversation
              </h2>
              <p class="text-sm text-gray-500">
                Choisissez un utilisateur
              </p>
            </div>
          </div>
          <button @click="close" class="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700">
            <X :size="20" />
          </button>
        </div>
        <!-- Recherche -->
        <div class="relative mb-4">
          <Search class="absolute left-3 top-3 text-gray-400" :size="18" />
          <input v-model="search" type="text" placeholder="Rechercher un utilisateur..."
            class="w-full rounded-xl border border-gray-300 py-2.5 pl-10 pr-3 outline-none focus:ring-2 focus:ring-primary" />
        </div>
        <!-- Liste utilisateurs -->
        <div class="max-h-60 space-y-2 overflow-y-auto">
          <button v-for="user in filteredUsers" :key="user.id" @click="selectedUser = user"
            class="flex w-full items-center gap-3 rounded-xl p-3 transition hover:bg-gray-100"
            :class="selectedUser?.id === user.id ? 'bg-primary/10 border border-primary' : ''">
            <div class="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white font-semibold">
              {{ user.surName.charAt(0).toUpperCase() }}
            </div>
            <div class="text-left">
              <p class="font-medium text-gray-800">
                {{ user.surName }}
              </p>
              <p class="text-sm text-gray-500">
                {{ user.email }}
              </p>
            </div>
          </button>
          <p v-if="filteredUsers.length === 0" class="py-5 text-center text-sm text-gray-500">
            Aucun utilisateur trouvé
          </p>
        </div>
        <!-- Footer -->
        <div class="mt-6 flex justify-end gap-2">
          <button @click="close" class="rounded-xl bg-gray-200 px-4 py-2 transition hover:bg-gray-300">
            Annuler
          </button>
          <button @click="createConversation" :disabled="!selectedUser"
            class="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-white transition hover:bg-primary/90 disabled:opacity-50">
            <Plus :size="18" /> Créer
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
//@ts-ignore
import { v4 as uuid } from 'uuid'
import { computed, ref } from "vue";
import { X, Search, Plus, MessageCirclePlus } from "@lucide/vue";
import { ChatConversation, ConversationUser, User } from "../Data/DataType";
import { onAddService } from "../Data/service";
import { useUserStore } from '../Store/user';

const props = defineProps<{
  modelValue: boolean,
  users: User[]
}>();
const userStore = useUserStore()
const emit = defineEmits([
  "update:modelValue",
  "create"
]);

const search = ref("");
const selectedUser = ref<User | null>(null);

const filteredUsers = computed(() => {
  return props.users.filter(user => user.surName.toLowerCase().includes(search.value.toLowerCase()));
});

const close = () => {
  emit("update:modelValue", false);
};

const createConversation = () => {
  let idConversation = uuid();
  if (!selectedUser.value)
    return;
  let conversationUser: ConversationUser[] = [
    { idConversation: idConversation, idUser: selectedUser.value.id, isRead: false },
    { idConversation: idConversation, idUser: userStore.currentUser.id, isRead: false },
  ]
  let chatConversation: ChatConversation = {
    id: idConversation, userIdConversations: [userStore.currentUser.id, selectedUser.value.id]
  }
  // emit("create", selectedUser.value);
  onAddService('setconversationUser', conversationUser);
  onAddService('setchatconversation', chatConversation);
  close();
};
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: .2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>