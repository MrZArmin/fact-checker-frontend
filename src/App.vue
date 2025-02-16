<template>
  <div class="main-content">
    <RouterView />
  </div>
</template>

<script>
import { apiService } from '@/composables/useApiService';
import { useChatStore } from '@/stores/chat';
import { useUserStore } from '@/stores/user';

export default {
  name: 'App',

  async created() {
    try {
      const userStore = useUserStore();
      const chatStore = useChatStore();

      if (!userStore.isLoggedIn) {
        return;
      }

      await apiService.chat.getSessions();
      if (this.$route.params.id) {
        chatStore.setCurrenSessionFromId(this.$route.params.id);
      }

      const meResponse = await userStore.fetchMe(true);
      if (meResponse.payload) {
        userStore.init();
      }

      userStore.init();
    }
    catch (e) {
      console.error('[App] Failed to fetch user', e);
    }
  },
};
</script>
