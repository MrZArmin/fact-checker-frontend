<template>
  <div class="sidebar">
    <div class="sidebar-icons">
      <i @click="handleLogout" class="icon exit white large" />
      <i
        v-if="canOpenNewConversation"
        @click="handleAddNewConversation"
        class="icon add white large"
      />
    </div>

    <div class="sidebar-title">
      <i class="icon logo white large" />
      <div>Fact-Checker</div>
    </div>

    <div class="sidebar-history-title">
      <div>Előzmények</div>
    </div>

    <div class="sidebar-history">
      <ul>
        <li
          v-for="item in items"
          :key="item.id"
          @click="handleOpenConversation(item.id)"
          :class="{ active: currentConversationId === item.id }"
        >
          <div class="sidebar-history-text" :title="item.title">
            {{ item.title }}
          </div>
          <i
            @click.stop="handleDeleteConversation(item.id)"
            class="icon delete white"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { apiService } from '@/composables/useApiService';

defineProps({
  items: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits([
  'add-new-conversation',
  'open-conversation',
  'delete-conversation',
]);
const router = useRouter();
const route = useRoute();

const currentConversationId = computed(() => route.params.id ?? null);

const canOpenNewConversation = computed(() => (route.params.id ? true : false));

const handleLogout = async () => {
  try {
    await apiService.auth.logout();
    emit('logout');
    router.push('/login');
  } catch (error) {
    console.error('Logout failed:', error);
  }
};

const handleAddNewConversation = () => {
  router.push('/new');
  emit('add-new-conversation');
};

const handleOpenConversation = (id) => {
  if (currentConversationId.value !== id) {
    router.push(`/${id}`);
    emit('open-conversation', id);
  }
};

const handleDeleteConversation = async (id) => {
  try {
    // Show confirmation dialog
    if (confirm('Are you sure you want to delete this conversation?')) {
      emit('delete-conversation', id);

      // If we're deleting the current conversation, redirect to new
      if (currentConversationId.value === id) {
        router.push('/new');
      }
    }
  } catch (error) {
    console.error('Error deleting conversation:', error);
  }
};
</script>
