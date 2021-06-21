<template>
  <v-form ref="form" v-model="valid">
    <v-banner>Login</v-banner>
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Email"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="password"
            label="Password"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-btn @click="submit" elevation="2" outlined raised>Login in</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { auth } from "../plugins/firebase";

export default {
  data() {
    return {
      email: "",
      password: "",
      valid: true,
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+/.test(v) || "E-mail must be valid",
      ],
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        auth
          .signInWithEmailAndPassword(this.email, this.password)
          .then((res) => {
            console.log(res);
            this.$router.push({ name: "Dashboard" });
          })
          .catch((err) => {
            console.error(err);
            this.$router.replace({ name: "register" });
          });
      } else alert("invalid email");
    },
  },
};
</script>
