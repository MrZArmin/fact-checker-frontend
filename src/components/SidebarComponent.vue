<template>
  <div class="sidebar">
    <div class="sidebar-icons">
      <i class="icon exit white large" @click="handleLogout" />
      <i
        v-if="canOpenNewConversation"
        class="icon add white large"
        @click="handleAddNewConversation"
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
      <div v-if="todaysChats.length" class="sidebar-section">
        <div class="sidebar-section-title">Mai beszélgetések</div>
        <ul>
          <li
            v-for="item in todaysChats"
            :key="item.id"
            :class="{ active: currentConversationId === item.id }"
            @click="handleOpenConversation(item.id)"
          >
            <div class="sidebar-history-text" :title="item.title">
              {{ item.title }}
            </div>
            <i
              class="icon delete white"
              @click.stop="handleDeleteConversation(item.id)"
            />
          </li>
        </ul>
      </div>

      <div v-if="last7DaysChats.length" class="sidebar-section">
        <div class="sidebar-section-title">Elmúlt 7 nap</div>
        <ul>
          <li
            v-for="item in last7DaysChats"
            :key="item.id"
            :class="{ active: currentConversationId === item.id }"
            @click="handleOpenConversation(item.id)"
          >
            <div class="sidebar-history-text" :title="item.title">
              {{ item.title }}
            </div>
            <i
              class="icon delete white"
              @click.stop="handleDeleteConversation(item.id)"
            />
          </li>
        </ul>
      </div>

      <div v-if="lastMonthOrOlderChats.length" class="sidebar-section">
        <div class="sidebar-section-title">Előző 30 nap vagy korábbi</div>
        <ul>
          <li
            v-for="item in lastMonthOrOlderChats"
            :key="item.id"
            :class="{ active: currentConversationId === item.id }"
            @click="handleOpenConversation(item.id)"
          >
            <div class="sidebar-history-text" :title="item.title">
              {{ item.title }}
            </div>
            <i
              class="icon delete white"
              @click.stop="handleDeleteConversation(item.id)"
            />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { apiService } from '@/composables/useApiService';
import { useUserStore } from '@/stores/user';
import { isToday, isWithinLast7Days, isWithinLastMonth } from '@/utils/date';

const props = defineProps({
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
const userStore = useUserStore();

const currentConversationId = computed(() => route.params.id ?? null);
const canOpenNewConversation = computed(() => (route.params.id ? true : false));

const todaysChats = computed(() =>
  props.items
    .filter(item => isToday(new Date(item.updated_at)))
    .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at)));

const last7DaysChats = computed(() =>
  props.items
    .filter(item => isWithinLast7Days(new Date(item.updated_at)))
    .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at)));

const lastMonthOrOlderChats = computed(() =>
  props.items
    .filter(item => isWithinLastMonth(new Date(item.updated_at)))
    .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at)));

const handleLogout = async () => {
  try {
    await apiService.auth.logout();
    userStore.logout();
    router.replace('/login');
  }
  catch (error) {
    console.error('Logout failed:', error);
  }
};

const handleAddNewConversation = () => {
  router.push('/new');
  emit('add-new-conversation');
};

const handleOpenConversation = id => {
  if (currentConversationId.value !== id) {
    router.push(`/${id}`);
  }
  emit('open-conversation', id);
};

const handleDeleteConversation = async id => {
  try {
    if (confirm('Are you sure you want to delete this conversation?')) {
      emit('delete-conversation', id);

      if (currentConversationId.value === id) {
        router.push('/new');
      }
    }
  }
  catch (error) {
    console.error('Error deleting conversation:', error);
  }
};
</script>
