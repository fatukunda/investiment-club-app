<template>
  <section class="signup">
    <div class="box">
      <b-field label="First Name">
        <b-input
          placeholder="Please enter your First Name"
          v-model="firstName"
          type="text"
        >
        </b-input>
      </b-field>

      <b-field label="Last Name">
        <b-input
          placeholder="Last Name"
          v-model="lastName"
          type="text"
          icon="account"
        >
        </b-input>
      </b-field>

      <b-field label="Email">
        <b-input placeholder="Email" v-model="email" type="email" icon="email">
        </b-input>
      </b-field>
      <b-field label="Password">
        <b-input type="password" v-model="password" password-reveal> </b-input>
      </b-field>
      <b-message type="is-danger" v-if="error" size="is-small">
        {{ error }}
      </b-message>
      <b-button type="is-info" :loading="isLoading" @click="createAccount"
        >Register</b-button
      >
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "SignUp",
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    };
  },

  computed: {
    ...mapGetters("auth", ["error", "isLoading"]),
  },

  methods: {
    ...mapActions("auth", ["signup"]),
    createAccount() {
      const user = {
        email: this.email,
        password: this.password,
      };
      this.signup(user);
    },
  },
};
</script>

<style scoped>
.signup {
  width: 500px;
  margin: 0 auto;
  margin-top: 40px;
}
</style>
