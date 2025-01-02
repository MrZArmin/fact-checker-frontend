<template>
  <div class="input">
    <div class="input-container">
      <textarea v-model="text" class="input-text" :placeholder=placeholderText
        @keydown="handleKeydown"
        @input="autoResize"
        ref="textarea">
      </textarea>
      <div class="icon-container">
        <i @click="handleSend" class="icon send white large" :class="{ disabled: !text.trim() }"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['send']);
const text = ref('');
const textarea = ref(null);
const placeholderText = "Mit szeretnél megtudni?";

const handleSend = () => {
  if (text.value.trim().length > 0) {
    emit('send', text.value);
    text.value = '';
    resizeTextAreaToDefault();
  }
};

const handleKeydown = (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    handleSend();
  }
};

const autoResize = () => {
  const el = textarea.value;
  if(el.value){
    el.style.height = 'auto';
    el.style.height = el.scrollHeight + 'px';
    el.style.overflow = "auto";
  } else{
    resizeTextAreaToDefault();
  }
};

const resizeTextAreaToDefault = () => {
  const el = textarea.value;
  el.style.height = "30px";
  el.style.overflow = "hidden";
};
//TODO classokkal megcsinálni, vagy jó így?

//Ez consolera hibát dobál, help!!!
// onMounted(() => {
//   textarea.value.focus();
//   document.addEventListener("keydown", () => {
//     textarea.value.focus();
//   })
// });
</script>
