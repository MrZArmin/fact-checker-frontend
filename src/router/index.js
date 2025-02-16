import { createRouter, createWebHistory } from 'vue-router';

import { useUserStore } from '@/stores/user';
import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      redirect: { name: 'new-conversation' },
      meta: {
        title: 'Kezdőlap',
      },
      children: [
        {
          path: 'new',
          name: 'new-conversation',
          component: HomeView,
        },
        {
          path: ':id',
          name: 'conversation',
          component: HomeView,
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        title: 'Belépés',
      },
    },

    {
      path: '/:catchAll(.*)',
      redirect: { name: 'home' },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  document.title = to.meta.title;
  const publicViewNames = [ 'login' ];

  const userStore = useUserStore();

  await userStore.init(true);

  const loggedIn = userStore.isLoggedIn;

  const toPublicView = publicViewNames.includes(to.name);

  if (!loggedIn && !toPublicView) {
    return next('/login');
  }

  next();
  return true;
});

export default router;
