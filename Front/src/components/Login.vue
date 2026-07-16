<template>
  <div class=" flex-1 bg-white flex items-center justify-center p-5">

    <div class="max-w-7xl bg-white rounded-3xl shadow-2xl overflow-hidden">
      <div class="grid lg:grid-cols-2">
        <section class="hidden p-14 lg:flex flex-col justify-between bg-primary text-white">
          <div class="flex flex-col gap-10">
            <!-- En-tête -->
            <div class="flex flex-col gap-6">
              <div class="flex h-20 w-20 items-center justify-center rounded-3xl bg-white/20">
                <MessageCircle :size="42" />
              </div>

              <div class="flex flex-col gap-3">
                <h1 class="text-5xl font-bold">
                  Chat App
                </h1>

                <p class="text-lg leading-8 text-white/90">
                  Une application Full Stack conçue pour démontrer mes compétences en
                  développement web moderne et en communication temps réel.
                </p>
              </div>
            </div>

            <!-- Compétences -->
            <div class="flex flex-col gap-4 text-white/90">
              <div class="flex items-center gap-3">
                <span>
                  <CircleCheck :size="18" class="text-white" />
                </span>
                <span>Vue 3 + TypeScript + Composition API</span>
              </div>

              <div class="flex items-center gap-3">
                <CircleCheck :size="18" class="text-white" />
                <span>Pinia pour la gestion d'état</span>
              </div>

              <div class="flex items-center gap-3">
                <CircleCheck :size="18" class="text-white" />
                <span>Tailwind CSS & interface responsive</span>
              </div>

              <div class="flex items-center gap-3">
                <CircleCheck :size="18" class="text-white" />
                <span>Node.js + Express + MongoDB</span>
              </div>

              <div class="flex items-center gap-3">
                <CircleCheck :size="18" class="text-white" />
                <span>Socket.IO pour la messagerie en temps réel</span>
              </div>

              <div class="flex items-center gap-3">
                <CircleCheck :size="18" class="text-white" />
                <span>Authentification sécurisée</span>
              </div>

              <div class="flex items-center gap-3">
                <CircleCheck :size="18" class="text-white" />
                <span>Déploiement Frontend & Backend</span>
              </div>
            </div>
          </div>
        </section>
        <!-- RIGHT -->
        <section class="flex items-center p-14 lg:p-14 relative">
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
                  <ArrowRight v-if="!isLoading " class="transition-transform group-hover:translate-x-1" :size="20" />
                  <LoaderCircle v-else :size="20" class="animate-spin" />
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
          <SingUp v-if="navigate === 'signup'" @onNavigate="navigate = 'login'" />
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { onAuth } from "../Data/service";
import { User } from "../Data/DataType";
import { MessageCircle, Mail, Lock, Eye, EyeOff, ArrowRight, ArrowLeftCircle, CircleCheck, LoaderCircle } from "@lucide/vue";
import SingUp from "./SingUp.vue";
import { initializeDataUser } from "../Data/initialDataUser.ts";

type FormInput = {
  email: string
  password: string
  remember: boolean
}

const navigate = ref<'login' | 'signup'>('login');
const showPassword = ref<boolean>(false);
const isLoading = ref<boolean>(false);
const form = ref<FormInput>({
  email: "",
  password: "",
  remember: false
})
const emit = defineEmits<{
  (e: 'login', form: FormInput): void
}>()
const login = async () => {
  try {
    isLoading.value = true
    const response = await onAuth(form.value.email, form.value.password);

    if (response.status !== 200) return;

    const currentUser = response.data as User;

    localStorage.setItem("user", JSON.stringify(currentUser));

    await initializeDataUser(currentUser);
  } catch {

  }
  finally {
    isLoading.value = false
  }

};

</script>