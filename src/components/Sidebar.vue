<template>
  <div class="sidebar">
    <div class="sidebar-icons">
      <i
        @click="handleLogout"
        class="icon exit white large"
        />
      <i
        @click="handleAddNewConversation"
        class="icon add white large"
      />
    </div>
    <div class="sidebar-title">
      <i class="icon logo white large" />
      <div>Fact-Checker</div>
    </div>
    <div class="sidebar-history-title">
      <div>History</div>
    </div>
    <div class="sidebar-history">
      <ul>
        <li
          v-for="item in items"
          :key="item.id"
          @click="handleOpenConversation(item.id)"
        >
          <div class="sidebar-history-text">{{ item.text }}</div>
          <i
            @click="handleDeleteConversation(item.id, $event)"
            class="icon delete white"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { apiService } from '@/composables/useApiService'
const emit = defineEmits(['add-new-conversation', 'open-conversation', 'delete-conversation']);

defineProps({
  items: {
    type: Array,
    required: true,
  },
});

const handleLogout = () => {
  apiService.auth.logout().then(() => {
    window.location = '/login';
  });
};

const handleAddNewConversation = () => {
  emit('add-new-conversation');
};

const handleOpenConversation = (id) => {
  emit('open-conversation', id);
};

const handleDeleteConversation= (id, event) => { //ez így szép?
  event.stopPropagation();
  emit('delete-conversation', id);
};
</script>
