import firebase from "firebase/app";
import router from "../router";

const state = {
  user: {},
  error: null,
  loading: false,
  isLoggedIn: false,
};

const mutations = {
  SET_USER(state, user) {
    state.user = user;
  },

  SET_LOGGED_IN(state, isLoggedIn) {
    state.isLoggedIn = isLoggedIn;
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
    const { email, password, firstName, lastName } = data;
    context.commit("SET_LOADING", true);
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      const user = firebase.auth().currentUser;
      user.updateProfile({ displayName: `${firstName} ${lastName}` });
      console.log(user);
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
      context.commit("SET_LOGGED_IN", true);
      context.commit("SET_LOADING", false);
    } catch (error) {
      context.commit("SET_ERROR", error.message);
      context.commit("SET_LOADING", false);
    }
  },

  async signOut(context) {
    console.log("Signing out....");
    await firebase.auth().signOut();
    context.commit("SET_USER", {});
    context.commit("SET_LOGGED_IN", false);
    router.push("/signout");
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
