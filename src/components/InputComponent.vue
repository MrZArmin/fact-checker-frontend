<template>
  <div class="input">
    <div class="input-container">
      <textarea
        ref="textarea"
        v-model="text"
        class="input-text"
        :placeholder=placeholderText
        @keydown="handleKeydown"
      >
      </textarea>
      <i class="icon send white large" :class="{ disabled: !text.trim() }" @click="handleSend" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits([ 'send' ]);
const text = ref('');
const textarea = ref(null);
const placeholderText = 'Mit szeretnél megtudni?';

const handleSend = () => {
  if (text.value.trim().length > 0) {
    emit('send', text.value);
    text.value = '';
  }
};

const handleKeydown = e => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    handleSend();
  }
};
</script>
