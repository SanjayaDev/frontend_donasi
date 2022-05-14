import { createStore } from "vuex";
import auth from "./module/auth";
import donation from "./module/donation";
import profile from "./module/profile";
import slider from "./module/slider";
import category from "./module/category";
import campaign from "./module/campaign";
// import { useRoute } from "vue-router";

export default createStore({

  modules: {
    auth,
    donation,
    profile,
    slider,
    category,
    campaign
  },

  // state: {
  //   router: "SZanjaya"
  // }

});