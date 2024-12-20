import { defineStore } from 'pinia';
import { useCookies } from '@vueuse/integrations/useCookies';
import { apiService } from '@/composables/useApiService';

export const COOKIE_BEARER_TOKEN_KEY = 'zrinszki_token';

export const useUserStore = defineStore('user', {
  state: () => ({
    account: null,
    token: null,
    token_type: null,
    expires_in: null,
    userFetched: false,
    users: [],
    deletedUsers: [],
  }),

  getters: {
    theAccount: (state) => state.account,
    theToken: (state) => {
      const cookies = useCookies()
      const token = cookies.get(COOKIE_BEARER_TOKEN_KEY)
      // Return raw token without 'Bearer ' prefix
      return token ? token.replace('Bearer ', '') : state.token
    },
    isUserFetched: (state) => state.userFetched,
    isAnonymous: (state) => !state.token || !state.account,
    isLoggedIn: () => {
      // Move cookie initialization inside the getter
      const cookies = useCookies();
      const token = cookies.get(COOKIE_BEARER_TOKEN_KEY);
      return typeof token === 'string' && token.length > 0;
    },
    isAdmin: (state) => 
      state.account?.user_type?.machine_name === 'admin' || 
      state.account?.user_type?.machine_name === 'owner',
    getUsers: (state) => state.users,
    getDeletedUsers: (state) => state.deletedUsers,
  },

  actions: {
    init(forced = false) {
      const hasAccountSet = this.account?.id?.length > 0;

      if (!forced && hasAccountSet) {
        return;
      }

      try {
        const storedData = {
          account: JSON.parse(localStorage.getItem('account') || 'null'),
          token: localStorage.getItem('token'),
          token_type: localStorage.getItem('token_type'),
          expires_in: parseInt(localStorage.getItem('token_expires_in') || '0', 10),
          token_created: parseInt(localStorage.getItem('token_created') || '0', 10)
        };

        if (this.isTokenExpired(storedData.token_created, storedData.expires_in)) {
          this.clearStorageAndState();
          return;
        }

        Object.assign(this, storedData);
      } catch (e) {
        console.error('Error initializing user store:', e);
        this.logout();
        this.init();
      }
    },

    isTokenExpired(tokenCreated, expiresIn) {
      if (!tokenCreated || !expiresIn) return true;
      const expirationTime = tokenCreated + (expiresIn * 1000);
      return Date.now() > expirationTime;
    },

    clearStorageAndState() {
      const cookies = useCookies();
      cookies.remove(COOKIE_BEARER_TOKEN_KEY, { path: '/' });
      
      localStorage.removeItem('account');
      localStorage.removeItem('token');
      localStorage.removeItem('token_type');
      localStorage.removeItem('token_expires_in');
      localStorage.removeItem('token_created');

      this.account = null;
      this.token = null;
      this.token_type = null;
      this.expires_in = null;
    },

    async fetchMe(forced = false) {
      if (this.userFetched && !forced) {
        return true;
      }

      const cookies = useCookies();
      const token = cookies.get(COOKIE_BEARER_TOKEN_KEY);
      if (token?.length > 0) {
        this.token = token;
      }

      try {
        const resp = await apiService.user.me();
        if (resp?.code === 200) {
          this.userFetched = true;
          this.account = resp.payload;
        }
        return resp;
      } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
      }
    },

    // ... rest of your actions

    login(data) {
      const { user, access_token, token_type, expires_in } = data;
      const cookies = useCookies();
      
      // Update state
      Object.assign(this, {
        account: user,
        token: access_token,
        token_type,
        expires_in
      });

      // Update localStorage
      localStorage.setItem('account', JSON.stringify(user));
      localStorage.setItem('token', access_token);
      localStorage.setItem('token_type', token_type);
      localStorage.setItem('token_expires_in', expires_in);
      localStorage.setItem('token_created', Date.now().toString());

      // Set cookie
      cookies.set(COOKIE_BEARER_TOKEN_KEY, access_token, { 
        path: '/', 
        secure: true,
        maxAge: expires_in 
      });
    },

    logout() {
      const cookies = useCookies();
      cookies.remove(COOKIE_BEARER_TOKEN_KEY, { path: '/' });
      this.clearStorageAndState();
    },
  }
});

export default useUserStore;