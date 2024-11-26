<template>
  <div class="conversation">
    <div class="conversation-wrapper">
      <ol>
        <li
          v-for="(value, key) in conversation"
          :key="key"
          :class="parseInt(key) % 2 === 0 ? 'ai-text' : 'user-text'"
        >
          {{ value }}
        </li>
        <li><i class="icon loading white large ai-text" /></li>
      </ol>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  loading: Boolean,
  conversation: Object
});

</script>
