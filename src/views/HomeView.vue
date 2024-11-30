<template>
  <div class="home">
    <Sidebar @logout="handleLogout" @add-new-conversation="handleAddNewConversation" @open-chat="handleOpenChat"
      :items=history />
    <Conversation v-if="!isEmpty" :loading="isLoading" :initial="conv" />
    <Input  v-else @send="handleSend" />
  </div>
</template>
<script setup>

import { ref } from 'vue';

import Sidebar from '@/components/Sidebar.vue';
import Conversation from '@/components/Conversation.vue';
import Input from '@/components/Input.vue';

const history = [
  { id: 1, text: 'asdasdsasadsadasdsadsaddadsadsaddadsadsaddadsadsadda' },
  { id: 2, text: 'asdasdsasadsadsadsaddadsadsaddadsadsaddadasdsadsadda' },
  { id: 3, text: 'asdadsadsaddadsadsaddasdsasadsadasdsadsadda' },
  { id: 4, text: 'asdasdsasadsadasdsadsadda' },
  { id: 5, text: 'asdasdsasadsadasdsadsadda' },
  { id: 6, text: 'asdasdsasadsadasdsadsadda' },
  { id: 7, text: 'asdasdsasadsadasdsadsadda' },
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
  { id: 20, text: 'asdasdsasadsadasdsadsadda' }
];

let isLoading = ref(false);
let conv = ref("");
let isEmpty = ref(true);

const handleLogout = () => {
  console.log("logging out");
};

const handleAddNewConversation = () => {
  console.log("adding new conversation");
};

const handleOpenChat = (id) => {
  console.log("opening chat id: ", id);
};

const handleSend = (text) => {
  isEmpty.value = false;
  conv.value = text;
  isLoading.value = true;
};

</script>
