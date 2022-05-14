import Api from "../../api/Api";

const campaign = {
  namespaced: true,

  state: {
    campaigns: [],

    nextExists: false,
    nextPage: 0,

    campaign: [],
    user: [],
    sumDonation: [],
    donations: [],
  },

  mutations: {
    SET_CAMPAIGNS(state, campaigns) {
      state.campaigns = campaigns;
    },

    SET_NEXTEXISTS(state, nextExists) {
      state.nextExists = nextExists;
    },

    SET_NEXTPAGE(state, nextPage) {
      state.nextPage = nextPage;
    },

    SET_LOADMORE(state, data) {
      data.forEach(row => {
        state.campaigns.push(row);
      });
    },

    DETAIL_CAMPAIGN(state, data) {
      state.campaign = data;
    },

    DETAIL_USER(state, data) {
      state.user = data;
    },

    DETAIL_SUMDONATION(state, data) {
      state.sumDonation = data;
    },

    SET_DONATION(state, data) {
      state.donations = data;
    }
  },

  actions: {
    getCampaigns({ commit }) {
      Api.get("/campaign")
      .then(response => {
        // console.log(response);
        commit("SET_CAMPAIGNS", response.data.data.data);

        if (response.data.data.current_page < response.data.data.last_page) { 
          commit("SET_NEXTEXISTS", true);
          commit("SET_NEXTPAGE", response.data.data.current_page + 1);
        } else {
          commit('SET_NEXTEXISTS', false)
        }
      })
      .catch(error => {
        console.log(error);
      });
    },

    getLoadMore({commit}, nextPage) {
      Api.get("/campaign?page=" + nextPage)
      .then(response => {
        commit('SET_LOADMORE', response.data.data.data);

        if (response.data.data.current_page < response.data.data.last_page) {
          commit('SET_NEXTEXISTS', true);
          commit('SET_NEXTPAGE', response.data.data.current_page + 1);
        } else {
          commit('SET_NEXTEXISTS', false)
        }
      })
      .catch(error => {
        console.log(error);
      })
    },

    getDetailCampaign({ commit }, slug) {
      Api.get(`/campaign/${slug}`)
      .then(response => {
        commit("DETAIL_CAMPAIGN", response.data.data);
        commit("DETAIL_USER", response.data.data.user);
        commit("DETAIL_SUMDONATION", response.data.data.sum_donation);
        commit("SET_DONATION", response.data.donations);
      })
      .catch(error => {
        console.log(error);
      });
    },

    searchCampaign({ commit }, keyword) {
      const token = localStorage.getItem("token");

      Api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      Api.get(`/campaign?q=${keyword}`)
      .then(response => {
        commit('SET_CAMPAIGNS', response.data.data.data)
      })
      .catch(error => {
        console.log(error);
      })
    }
  },

  getters: {

  }
};

export default campaign;