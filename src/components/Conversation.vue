<template>
  <div class="conversation">
    <div class="conversation-wrapper">
      <ol>
        <li v-for="(value, index) in conv" :key="index" :class="index % 2 === 1 ? 'ai-text' : 'user-text'">
          {{ value }}
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
  initial: String
});

watch(() => props.loading, (newVal) => {
  console.log(newVal)
});

const handleSend = (text) => {
  conv.value.push(text);
  const dummyAiMessage = "ayo niqa";
  conv.value.push(dummyAiMessage)
};

</script>
