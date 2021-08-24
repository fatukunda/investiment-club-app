import Vue from "vue";
import firebase from "firebase";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Buefy from "buefy";
import "buefy/dist/buefy.css";

Vue.config.productionTip = false;
Vue.use(Buefy);

// Your web app's Firebase configuration
const {
  VUE_APP_APIKEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
} = process.env;
var firebaseConfig = {
  apiKey: VUE_APP_APIKEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.auth().onAuthStateChanged((user) => {
  const payload = {
    displayName: user.displayName || "",
    email: user.email,
    isVerified: user.emailVerified,
  };
  store.commit("auth/SET_USER", payload);
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
