<template>
  <div class="main-content">
    <div class="stars"></div>
    <div class="stars2"></div>
    <div class="stars3"></div>
    <RouterView />
  </div>
</template>

<script setup>
import { RouterView, useRouter } from "vue-router";
import { ref, computed } from "vue";

const router = useRouter();
const user = ref(null);
</script>
