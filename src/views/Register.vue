<template>
  <div>
    <v-card class="mx-auto mt-16" max-width="550" outlined>
       <v-breadcrumbs class="mb-6" :items="links">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
      <v-form class="ml-12 mr-12" ref="form" v-model="valid" lazy-validation>
        <h1 class="mt-4 mb-2">Inscription</h1>
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          append-icon="mdi-email"
          filled
          required
        ></v-text-field>

        <v-text-field
          v-model="password"
          type="password"
          :counter="20"
          :rules="passwordRules"
          label="Mot de passe"
          append-icon="mdi-lock"
          filled
          required
        ></v-text-field>

        <v-text-field
          v-model="password2"
          type="password"
          :counter="20"
          :rules="password2Rules"
          label="Confirmer le mot de passe"
          append-icon="mdi-lock"
          filled
          required
        ></v-text-field>

        
              <v-switch
                v-model="switch2"
                flat
                label="J'accepte les conditions d'utilisation et la politique de confidentialité de l'application."
              ></v-switch>
           

        <v-btn
          block
          :disabled="!valid"
          color="#2F0392"
          class="mr-4 white--text text-capitalize"
          @click="submit"
        >
          S'inscrire
        </v-btn>
        <br />
      </v-form>
    </v-card>

    <br />
  </div>
</template>

<script>
import firebase from "firebase";
//import { db } from "../main";

export default {
  data: () => ({
    error: null,
     switch2: false,
    name: "",
    links: [
      { text: "Accueil", to: "/" },
      { text: "Connexion", to: "/connexion" },
      { text: "Enregistrer", to: "/register" }
    ],
    valid: true,
    password: "",
    passwordRules: [
      v => !!v || "le mot de passe est obligatoire!",
      v =>
        (v && v.length <= 20 && v.length >= 6) ||
        "le mot de passe doit contenir au moins 6 caractères  et ne doit pas dépasser 20 caractères!"
    ],
    password2: "",
    password2Rules: [
      v => !!v || "veillez confirmé votre mot de passe",
      v =>
        (v && v.length <= 20 && v.length >= 6) ||
        "le mot de passe doit contenir au moins 6 caractères  et ne doit pas dépasser 20 caractères!"
    ],
    email: "",
    emailRules: [
      v => !!v || "E-mail est obligatoire!",
      v =>
        (/.+@.+\..+/.test(v) && v.length >= 10) ||
        "Veuillez renseigner un email valide!"
    ],
    newUser: {
      name: "",
      email: "",
      id: ""
    }
  }),

  methods: {
    validate() {
      this.$refs.form.validate();
    },

    reset() {
      this.$refs.form.reset();
    },

    resetValidation() {
      this.$refs.form.resetValidation();
    },

    submit() {
      if (this.password == this.password2) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then(data => {
            data.user
              .updateProfile({
                displayName: this.name
              })
              .then(() => {
                this.$router.replace({ name: "Register2" });
              });
          })
          .catch(err => {
            this.error = err.message;
          });
      } else {
        alert("les deux mots de passe ne sont pas identiques !");
      }
    }
  }
};
</script>