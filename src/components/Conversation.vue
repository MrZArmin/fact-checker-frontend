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
const emit = defineEmits(['send']);

const conv = ref([
  { text: "Hello, how are you?" },
  { text: "I'm good, thanks! How about you?", type: "ai" },
  { text: "I'm doing well, just working on some code." },
  { text: "Nice! What are you working on?", type: "ai" },
  { text: "I'm building a chat application." },
  { text: "That sounds interesting!" },
  { text: "Yeah, it's a fun project.", type: "ai" },
  { text: "Do you need any help?" },
  { text: "Not right now, but thanks for offering." },
  { text: "No problem! Let me know if you do." },
  { text: "Will do! Thanks again." },
  { text: "You're welcome!" }
]);

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
  conv.value.push({ text, type: 'user' });
  emit('send', text);
};

</script>
