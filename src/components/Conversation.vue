<template>
  <div class="conversation">
    <div class="conversation-wrapper">
      <ol>
        <li
          v-for="(value, index) in conv"
          :key="index"
          :class="index % 2 === 1 ? 'ai-text' : 'user-text'"
        >
          {{ value }}
        </li>
        <li v-if="loading"><i class="icon loading white large ai-text" /></li>
      </ol>
    </div>
    <Input/>
  </div>
</template>

<script setup>

import { ref, watch } from 'vue';
import Input from '@/components/Input.vue';
const conv = ref(['Who are you?', 'I am a fact checker AI', 'Who are you?', 'I am a fact checker AI', 'Who are you?', 'I am a fact checker AI', 'Who are you?', 'I am a fact checker AI', 'Who are you?', 'I am a fact checker AI', 'Who are you?', 'I am a fact checker AI', 'Who are you?', 'I am a fact checker AI', 'Who are you?', 'I am a fact checker AI', 'What can you do?']);

const props = defineProps({
  loading: Boolean,
  answer: String
});

watch(() => props.loading, (newVal) => {
  if (!newVal) {
    conv.value.push(props.answer)
  }
});

</script>
