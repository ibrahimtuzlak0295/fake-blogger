import UsersService from '@/services/UsersService';

// initial state
const state = {
  data: [],
  isLoggedIn: false,
  isLoggingIn: false,
  isLoggingOut: false,
  role: null,
};

// getters
const getters = {
  getCurrentUser: (state) => state.data,
  getIsLoggedIn: (state) => state.isLoggedIn,
  getRole: (state) => state.data.role ?? null,
  getIsAdmin: (state) => state.role === 'admin',
};

// actions
const actions = {
  async login({ commit }, { username, password }) {
    commit('SET_IS_LOGGING_IN', true);

    return await UsersService.login({ username, password })
      .then((res) => {
        commit('SET_USER_DATA', res);
        commit('SET_ROLE', res.role);
        commit('SET_IS_LOGGED_IN', true);
      })
      .finally(() => commit('SET_IS_LOGGING_IN', false));
  },

  async logout({ commit }) {
    commit('SET_IS_LOGGING_OUT', true);

    await UsersService.logout('some-token')
      .then(() => commit('RESET_STATE'))
      .finally(() => commit('SET_IS_LOGGING_OUT', false));
  },
};

// mutations
const mutations = {
  SET_USER_DATA(state, data) {
    state.data = data;
  },

  SET_IS_LOGGING_IN(state, value) {
    state.isLoggingIn = value;
  },

  SET_IS_LOGGING_OUT(state, value) {
    state.isLoggingOut = value;
  },

  SET_IS_LOGGED_IN(state, value) {
    state.isLoggedIn = value;
  },

  SET_ROLE(state, value) {
    state.role = value;
  },

  RESET_STATE(state) {
    state.data = [];
    state.isLoggedIn = false;
    state.isLoggingIn = false;
    state.isLoggingOut = false;
    state.role = null;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
