import Vue from "vue";
import Vuex from "vuex";
import match from "@/store/modules/match.module";

Vue.use(Vuex);
const store = new Vuex.Store({
  modules: {
    match,
  },
});

export default store;
