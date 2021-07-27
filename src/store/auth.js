import firebase from "firebase";

const state = {
  user: {},
  error: null,
};

const mutations = {
  SET_USER(state, user) {
    state.user = user;
  },

  SET_ERROR(state, error) {
    state.error = error;
  },
};

const actions = {
  async signup(context, data) {
    const { email, password } = data;
    try {
      const user = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      context.commit("SET_USER", user);
    } catch (error) {
      context.commit("SET_ERROR", error.message);
    }
  },

  async signIn(context, data) {
    const { email, password } = data;
    console.log(data);

    try {
      const { user } = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      const payload = {
        displayName: user.displayName,
        email: user.email,
        isVerified: user.emailVerified,
      };
      console.log(payload);
      context.commit("SET_USER", payload);
    } catch (error) {
      context.commit("SET_ERROR", error.message);
    }
  },
};

export default {
  state,
  mutations,
  actions,
};
