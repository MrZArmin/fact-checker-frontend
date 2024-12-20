import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";

import { useUserStore } from '@/stores/user';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        title: "Kezdőlap",
      },
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
      meta: {
        title: "Belépés",
      },
    },

    {
      path: "/:catchAll(.*)",
      redirect: { name: "home" },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  document.title = to.meta.title;
  const publicViewNames = ['login'];
  
  const userStore = useUserStore();
  
  await userStore.init();
 
  const loggedIn = userStore.isLoggedIn;
  
  const toPublicView = publicViewNames.includes(to.name);
  
  if (!loggedIn && !toPublicView) {
    return next('/login');
  }

  if (loggedIn && toPublicView) {
    return next('/');
  }
  
  next();
});

export default router;
