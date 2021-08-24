import firebase from "firebase/app";

const state = {
  user: {},
  error: null,
  loading: false,
  isLoggedIn: false,
};

const mutations = {
  SET_USER(state, user) {
    state.user = user;
    state.isLoggedIn = true;
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
  user: (state) => state.user,
  isLoggedIn: (state) => state.isLoggedIn,
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
        displayName: user.displayName || "",
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

  async signOut() {
    await firebase.auth().signOut();
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
