import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const isAuthenticated = ref<boolean>(false);
  const isLoading = ref(true);

  const setLoading = (loading: boolean) => {
    isLoading.value = loading;
  };
  const setAuthenticated = (value: boolean) => {
    isAuthenticated.value = value;
  }
  return { isAuthenticated, isLoading, setAuthenticated, setLoading };
});