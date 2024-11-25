<template>
  <div class="main-content">
    <RouterView />
  </div>
</template>

<script setup>
import { RouterView, useRouter } from "vue-router";
import { ref, computed } from "vue";

const router = useRouter();
const user = ref(null);
</script>
