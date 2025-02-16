<template>
  <div ref="homeRef" class="home" :class="{ 'sidebar-open': isSidebarOpen }">
    <i class="icon large white" :class="isSidebarOpen ? 'close' : 'hamburger'" @click="toggleSidebar"></i>

    <sidebar
      :class="{ open: isSidebarOpen }"
      :items="sessions"
      @add-new-conversation="handleAddNewConversation"
      @open-conversation="handleOpenConversation"
      @delete-conversation="handleDeleteConversation"
    />

    <template v-if="!isEmpty">
      <conversation
        :loading="isLoading"
        :messages="currentMessages"
        :error="sendReturnedError"
        @send="handleSend"
      />
    </template>
    <template v-else>
      <div class="home-input-container">
        <div class="home-title">Mit szeretnél megtudni?</div>
        <Input @send="handleSend" />
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed, ref, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';

import Message from '../entities/Message';
import Conversation from '@/components/ConversationComponent.vue';
import Input from '@/components/InputComponent.vue';
import Sidebar from '@/components/SidebarComponent.vue';
import { apiService } from '@/composables/useApiService';
import Session from '@/entities/Session.js';
import { useChatStore } from '@/stores/chat';

const route = useRoute();
const router = useRouter();
const chatStore = useChatStore();

const homeRef = ref(null);
const isLoading = ref(false);
const isEmpty = ref(true);
const isSidebarOpen = ref(false);
const sendReturnedError = ref(false);
const currentSession = ref(null);

const sessions = computed(() => chatStore.getSessions);
const currentMessages = computed(() => currentSession.value?.messages || []);

watchEffect(async () => {
  const sessionId = route.params.id;
  if (!sessionId) {
    return;
  }

  isLoading.value = true;
  chatStore.setCurrenSessionFromId(sessionId);
  currentSession.value = chatStore.getCurrentSession;
  await loadConversation();
  isLoading.value = false;
});

const loadConversation = async () => {
  if (!currentSession.value || currentSession.value.messages.length) {
    return;
  }

  try {
    const { payload } = await apiService.chat.getMessages(currentSession.value.id);
    isEmpty.value = payload.messages.length === 0;
    currentSession.value.setMessages(payload.messages);
  }
  catch (error) {
    console.error('Error loading conversation:', error);
    router.push('/new');
  }
};

const handleAddNewConversation = () => {
  chatStore.setDefault();
  currentSession.value = null;
  isEmpty.value = true;
  toggleSidebar();
};

const handleOpenConversation = id => {
  router.push(`/${id}`);
  toggleSidebar();
};

const handleDeleteConversation = async id => {
  try {
    await apiService.chat.deleteSession(id);
    chatStore.removeSession(id);

    if (currentSession.value?.id === id) {
      chatStore.setDefault();
      currentSession.value = null;
      isEmpty.value = true;
      router.push('/new');
    }
  }
  catch (error) {
    console.error('Error deleting conversation:', error);
    toast.error('Hiba történt törlés közben');
  }
};

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const handleSend = async prompt => {
  if (!prompt.trim()) {
    return;
  }

  isEmpty.value = false;
  isLoading.value = true;
  loadToBottom();

  try {
    if (!currentSession.value) {
      const session = new Session(await apiService.chat.startSession(prompt));
      chatStore.addSession(session);
      chatStore.setCurrenSessionFromId(session.id);
      currentSession.value = chatStore.getCurrentSession;
      router.push(`/${session.id}`);
    }

    currentSession.value.addMessage(new Message({ sender: 'user', message: prompt }));

    const response = await apiService.chat.sendMessage(currentSession.value.id, prompt);
    if (response.error) {
      throw new Error('API response error');
    }

    currentSession.value.updated_at = response.session.updated_at;
  }
  catch (error) {
    console.error('Error sending message:', error);
    sendReturnedError.value = true;
    toast.error('Hiba a válasz generálása közben');
  }
  finally {
    isLoading.value = false;
  }
};

const loadToBottom = () => {
  setTimeout(() => {
    homeRef.value?.scrollTo({ top: homeRef.value.scrollHeight, behavior: 'smooth' });
  }, 100);
};
</script>
