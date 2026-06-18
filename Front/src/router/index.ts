import { createWebHistory, createRouter } from "vue-router";
import HelloWorld from "../components/HelloWorld.vue";
import MessagePanel from "../components/messagePanel/MessagePanel.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: HelloWorld },
    { path: "/message/:id", component: MessagePanel },
  ],
});
