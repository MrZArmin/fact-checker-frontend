<template>
  <div ref="conversation" class="conversation">
    <div v-if="messages.length" class="conversation-wrapper">
      <ol>
        <li
          v-for="(message, index) in messages"
          :key="index"
          :class="[
            message.sender === 'ai' ? 'ai-text' : 'user-text',
            'message-item',
            message.isErrorMessage ? 'error-message' : '',
          ]"
        >
          <div class="message-container">
            <i v-if="message.sender === 'ai'" class="icon logo white"></i>
            <div class="conversation-text">
              {{ message.message }}
            </div>
          </div>
          <div
            v-if="message.articles && message.articles.length"
            class="article-modal-opener"
            @click="openArticleModal(message.articles)"
          >
            Kontextusnak használt cikkek
          </div>
        </li>
        <li v-if="loading" class="ai-text loading-message">
          <i class="icon logo white"></i>
          <i class="icon loading white large" />
        </li>
      </ol>
    </div>
    <i v-else class="icon loader white"></i>
    <Input
      :disabled="loading"
      :placeholder="inputPlaceholder"
      @send="handleSend"
    />
    <article-modal
      v-model:isModalOpen="isArticleModalOpen"
      :articles="selectedArticles"
      @close="isArticleModalOpen = false"
    />
  </div>
</template>

<script setup>
import { nextTick, onMounted, ref, watch } from 'vue';

import ArticleModal from '@/components/ArticleModal.vue';
import Input from '@/components/InputComponent.vue';

const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  messages: {
    type: Array,
    default: () => [],
  },
  error: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits([ 'send' ]);
const conversation = ref(null);
const inputPlaceholder = ref('Type your message...');
const isArticleModalOpen = ref(false);
const selectedArticles = ref([]);

watch(
  () => props.messages,
  (newMessages, oldMessages) => {
    if (newMessages?.length > (oldMessages?.length || 0)) {
      scrollToBottom();
    }
  },
  { deep: true },
);

watch(
  () => props.loading,
  isLoading => {
    inputPlaceholder.value = isLoading
      ? 'Please wait...'
      : 'Type your message...';
    if (!isLoading) {
      scrollToBottom();
    }
  },
);

onMounted(() => {
  scrollToBottom();
});

const handleSend = text => {
  if (text.trim() && !props.loading) {
    emit('send', text);
  }
};

const scrollToBottom = () => {
  nextTick(() => {
    if (conversation.value) {
      const element = conversation.value;
      element.scrollTop = element.scrollHeight;
    }
  });
};

const openArticleModal = articles => {
  selectedArticles.value = articles.sort((a, b) => b.similarity_score - a.similarity_score);
  isArticleModalOpen.value = true;
};
</script>
