<template>
  <div class="conversation">
    <div class="conversation-wrapper">
      <ol>
        <li
          v-for="(message, index) in conv"
          :key="index"
          :class="message.type === 'ai' ? 'ai-text' : 'user-text'"
        >
          {{ message.text }}
        </li>
        <li v-if="loading"><i class="icon loading white large ai-text" /></li>
      </ol>
    </div>
    <Input @send="handleSend" />
  </div>
</template>

<script setup>

import { ref, watch } from 'vue';
import Input from '@/components/Input.vue';
const conv = ref([]);

const props = defineProps({
  loading: Boolean,
  conversation: Object
});

watch(
  () => props.conversation,
  (newMessage) => {
    if (newMessage && newMessage.text) {
      conv.value.push(newMessage);
    }
  },
  { deep: true, immediate: true }
);

const handleSend = (text) => {
  // conv.value.push(text);
  // const dummyAiMessage = "ayo niqa";
  // conv.value.push(dummyAiMessage)
};

</script>
