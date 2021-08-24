import firebase from "firebase";

const state = {
  user: {},
  error: null,
  loading: false,
};

const mutations = {
  SET_USER(state, user) {
    state.user = user;
  },

  SET_ERROR(state, error) {
    state.error = error;
  },

  SET_LOADING(state, isLoading) {
    state.loading = isLoading;
  },
};

const getters = {
  error: (state) => state.error,
  isLoading: (state) => state.loading,
};

const actions = {
  async signup(context, data) {
    const { email, password } = data;
    context.commit("SET_LOADING", true);
    try {
      const user = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      context.commit("SET_USER", user);
      context.commit("SET_LOADING", false);
    } catch (error) {
      context.commit("SET_ERROR", error.message);
      context.commit("SET_LOADING", false);
    }
  },

  async signIn(context, data) {
    const { email, password } = data;
    context.commit("SET_LOADING", true);
    try {
      const { user } = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      const payload = {
        displayName: user.displayName,
        email: user.email,
        isVerified: user.emailVerified,
      };
      context.commit("SET_USER", payload);
      context.commit("SET_LOADING", false);
    } catch (error) {
      context.commit("SET_ERROR", error.message);
      context.commit("SET_LOADING", false);
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
