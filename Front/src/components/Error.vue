<template>
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
              {{ email }}
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
</template>
<script lang="ts" setup>
import { AlertCircle, X } from '@lucide/vue';

const props = defineProps<{ showError: boolean, email: string }>()
</script>