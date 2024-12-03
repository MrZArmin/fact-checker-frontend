<template>
  <div class="input">
    <div class="input-container">
      <textarea v-model="text" class="input-text" placeholder="Mit szeretnél megtudni?"></textarea>
      <div class="icon-container">
        <i @click="handleSend" class="icon send white large" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['send']);
const text = ref('');

const handleSend = () => {
  if (text.value.trim().length > 0) {
    emit('send', text.value);
    text.value = '';
  } else {
    alert('Textarea is empty. Please enter text.');
  }
};
</script>
