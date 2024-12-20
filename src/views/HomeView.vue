<template>
  <div
    class="home"
    :class="{ 'sidebar-open' : isSidebarOpen }"
    ref="home"
  >
  <i
    @click="handleToggleSidebar"
    class="icon hamburger large white">
  </i>
    <Sidebar
      :class="{ open : isSidebarOpen }"
      :items="history"
      @logout="handleLogout"
      @add-new-conversation="handleAddNewConversation"
      @open-conversation="handleOpenConversation"
      @delete-conversation="handleDeleteConversation"
      ref="sidebar"
    />
    <Conversation v-if="!isEmpty" :loading="isLoading" :conversation="conv" @send="handleSend"/>
    <div v-else class="home-input-container">
      <div class="home-title">Mit szeretnél megtudni?</div>
      <Input @send="handleSend" />
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';

import Sidebar from '@/components/Sidebar.vue';
import Conversation from '@/components/Conversation.vue';
import Input from '@/components/Input.vue';

const history = [
  { id: 1, text: 'Armin Arlelt' },
  { id: 2, text: 'asdasdsasadsadsadsaddadsadsaddadsadsaddadasdsadsadda' },
  { id: 3, text: 'asdadsadsaddadsadsaddasdsasadsadasdsadsadda' },
  { id: 4, text: 'asdasdsasadsadasdsadsadda' },
  { id: 5, text: 'asdasdsasadsadasdsadsadda' },
  { id: 6, text: 'asdasdsasadsadasdsadsadda' },
  { id: 7, text: 'asdasds' },
  { id: 8, text: 'asdasdsasadsadasdsadsadda' },
  { id: 9, text: 'asdasdsasadsadasdsadsadda' },
  { id: 10, text: 'asdasdsasadsadasdsadsadda' },
  { id: 11, text: 'asdasdsasadsadasdsadsadda' },
  { id: 12, text: 'asdasdsasadsadasdsadsadda' },
  { id: 13, text: 'asdasdsasadsadasdsadsadda' },
  { id: 14, text: 'asdasdsasadsadasdsadsadda' },
  { id: 15, text: 'asdasdsasadsadasdsadsadda' },
  { id: 16, text: 'asdasdsasadsadasdsadsadda' },
  { id: 17, text: 'asdasdsasadsadasdsadsadda' },
  { id: 18, text: 'asdasdsasadsadasdsadsadda' },
  { id: 19, text: 'asdasdsasadsadasdsadsadda' },
  { id: 20, text: 'egér' },
];

const sidebar = ref(null)
const home = ref(null)
let isLoading = ref(false);
let conv = ref({ type: '', text: '' });
let isEmpty = ref(true);
const isSidebarOpen = ref(false);

const handleLogout = () => {
  console.log('logging out');
};

const handleAddNewConversation = () => {
  console.log('adding new conversation');
};

const handleOpenConversation = (id) => {
  console.log('opening conversation id: ', id);
};

const handleDeleteConversation = (id) => {
  console.log('deleting conversation id: ', id);
};

const handleToggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const handleSend = async (prompt) => {
  isEmpty.value = false;

  // Simulate loading state for AI response
  isLoading.value = true;

  // Wait for response
  await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate delay
  const answer = apiResponse(prompt);

  // Update with the AI's response
  conv.value = { type: 'ai', text: answer };
  isLoading.value = false;
};

const apiResponse = (prompt) => {
  console.log('prompt: ', prompt);
  const answer = 'sasageyo';
  return answer;
};
</script>
