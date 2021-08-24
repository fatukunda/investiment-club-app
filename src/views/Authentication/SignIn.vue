<template>
  <section class="sigin">
    <div class="box">
      <b-field label="Email">
        <b-input placeholder="Email" v-model="email" type="email" icon="email">
        </b-input>
      </b-field>

      <b-field label="Password">
        <b-input
          placeholder="Password"
          type="password"
          v-model="password"
          password-reveal
          icon="lock"
        >
        </b-input>
      </b-field>

      <b-message type="is-danger" v-if="error" size="is-small">
        {{ error }}
      </b-message>

      <b-button type="is-info" :loading="isLoading" @click="login"
        >Sign In</b-button
      >
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "SignIn",
  data() {
    return {
      email: "",
      password: "",
    };
  },

  computed: {
    ...mapGetters("auth", ["error", "isLoading"]),
  },

  methods: {
    ...mapActions("auth", ["signIn"]),
    login() {
      const user = {
        email: this.email,
        password: this.password,
      };
      this.signIn(user);
    },
  },
};
</script>

<style scoped>
.sigin {
  width: 500px;
  margin: 0 auto;
  margin-top: 40px;
}
</style>
