<template>
  <section class="sigin">
    <div class="box">
      <b-field label="Email">
        <b-input placeholder="Email" v-model="email" type="email" icon="email">
        </b-input>
      </b-field>

      <b-field label="Password">
        <b-input type="password" v-model="password" password-reveal> </b-input>
      </b-field>

      <b-button type="is-info" @click="login">Sign In</b-button>
    </div>
  </section>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "SignIn",
  data() {
    return {
      email: "",
      password: "",
    };
  },

  methods: {
    ...mapActions(["signIn"]),
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
