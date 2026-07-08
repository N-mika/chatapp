<template>
  <div class=" flex-1 bg-white flex items-center justify-center p-5">
    <div class="max-w-7xl bg-white rounded-3xl shadow-2xl overflow-hidden">
      <div class="grid lg:grid-cols-2">
        <section class="hidden lg:flex bg-primary text-white p-14 flex-col justify-between">
          <div>
            <div class="w-20 h-20 rounded-3xl bg-white/20 flex items-center justify-center text-4xl">
              <MessageCircle :size="42" />
            </div>
            <h1 class="text-5xl font-bold mt-10">Chat App</h1>
            <p class="mt-6 text-lg text-white/90 leading-8">
              Communiquez instantanément avec vos collègues, vos amis ou votre équipe grâce à une plateforme rapide,
              sécurisée et moderne.
            </p>
          </div>
          <div>
            <!-- <img
            src="/chat.svg"
            class="w-full"
          > -->
          </div>
        </section>
        <!-- RIGHT -->
        <section class="flex items-center p-8 lg:p-14 relative">
          <div class="absolute top-2 left-2">
            <button v-if="navigate === 'signup'" @click="navigate = 'login'"
              class="flex items-center gap-2 text-primary font-semibold hover:underline">
              <ArrowLeftCircle :size="20" />
              Retour
            </button>
          </div>
          <div v-if="navigate === 'login'" class="w-full">
            <div class="bg-white rounded-tr-3xl rounded-br-3xl w-full max-w-md">
              <!-- Logo -->
              <div class="flex justify-center mb-5">
                <div
                  class="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-white text-3xl font-bold">
                  <MessageCircle :size="32" />
                </div>
              </div>
              <h1 class="text-3xl font-bold text-center text-gray-800">
                Bienvenue
              </h1>
              <p class="text-center text-gray-500 mt-2 mb-8">
                Connectez-vous pour accéder à vos conversations.
              </p>
              <form @submit.prevent="login" class="space-y-5">
                <!-- Email -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Adresse email
                  </label>
                  <div class="relative">
                    <Mail class="absolute left-3 top-3.5 text-gray-400" :size="20" />
                    <input v-model="form.email" type="email" placeholder="exemple@gmail.com"
                      class="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-4 outline-none transition focus:ring-2 focus:ring-primary" />
                  </div>
                </div>
                <!-- Password -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Mot de passe
                  </label>
                  <div class="relative">
                    <Lock class="absolute left-3 top-3.5 text-gray-400" :size="20" />
                    <input :type="showPassword ? 'text' : 'password'" v-model="form.password" placeholder="********"
                      class="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-12 outline-none focus:ring-2 focus:ring-primary" />
                    <button type="button" @click="showPassword = !showPassword"
                      class="absolute right-3 top-3 text-gray-500 hover:text-primary">
                      <EyeOff v-if="showPassword" :size="20" />
                      <Eye v-else :size="20" />
                    </button>
                  </div>
                </div>
                <!-- Remember -->
                <div class="flex justify-between items-center text-sm">
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" v-model="form.remember">
                    Se souvenir de moi
                  </label>
                  <a href="#" class="text-primary hover:underline">
                    Mot de passe oublié ?
                  </a>
                </div>
                <!-- Button -->
                <button
                  class="group flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 font-semibold text-white transition-all hover:bg-primary/90 hover:scale-[1.02]">
                  Se connecter
                  <ArrowRight class="transition-transform group-hover:translate-x-1" :size="20" />
                </button>
              </form>
              <div class="my-7 flex items-center">
                <div class="flex-1 h-px bg-gray-200"></div>
                <span class="px-4 text-gray-400 text-sm">ou</span>
                <div class="flex-1 h-px bg-gray-200"></div>
              </div>
              <p class="text-center text-gray-600">
                Pas encore de compte ?
                <button @click="navigate = 'signup'" class="text-primary font-semibold hover:underline">
                  S'inscrire
                </button>
                <!-- <RouterLink to="/" >
                </RouterLink> -->
              </p>
            </div>
          </div>
          <SingUp v-if="navigate === 'signup'" @onNavigate="navigate = 'login'"/>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { onAuth, onGetByIdService, onGetService } from "../Data/service";
import { useAuthStore } from "../Store/auth";
import { useUserStore } from "../Store/user";
import { useChatStore } from "../Store/chat";
import { ChatConversation, ConversationUser, User } from "../Data/DataType";
import { MessageCircle, Mail, Lock, Eye, EyeOff, ArrowRight, ArrowLeftCircle } from "@lucide/vue";
import SingUp from "./SingUp.vue";

type FormInput = {
  email: string
  password: string
  remember: boolean
}
const navigate = ref<'login' | 'signup'>('login');
const showPassword = ref<boolean>(false);

const authStore = useAuthStore();
const userStore = useUserStore();
const chatStore = useChatStore();

const form = ref<FormInput>({
  email: "",
  password: "",
  remember: false
})
const emit = defineEmits<{
  (e: 'login', form: FormInput): void
}>()
const login = async () => {
  const response = await onAuth(form.value.email, form.value.password);
  if (response.status === 200) {
    const currentUser = response.data as User;
    localStorage.setItem("user", JSON.stringify(currentUser));

    const allUsers = await onGetService<User>('getusers');
    const chatConversations = await onGetByIdService<ChatConversation>('getchatconversation', currentUser.id);
    const conversationUser = await onGetByIdService<ConversationUser>('getconversationuser', currentUser.id, chatStore.currentChatConversation.id);

    userStore.setAllUser(allUsers);
    authStore.setAuthenticated(true);
    userStore.setCurrentUser(currentUser);
    chatStore.setChatConversations(chatConversations);
    chatStore.setConversationUser(conversationUser);
  }
}

</script>