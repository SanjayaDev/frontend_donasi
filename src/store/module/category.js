import Api from "../../api/Api";

const category = {
  namespaced: true,

  state: {
    categories: [],
    category: [],
    campaignCategory: [],
  },

  mutations: {
    SET_CATEGORIES(state, data) {
      state.categories = data;
    },

    DETAIL_CATEGORY(state, data) {
      state.category = data;
    },

    CAMPAIGN_CATEGORY(state, data) {
      state.campaignCategory = data;
    }
  },

  actions: {
    getCategoryHome({ commit }) {
      Api.get("/categoryHome")
      .then(response => {
        commit("SET_CATEGORIES", response.data.data);
      })
      .catch(error => {
        console.log(error);
      })
    },

    getCategory({ commit }) {
      Api.get("/category")
      .then(response => {
        commit("SET_CATEGORIES", response.data.data.data);
      })
      .catch(error => {
        console.log(error);
      });
    },

    getDetailCategory({ commit }, slug) {
      Api.get(`/category/${slug}`)
      .then(response => {
        commit("DETAIL_CATEGORY", response.data.data);
        commit("CAMPAIGN_CATEGORY", response.data.data.campaigns);
      })
      .catch(error => {
        console.log(error);
      });
    }
  },

  getters: {

  }
};

export default category;