<template>
  <aside class="
      flex flex-col border-r border-gray-200 bg-white
      h-screen w-full
      lg:w-80
      lg:shrink-0
    ">
    <!-- Header -->
    <div class="flex items-center justify-between border-b border-gray-100 p-4">
      <div class="flex min-w-0 items-center gap-3">
        <div
          class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">
          {{ userStore.currentUser.userName?.charAt(0).toUpperCase() }}
        </div>

        <div class="min-w-0">
          <h2 class="truncate text-sm font-semibold text-gray-800">
            {{ userStore.currentUser.userName }}
          </h2>

          <p class="truncate text-xs text-gray-500">
            {{ userStore.currentUser.email }}
          </p>
        </div>
      </div>

      <button @click="onLogout" class="
          rounded-lg p-2 text-gray-500
          transition hover:bg-red-50 hover:text-red-600
        ">
        <LogOut :size="20" />
      </button>
    </div>


    <!-- Search -->
    <div class="p-3 sm:p-4">
      <input v-model="search" type="text" placeholder="Rechercher une conversation..." class="
          w-full rounded-xl border border-gray-300
          bg-gray-50 px-4 py-2
          text-sm
          outline-none transition
          focus:border-primary
          focus:bg-white
          focus:ring-2 focus:ring-primary
        " />
    </div>


    <!-- Conversations -->
    <div class="
        flex-1 overflow-y-auto
        space-y-2
        px-2 sm:px-3
        pb-3
      ">
      <RouterLink v-for="conversation in conversationFiltred" :key="conversation.id" :to="`/message/${conversation.id}`"
        active-class="bg-primary/60 text-white" class="
          flex items-center gap-3
          rounded-xl p-3
          transition
          hover:bg-gray-100
        ">

        <div class="
            flex h-11 w-11 shrink-0
            items-center justify-center
            rounded-full
            bg-primary
            font-semibold
            text-white
          ">
          {{
            conversation.name?.charAt(0).toLocaleUpperCase()
            ||
            findUser(
              userStore.allUser,
              conversation.userIdConversations,
              userStore.currentUser.id
            )
              .userName.charAt(0)
              .toLocaleUpperCase()
          }}
        </div>


        <div class="min-w-0 flex-1">
          <h3 class="truncate text-sm font-medium text-gray-800">
            {{
              conversation.name ||
              findUser(
                userStore.allUser,
                conversation.userIdConversations,
                userStore.currentUser.id
              ).userName
            }}
          </h3>

          <p class="truncate text-xs text-gray-500 sm:text-sm">
            {{
              truncate(
                getLastMessageForConversation(
                  currentConversation(conversation.id)
                ).content
              )
            }}
          </p>
        </div>

      </RouterLink>
    </div>


    <!-- Footer -->
    <div class="border-t border-gray-200 p-3 sm:p-4">
      <button @click="showNewConversation = true" class="
          flex w-full items-center justify-center
          gap-2 rounded-xl
          bg-primary
          py-3
          text-sm sm:text-base
          font-semibold
          text-white
          transition
          hover:bg-primary/90
        ">
        <PlusCircle :size="20" />
        <span>
          Nouvelle conversation
        </span>
      </button>
    </div>


    <NewConversationModal v-model="showNewConversation" :users="userNewChatConversation" />

  </aside>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue';
import { useChatStore } from '../../Store/chat';
import { useUserStore } from '../../Store/user';
import { useAuthStore } from '../../Store/auth';
import { LogOut, PlusCircle } from '@lucide/vue';
import NewConversationModal from '../NewConversation.vue';
import { findUser } from '../../utils/find.ts';
import { getLastMessageForConversation, truncate } from './SideBare.ts';
// import { findUser } from '../../utils/find.ts';

const authStore = useAuthStore();
const search = ref<string>('');
const chatStore = useChatStore();
const userStore = useUserStore();
const showNewConversation = ref<boolean>(false);

const userNewChatConversation = computed(() =>
  userStore.allUser.filter(user =>
    !chatStore.chatConversations.some(conversation =>
      conversation.userIdConversations.includes(user.id)
    )
  )
);

const onLogout = () => {
  localStorage.removeItem("user");
  authStore.setAuthenticated(false);
}
const conversationFiltred = computed(() => {
  return chatStore.chatConversations.filter(({ name }) => `${name}`.toLowerCase().indexOf(search.value.toLocaleLowerCase()) > -1)
})
const currentConversation = (id: string) => {
  return chatStore.allChatMessage.filter(({ conversationId }) => id === conversationId)
}
</script>
<style lang="scss" src="./SideBare.scss" scoped></style>