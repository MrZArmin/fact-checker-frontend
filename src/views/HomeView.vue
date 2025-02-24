<template>
  <div class="home" :class="{ 'sidebar-open': isSidebarOpen }">
    <i v-if="!isSidebarOpen" @click="toggleSidebar" class="icon hamburger large white"></i>
    <i v-else @click="toggleSidebar" class="icon close large white"></i>

    <Sidebar
      :class="{ open: isSidebarOpen }"
      :items="sessions"
      @add-new-conversation="handleAddNewConversation"
      @open-conversation="handleOpenConversation"
      @delete-conversation="handleDeleteConversation"
    />

    <template v-if="!isEmpty">
      <Conversation
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
import { ref, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { apiService } from '@/composables/useApiService';
import { useChatStore } from '@/stores/chat';
import Session from '@/entities/Session.js';
import Sidebar from '@/components/SidebarComponent.vue';
import Conversation from '@/components/ConversationComponent.vue';
import Input from '@/components/InputComponent.vue';
import Message from '../entities/Message';
import { toast } from 'vue3-toastify';

// Composables
const route = useRoute();
const router = useRouter();
const chatStore = useChatStore();

// Refs
const isLoading = ref(false);
const isEmpty = ref(true);
const isSidebarOpen = ref(false);
const currentSession = ref(chatStore.getCurrentSession);
const isLoadingConversation = ref(false);
const sendReturnedError = ref(false);

// Computed
const sessions = computed(() => chatStore.getSessions);
const currentMessages = computed(() =>
  currentSession.value ? currentSession.value.messages : []
);

// Watchers
watch(
  () => route.params.id,
  async (newId) => {
    if (newId && !isLoadingConversation.value) {
      isLoadingConversation.value = true;
      chatStore.setCurrenSessionFromId(newId);
      currentSession.value = chatStore.getCurrentSession;
      await loadConversation();
      isLoadingConversation.value = false;
    }
  }
);

watch(
  () => chatStore.getCurrentSession,
  async (newSession) => {
    if (route.params.id && newSession && !isLoadingConversation.value) {
      isLoadingConversation.value = true;
      currentSession.value = newSession;
      await loadConversation();
      isLoadingConversation.value = false;
    }
  }
);

// Methods
const loadConversation = async () => {
  if (currentSession.value.messages.length > 0) {
    isEmpty.value = false;
    return
  }

  try {
    const { payload } = await apiService.chat.getMessages(
      currentSession.value.id
    );
    isEmpty.value = false;
    currentSession.value.setMessages(payload.messages);
  } catch (error) {
    console.error('Error loading conversation:', error);
    router.push('/new');
  }
};

const handleAddNewConversation = async () => {
  chatStore.setDefault();
  currentSession.value = null;
  isEmpty.value = true;
  toggleSidebar();
};

const handleOpenConversation = (id) => {
  router.push(`/${id}`);
  toggleSidebar();
};

const handleDeleteConversation = async (id) => {
  try {
    await apiService.chat.deleteSession(id);
    chatStore.removeSession(id);
    if (currentSession.value.id === id) {
      router.push('/new');
      chatStore.setDefault();
      currentSession.value = null;
      isEmpty.value = true;
    }
  } catch (error) {
    console.error('Error deleting conversation:', error);
    toast.error('Hiba történt törlés közben');
  }
};

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const handleSend = async (prompt) => {
  isEmpty.value = false;
  isLoading.value = true;
  scrollToBottom();

  try {
    if (!currentSession.value) {
      const session  = new Session(await apiService.chat.startSession(prompt));
      chatStore.addSession(session);
      chatStore.setCurrenSessionFromId(session.id);
      currentSession.value = chatStore.getCurrentSession;
      router.push(`/${session.id}`);
    }

    currentSession.value.addMessage(
      new Message({ sender: 'user', message: prompt })
    );

    const response = await apiService.chat.sendMessage(
      currentSession.value.id,
      prompt
    );

    if (response.error) {
      sendReturnedError.value = true;
      return;
    }

    currentSession.value.updated_at = response.session.updated_at;

    if (!response) {
      toast.error('Hiba a válasz generálása közben');
    }

  } catch (error) {
    console.error('Error sending message:', error);
  } finally {
    isLoading.value = false;
  }
};

const scrollToBottom = () => {
  setTimeout(() => {
    const container = document.querySelector('.conversation');
    if (container) {
      const scrollHeight = container.scrollHeight;
      container.scrollTo({
        top: scrollHeight,
        behavior: 'smooth'
      });
    }
  }, 500);
};
</script>