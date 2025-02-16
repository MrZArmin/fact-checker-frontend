import { useUserStore } from '@/stores/user';

const namespace = 'auth';

export default $request => ({
  signup({ hash, email, password, username }) {
    if (hash) {
      return $request
        .post(`${namespace}/invitation/${hash}`, { password, email, username })
        .then(resp => {
          const userStore = useUserStore();
          userStore.login(resp.payload);

          return resp;
        });
    }
  },

  login(username, password) {
    return $request
      .post('login/', {
        username,
        password,
      })
      .then(resp => {
        const userStore = useUserStore();
        userStore.login(resp.payload);

        return resp;
      });
  },

  logout() {
    return $request.post('logout/').then(() => {
      useUserStore().logout();
    });
  },

  requestforgottenPassword(email) {
    return $request.post(`${namespace}/forgotten-password`, { email });
  },

  forgottenPasswordValidation(email, password, token) {
    return $request.post(`${namespace}/forgotten-password/${token}`, {
      email,
      password,
    });
  },
});
