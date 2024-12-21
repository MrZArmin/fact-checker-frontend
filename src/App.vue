<template>
  <div class="main-content">
    <RouterView />
  </div>
</template>

<script>
import { useUserStore } from '@/stores/user';

export default {
  name: 'App',

  async created() {
    try {
      const userStore = useUserStore();

      if (!userStore.isLoggedIn) {
        return;
      }

      const meResponse = await userStore.fetchMe(true);

      if (meResponse.payload) {
        userStore.init();
      }
      userStore.init();
    } catch (e) {
      console.error('[App] Failed to fetch user', e);
    }
  },
};
</script>
