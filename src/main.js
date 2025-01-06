import './assets/scss/styles.scss';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { markRaw } from 'vue';
import App from './App.vue';
import router from './router';
import Vue3Toasity from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import vSelect from 'vue-select';

// Import Vue Final Modal
import { createVfm } from 'vue-final-modal';
const vfm = createVfm();
import 'vue-final-modal/style.css';

// Create the Pinia instance first
const pinia = createPinia();

// Add router to Pinia state
pinia.use(({ store }) => {
  store.router = markRaw(router);
});

// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
  components,
  directives,
});

// Create the app
const app = createApp(App);

// V-select
app.component('v-select', vSelect);
import 'vue-select/dist/vue-select.css';

// Install plugins
app.use(pinia);
app.use(router);
app.use(Vue3Toasity, {
  autoClose: 6000,
  theme: 'dark',
});
app.use(vuetify);
app.use(vfm);

// Mount the app
app.mount('#app');

// Export pinia instance if needed elsewhere
export { pinia };
