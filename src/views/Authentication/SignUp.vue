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

      <b-button type="is-info" @click="createAccount">Register</b-button>
    </div>
  </section>
</template>

<script>
import { mapActions } from "vuex";
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

  methods: {
    ...mapActions(["signup"]),
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
