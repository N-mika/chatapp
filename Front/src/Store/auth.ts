import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const isAuthenticated = ref<boolean>(false);
  const setAuthenticated = (value: boolean) => {
    isAuthenticated.value = value;
  }
  return { isAuthenticated, setAuthenticated };
});