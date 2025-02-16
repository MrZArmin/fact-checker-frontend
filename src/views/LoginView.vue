<template>
  <div class="auth-page login">
    <div class="auth-container">
      <div class="auth-content">
        <h2>Lépj be</h2>
        <div class="auth-form">
          <input
            v-model="username"
            class="auth-form-input"
            type="text"
            placeholder="Felhasználónév"
            @keydown.enter="submit()"
          />
          <input
            v-model="password"
            class="auth-form-input"
            type="password"
            placeholder="Password"
            @keydown.enter="submit()"
          />
          <button
            class="auth-form-button"
            :disabled="isLoading"
            @click="submit()"
          >
            <i v-if="isLoading" class="icon loader white"></i>
            <span v-else>Belépés</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import { ref } from 'vue';
import { toast } from 'vue3-toastify';

import { apiService } from '@/composables/useApiService';
import { useUserStore } from '@/stores/user';

const username = ref('');
const password = ref('');
const isLoading = ref(false);

const submit = async () => {
  if (!validate()) {
    return;
  }

  try {
    isLoading.value = true;
    const resp = await apiService.auth.login(username.value, password.value);

    if (resp.code === 200) {
      const userStore = useUserStore();
      userStore.login(resp.payload);
      await userStore.fetchMe(true);
      window.location = '/';
    }
    else {
      toast.error('Sikertelen bejelentkezés, hibás adatok!');
    }
  }
  catch (error) {
    console.error('Login error:', error);
    toast.error('Hiba történt a bejelentkezés során.');
  }
  finally {
    isLoading.value = false;
  }
};

const validate = () => {
  if (!username.value) {
    toast.error('Felhasználónév megadása kötelező.');
    return false;
  }

  if (!password.value) {
    toast.error('Jelszó megadása kötelező.');
    return false;
  }

  return true;
};
</script>
