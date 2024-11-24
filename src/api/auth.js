import { useUserStore } from '@/stores/user';

const namespace = 'auth';

export default ($request) => ({
  signup({ hash, email, password, username }) {
    if (hash) {
      return $request
        .post(`${namespace}/invitation/${hash}`, { password, email, username })
        .then((resp) => {
          const userStore = useUserStore();
          userStore.login(resp.payload);

          return resp;
        });
    }
  },

  login(email, password) {
    return $request
      .post(`${namespace}/login`, { 
        email, 
        password 
      })
      .then((resp) => {
        const userStore = useUserStore();
        userStore.login(resp.payload);

        return resp;
      });
  },

  logout() {
    return $request.post(`${namespace}/logout`).then(() => {
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

  createInvitation({
    firstname,
    lastname,
    email,
    level,
    visibleAdAccountIds,
    visibleSourceProfileIds,
  }) {
    const data = {
      firstname,
      lastname,
      email,
      level,
      visible_ad_account_ids: visibleAdAccountIds,
      visible_source_profile_ids: visibleSourceProfileIds,
    };
    return Api().post('/user-invitation', data);
  },

  deleteInvitation(id) {
    return Api().delete('/user-invitation/' + id);
  },

  resendInvitation(id) {
    return Api().post('/user-invitation/' + id + '/resend');
  },

  fetchInvitations() {
    return Api().get('/user-invitations');
  },
});
