<template>
  <div class=" flex-1 bg-slate-100 flex items-center justify-center p-5">

    <div class="max-w-7xl bg-white rounded-3xl shadow-2xl overflow-hidden">

      <div class="grid lg:grid-cols-2">

        <!-- LEFT -->
        <section class="hidden lg:flex bg-primary text-white p-14 flex-col justify-between">

          <div>

            <div class="w-20 h-20 rounded-3xl bg-white/20 flex items-center justify-center text-4xl">
              💬
            </div>

            <h1 class="text-5xl font-bold mt-10">
              Chat App
            </h1>

            <p class="mt-6 text-lg text-white/90 leading-8">
              Communiquez instantanément avec vos collègues,
              vos amis ou votre équipe grâce à une plateforme
              rapide, sécurisée et moderne.
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

        <section class="flex items-center">

          <div class="w-full">

            <!-- ici tu mets ton formulaire -->
            <div class="bg-white rounded-tr-3xl rounded-br-3xl w-full max-w-md p-8">

              <!-- Logo -->
              <div class="flex justify-center mb-5">
                <div
                  class="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-white text-3xl font-bold">
                  💬
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

                  <input v-model="form.email" type="email" placeholder="exemple@gmail.com"
                    class="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-primary outline-none transition" />
                </div>

                <!-- Password -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Mot de passe
                  </label>

                  <div class="relative">
                    <input :type="showPassword ? 'text' : 'password'" v-model="form.password" placeholder="********"
                      class="w-full rounded-xl border border-gray-300 px-4 py-3 pr-12 focus:ring-2 focus:ring-primary outline-none" />

                    <button type="button" @click="showPassword = !showPassword"
                      class="absolute right-3 top-3 text-gray-500">
                      {{ showPassword ? "🙈" : "👁" }}
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
                  class="w-full bg-primary/80 hover:bg-primary transition text-white py-3 rounded-xl font-semibold">
                  Se connecter
                </button>

              </form>

              <div class="my-7 flex items-center">
                <div class="flex-1 h-px bg-gray-200"></div>

                <span class="px-4 text-gray-400 text-sm">
                  ou
                </span>

                <div class="flex-1 h-px bg-gray-200"></div>
              </div>

              <p class="text-center text-gray-600">
                Pas encore de compte ?

                <RouterLink to="/" class="text-primary font-semibold hover:underline">
                  S'inscrire
                </RouterLink>

              </p>

            </div>

          </div>

        </section>

      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"

type FormInput = {
  email: string
  password: string
  remember: boolean
}
const showPassword = ref<boolean>(false)

const form = ref<FormInput>({
  email: "",
  password: "",
  remember: false
})
const emit = defineEmits<{
  (e: 'login', form: FormInput): void
}>()
const login = () => {

  console.log(form.value);
  emit('login', form.value);
}
</script>