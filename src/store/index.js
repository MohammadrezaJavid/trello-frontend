import { createStore } from "vuex";

export default createStore({
  state: {
    wellcomeMassage: "Please Choose, what part of this page you want to see!",
    jwtToken: null
  },
  mutations: {
    setJwtToken(state, token) {
      state.jwtToken = token;
      localStorage.setItem("jwtToken", token);
    }
  },
  actions: {},
  getters: {
    getJwtToken(state) {
      return localStorage.getItem("jwtToken");
    }
  },
});