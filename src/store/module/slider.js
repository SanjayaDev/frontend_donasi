import Api from "../../api/Api";

const slider = {
  namespaced: true,

  state: {
    sliders: [],
  },

  mutations: {
    SET_SLIDERS(state, sliders) {
      state.sliders = sliders;
    }
  },

  actions: {
    getSlider({ commit }) {
      Api.get("/slider")
      .then(response => {
        commit("SET_SLIDERS", response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
    }
  },

  getters: {

  }
};

export default slider;