<template>
  <b-navbar>
    <template #brand>
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <h3>INVESTOR</h3>
      </b-navbar-item>
    </template>
    <template #start>
      <b-navbar-item href="#"> Home </b-navbar-item>
      <b-navbar-item href="#"> Investiment clubs </b-navbar-item>
      <b-navbar-dropdown label="Info">
        <b-navbar-item href="#"> About </b-navbar-item>
        <b-navbar-item href="#"> Contact </b-navbar-item>
      </b-navbar-dropdown>
    </template>

    <template #end>
      <b-navbar-item tag="div">
        <div class="buttons">
          <router-link
            v-if="!isLoggedIn"
            to="/signup"
            class="button is-primary"
          >
            <strong>Sign Up</strong>
          </router-link>
          <a v-if="isLoggedIn" class="button is-light" @click="signOut">
            Log out
          </a>
          <router-link to="signin" v-else class="button is-light">
            Sign In
          </router-link>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Navbar",
  computed: {
    ...mapGetters("auth", ["isLoggedIn", "user"]),
  },

  methods: {
    ...mapActions("auth", ["signOut"]),
  },
};
</script>
