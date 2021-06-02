export default {
  namespaced: true,
  state: {
    currentLayout: [],
    maximize: false,
    displaySize: {
      width: "",
      height: "",
    },
  },
  getters: {
    currentLayout: (state) => state.currentLayout,
    displaySize: (state) => state.displaySize,
    controllerSize: (state) => state.controllerSize,
    maximize: (state) => state.maximize,
  },
  mutations: {
    SET_LAYOUT(state, payload) {
      state.currentLayout = payload;
    },
    SET_DISPLAYSIZE(state, payload) {
      state.displaySize = payload;
    },
    SET_CONTROLLERSIZE(state, payload) {
      state.controllerSize = payload;
    },
    SET_MAXIMIZE(state, payload) {
      state.maximize = payload;
    },
  },
  actions: {
    ActionSetLayout({ commit }, payload) {
      commit("SET_LAYOUT", payload);
    },
    ActionSetDisplaySize({ commit }, payload) {
      commit("SET_DISPLAYSIZE", payload);
    },
    ActionSetControllerSize({ commit }, payload) {
      commit("SET_CONTROLLERSIZE", payload);
    },
    ActionSetMaximize({ commit }, payload) {
      commit("SET_MAXIMIZE", payload);
    },
  },
};
