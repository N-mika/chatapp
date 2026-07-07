import { defineStore } from "pinia";
import { User } from "../Data/DataType";
import { ref } from "vue";
import { emptyUser } from "../Data/DataEmpty";

export const useUserStore = defineStore("user", () => {
  const currentUser = ref<User>(emptyUser);
  const allUser = ref<User[]>([]);
  const setCurrentUser = (user: User) => {
    currentUser.value = user;
  };
  const setAllUser = (user: User[]) => {
    allUser.value = user;
  };
  return { currentUser, allUser, setCurrentUser, setAllUser };
});
