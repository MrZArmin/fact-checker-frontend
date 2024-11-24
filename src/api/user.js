const namespace = 'user'

export default ($request) => ({

  me() {
    return $request.get(`${namespace}/me`)
  },

  getUsers() {
    return $request.get(`${namespace}s`);
  },

  postUser(data) {
    return $request.post(`${namespace}`, data);
  },

  updateUser(data, id) {
    return $request.put(`${namespace}/${id}`, data);
  },

  deleteUser(id) {
    return $request.delete(`${namespace}/${id}`);
  },

})

