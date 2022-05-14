import Api from "../../api/Api";

const auth = {
  namespaced: true,

  state: {
    token: localStorage.getItem("token") || "",
    user: JSON.parse(localStorage.getItem("user")) || {}
  },

  mutations: {
    AUTH_SUCCESS() {
      // state.token = token
      // state.user = user
    },

    GET_USER(state, user) {
      state.user = user;
    },

    AUTH_LOGOUT(state) {
      state.token = "";
      state.user = {};
    },

    AUTH_RESET_PASSWORD() {

    }
  },

  actions: {
    register({ commit }, formData) {
      return new Promise((resolve, reject) => {
        Api.post("/register", formData).then(response => {
          const token = response.data.token;
          const user = response.data.data;

          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));

          Api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

          commit('AUTH_SUCCESS');

          resolve(response);
        }).catch(error => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          if (error.response) {
            reject(error.response.data);
          } else {
            reject({
              status_code: 500,
              message: "Server not refushed!"
            });
          }
        })
      });
    },

    getUser({commit}) {
      const token = localStorage.getItem("token");

      Api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      Api.get('/user')
      .then(response => {
          
          //commit ke mutatuin GET_USER dengan hasil response
          commit('GET_USER', response.data)

      })
    },

    logout({ commit }) {
      return new Promise((resolve) => {
        commit("AUTH_LOGOUT");

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        delete Api.defaults.headers.common["Authorization"];

        resolve();
      })
    },

    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        Api.post("/login", {
          email: user.email,
          password: user.password,
        }).then(response => {
          const token = response.data.token;
          const user = response.data.data;

          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));

          Api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

          commit("AUTH_SUCCESS");

          resolve(response);
        }).catch(error => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          
          if (error.response) {
            reject(error.response.data);
          } else {
            reject({
              status_code: 500,
              message: "Server not refushed!"
            });
          }
        });
      })
    },

    resetPasswordWithoutLogin({commit}, formReset) {
      return new Promise((resolve, reject) => {
        Api.post("/forgot-password", formReset)
        .then(response => {
          commit("AUTH_RESET_PASSWORD");
          resolve(response);
        })
        .catch(error => {
          reject(error.response.data);
        });
      });
    }
  },

  getters: {
    currentUser(state) {
      return state.user;
    },

    isLoggedIn() {
      // return state.token;
      return localStorage.getItem("token") || false;
    }
  }
};

export default auth;