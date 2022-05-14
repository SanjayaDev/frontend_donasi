import API from "../../api/Api";

const donation = {
  namespaced: true,

  state: {
    donations: [],
    nextExists: false,
    nextPage: 0,
  },

  mutations: {
    SET_DONATIONS(state, donations) {
      state.donations = donations;
    },

    SET_NEXTEXISTS(state, nextExists) {
      state.nextExists = nextExists;
    },

    SET_NEXPAGE(state, nextPage) {
      state.nextPage = nextPage;
    },

    SET_LOADMORE(state, data) {
      data.forEach(row => {
        state.donations.push(row);
      })
    }
  },

  actions: {
    getDonations({commit}) {
      const token = localStorage.getItem("token");
      
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      API.get("/donation")
      .then(response => {
          commit("SET_DONATIONS", response.data.data.data);

          if (response.data.data.current_page < response.data.data.last_page) {
            commit("SET_NEXTEXISTS", true);
            commit("SET_NEXTPAGE", response.data.data.current_page + 1);
          } else {
            commit('SET_NEXTEXISTS', false);
          }
      })
      .catch(error => {
        console.log(error);
      });
    },

    getLoadMore({ commit }, nextPage) {
      const token = localStorage.getItem("token");
      
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      API.get("/donation?page=" + nextPage)
      .then(response => {
        commit("SET_LOADMORE", response.data.data.data);

        if (response.data.data.current_page < response.data.data.last_page) {
          commit("SET_NEXTEXISTS", true);
          commit("SET_NEXTPAGE", response.data.data.current_page + 1);
        } else {
          commit('SET_NEXTEXISTS', false);
        }
      });
    },

    storeDonation({commit}, data) {
      return new Promise((resolve, reject) => {
        const token = localStorage.getItem("token");

          API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

          API.post("/donation", data)
          .then(response => {
            commit('');
            resolve(response);
          })
          .catch(error => {
            reject(error.response.data);
          });
      });
    }
  },

  getters: {

  }
};

export default donation;