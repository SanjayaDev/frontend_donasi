import API from '../../api/Api.js';

const profile = {
  namespaced: true,

  state: {
    profile: {}
  },

  mutations: {
    SET_PROFILE(state, profile) {
      state.profile = profile;
    }
  },

  actions: {
    getProfile({ commit }) {
      const token = localStorage.getItem('token');

      API.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      API.get("/profile")
      .then(response => {
        commit("SET_PROFILE", response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
    },

    updateProfile({commit}, formData) {
      return new Promise((resolve, reject) => {
        const token = localStorage.getItem("token");

        API.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        API.post("/profile", formData)
        .then(response => {
          commit("SET_PROFILE", response.data.data);
          resolve(response);
        })
        .catch(error => {
          reject(error.response.data);
        });
      });
    },

    updatePassword({ commit }, formData) {
      return new Promise((resolve, reject) => {
        const token = localStorage.getItem("token");

        API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        API.post("/profile/password", formData)
        .then(response => {
          commit("SET_PROFILE", response.data.data);
          resolve(response);
        })
        .catch(error => {
          reject(error.response.data);
        })
      });
    }
  },

  getters: {

  }
};

export default profile;