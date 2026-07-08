<template>
  <div class="w-full">
  <div v-if="showError" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
    @click="showError = false">
    <div @click.stop class="w-full max-w-sm bg-white rounded-3xl shadow-2xl p-6 animate-[fadeIn_.2s_ease]">
      <div class="flex items-start gap-4">
        <div class="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center">
          <AlertCircle class="w-7 h-7 text-red-500" />
        </div>
        <div class="flex-1">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-bold text-gray-800">
              Erreur
            </h2>
            <button @click="showError = false" class="text-gray-400 hover:text-gray-600">
              <X class="w-5 h-5" />
            </button>
          </div>
          <p class="text-gray-500 text-sm mt-2 leading-relaxed">Cette adresse e-mail existe déjà :</p>
          <div class="mt-3 px-4 py-3 bg-red-50 rounded-xl">
            <p class="text-red-600 font-medium break-all">
              {{ userForm.email }}
            </p>
          </div>
        </div>
      </div>
      <button @click="showError = false"
        class="w-full mt-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold transition">
        Compris
      </button>
    </div>
  </div>
    <div class="text-center flex flex-col gap-4">
      <div class="w-20 h-20 mx-auto rounded-2xl bg-primary flex items-center justify-center shadow-lg">
        <MessageCircleMore class="w-10 h-10 text-white" />
      </div>
      <h1 class="text-3xl font-bold text-gray-800 mt-5">Créer un compte</h1>
      <p class="text-gray-500 mt-2"> Rejoignez votre espace de discussion.</p>
    </div>
    <!-- Progression -->
    <div class="flex justify-center gap-2">
      <div v-for="i in 4" :key="i" class="h-2 rounded-full transition-all duration-300"
        :class="step >= i ? 'w-10 bg-primary' : 'w-3 bg-gray-300'"></div>
    </div>
    <form @submit.prevent="submitForm">
      <Transition name="slide" mode="out-in">
        <!-- Etape 1 -->
        <div v-if="step === 1" key="step1" class="space-y-5">
          <div>
            <label class="text-sm font-medium"> Nom</label>
            <div class="relative mt-2">
              <User class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5" />
              <input v-model="userForm.userName" type="text" placeholder="Votre nom"
                class="w-full pl-12 py-3 border rounded-xl focus:ring-2 focus:ring-primary outline-none" />
            </div>
          </div>
          <div>
            <label class="text-sm font-medium">
              Prénom
            </label>
            <div class="relative mt-2">
              <UserRound class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5" />
              <input v-model="userForm.surName" type="text" placeholder="Votre prénom"
                class="w-full pl-12 py-3 border rounded-xl focus:ring-2 focus:ring-primary outline-none" />
            </div>
          </div>
        </div>
        <!-- Etape 2 -->
        <div v-else-if="step === 2" key="step2" class="space-y-5">
          <div>
            <label class="text-sm font-medium">
              Adresse e-mail
            </label>
            <div class="relative mt-2">
              <Mail class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5" />
              <input v-model="userForm.email" type="email" placeholder="exemple@email.com"
                class="w-full pl-12 py-3 border rounded-xl focus:ring-2 focus:ring-primary outline-none" />
            </div>
          </div>
          <div>
            <label class="text-sm font-medium">Telephone</label>
            <div class="relative mt-2">
              <Phone class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5" />
              <input v-model="userForm.tel" type="tel" placeholder="+261 12 34 56 78"
                class="w-full pl-12 py-3 border rounded-xl focus:ring-2 focus:ring-primary outline-none" />
            </div>
          </div>
        </div>
        <!-- Etape 3 -->
        <div v-else-if="step === 3" key="step3" class="space-y-5">
          <div>
            <label class="text-sm font-medium">Mot de passe</label>
            <div class="relative mt-2">
              <LockKeyhole class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5" />
              <input v-model="userForm.password" :type="showPassword ? 'text' : 'password'" placeholder="••••••••"
                class="w-full pl-12 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-primary outline-none" />
              <button type="button" @click="showPassword = !showPassword"
                class="absolute right-4 top-1/2 -translate-y-1/2">
                <Eye v-if="!showPassword" class="w-5 text-gray-500" />
                <EyeOff v-else class="w-5 text-gray-500" />
              </button>
            </div>
          </div>
          <div>
            <label class="text-sm font-medium">Confirmation</label>
            <div class="relative mt-2">
              <ShieldCheck class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5" />
              <input v-model="confirmPassword" type="password" placeholder="••••••••"
                class="w-full pl-12 py-3 border rounded-xl focus:ring-2 focus:ring-primary outline-none" />
            </div>
            <p v-if="userForm.password !== confirmPassword && userForm.password !== ''" class="text-red-500 text-sm">
              Les mots de passe ne correspondent pas.
            </p>
          </div>
        </div>
        <!-- Etape 4 -->
        <div v-else key="step4">
          <label class="text-sm font-medium">Photo de profil (Facultatif) </label>
          <label
            class="mt-3 border-2 border-dashed rounded-xl p-8 flex flex-col items-center cursor-pointer hover:border-primary">
            <img v-if="preview" :src="preview" class="w-24 h-24 rounded-full object-cover mb-4" />
            <ImagePlus v-else class="w-12 h-12 text-primary" />
            <span class="text-sm text-gray-500 mt-3">Choisir une image</span>
            <input type="file" accept="image/*" class="hidden" @change="handleImage" />
          </label>
        </div>
      </Transition>
      <!-- Buttons -->
      <div class="flex justify-between mt-8">
        <button type="button" v-if="step > 1" @click="previous" class="px-5 py-3 border rounded-xl">
          Retour
        </button>
        <div v-else />
        <p v-if="errorMessage" class="text-red-500 text-sm text-center mt-4">
          {{ errorMessage }}
        </p>
        <button v-if="step < 4" type="button" @click="next"
          class="px-5 py-3 bg-primary text-white rounded-xl flex items-center gap-2">
          Suivant
          <ChevronRight class="w-5" />
        </button>
        <button v-else type="submit" class="px-5 py-3 bg-primary text-white rounded-xl">
          Créer le compte
        </button>
      </div>
    </form>
    <p class="text-center text-gray-600">
      Vous avez déjà un compte ?
      <button @click="onNavigate" class="text-primary font-semibold hover:underline">
        Se connecter
      </button>
    </p>
  </div>
</template>
<script setup lang="ts">
//@ts-ignore
import { v4 as uuid } from 'uuid'
import { ref, reactive } from "vue";
import { AlertCircle, ChevronRight, Eye, EyeOff, ImagePlus, LockKeyhole, Mail, MessageCircleMore, Phone, ShieldCheck, User, UserRound, X } from "@lucide/vue";
import type { User as UserType } from "../Data/DataType";
import { emptyUser } from "../Data/DataEmpty";
import { validateStep } from "./singUp";
import { onAddService } from '../Data/service';

const emeit = defineEmits<{
  (e: 'onNavigate', value: string): void
}>();
const step = ref<number>(1);
const showPassword = ref<boolean>(false);
const preview = ref<string | null>(null);
const confirmPassword = ref<string>('');
const userForm = reactive<UserType>(emptyUser);
const errorMessage = ref<string>('');
const showError = ref<boolean>(false)

const next = () => {

  if (!validateStep(step.value, userForm, confirmPassword.value).isValidStep) {
    errorMessage.value = validateStep(step.value, userForm, confirmPassword.value).errorMessage
    return
  }
  if (step.value < 4) {
    step.value++;
    errorMessage.value = '';
  }
}

const previous = () => {
  if (step.value > 1) {
    step.value--;
    errorMessage.value = '';
  }
}

const handleImage = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (file) {
    userForm.avatar = file.toString()
    preview.value = URL.createObjectURL(file)
  }
}
const onNavigate = async () => {
  emeit('onNavigate', 'login')
}

const submitForm = async () => {
  let idUser = uuid();
  userForm.id = idUser;
  const respons = await onAddService('adduser', userForm);
  if (respons === "success") {
    onNavigate();
    resetForm()
  }
  else{
    showError.value = true
  }
}
const resetForm = () => {
  step.value = 1;
  showPassword.value = false;
  preview.value = null;
  confirmPassword.value = '';
  Object.assign(userForm, emptyUser);
  errorMessage.value = '';
}
</script>
<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: .3s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>