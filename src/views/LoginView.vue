<template>
  <div class="auth-page login">
    <div class="auth-container">
      <div class="auth-content">
        <h2>Lépj be</h2>
        <div class="auth-form">
          <input v-model="email" class="auth-form-input" type="text" placeholder="Email" />
          <input v-model="password" class="auth-form-input" type="password" placeholder="Password" />
          <button class="auth-form-button" @click="submit()">
            <i class="icon loader" v-if="loading"></i>
            <span v-else>Belépés</span>
          </button>
          <router-link to="/auth/register" class="auth-form-link">Elfelejtett jelszó</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { apiService } from '@/composables/useApiService'
import { useUserStore } from '@/stores/user';
import { isValidEmail } from '@/utils/validators';
import { toast } from 'vue3-toastify';

const loading = ref(false);
const email = ref('');
const password = ref('');
const isLoading = ref(false);


const submit = () => {
  if (!validate()) {
    return;
  }

  isLoading.value = true;

  apiService.auth
    .login(email.value, password.value)
    .then((resp) => {
      if (resp.code == 422) {
        toast.error('Sikertelen bejelentkezés, hibás adatok!');
        return;
      } else if (resp.code == 401) {
        toast.error('Sikertelen bejelentkezés, hibás adatok!');
        return;
      }

      const userStore = useUserStore();
      userStore.fetchMe(true).then(() => {
        // Redirect must be done this way to bypass VUE ROUTER's
        // "history API" only change and to forces website to make
        // new page request.
        window.location = '/';
      });
    })
    .finally(() => (isLoading.value = false));
};

const validate = () => {
  if (!email.value) {
    toast.error('Email cím megadása kötelező.');
    return false;
  } else if (!isValidEmail(email.value)) {
    toast.error('Hibás email cím formátum.');
    return false;
  }

  if (!password.value) {
    toast.error('Jelszó megadása kötelező.');
    return false;
  }

  return true;
};
</script>
