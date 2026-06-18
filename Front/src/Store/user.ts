import { defineStore } from "pinia";
// import { emptyUser } from "../Data/DataEmpty";
import { User } from "../Data/DataType";
import { currentUser as currentUserData, users } from "../Data/Data";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const currentUser = ref<User>(currentUserData);
  const allUser = ref<User[]>(users.value);
  const setCurrentUser = (user: User) => {
    currentUser.value = user;
  };
  const setAllUser = (user: User[]) => {
    allUser.value = user;
  };
  return { currentUser, allUser, setCurrentUser, setAllUser };
});
