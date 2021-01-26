<template >
  <div>
    
    <v-card class="mx-auto mt-16" max-width="500" outlined>
      <v-breadcrumbs class="mx-auto mb-6" :items="links">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
     
      <v-form class="ml-12 mr-12" ref="form" v-model="valid" lazy-validation>
        <h1 class="mt-4 mb-4">Connexion</h1>
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

        <v-btn
          block
          type="submit"
          :disabled="!valid"
          color="#2F0392"
          mt-2 mb-6
          class="mr-4 mb-4 mt-6 white--text text-capitalize"
         
          @click="connect"
        >
           Se connecter
        </v-btn>
      
        <a Link class="mr-2" >Mot de passe oublié ?</a>

         <v-text-field
         hidden
          class="mt-2 mb-6"
        ></v-text-field>
       <h4 class="mb-8">Vous n'avez pas encore de compte ?
        <v-btn  
        text
        class="text-capitalize"
       color="#2F0392"
       link 
       to="/register">
        S'inscrire
        </v-btn>
       </h4>
        
      </v-form>
    </v-card>

    <br />
  </div>
</template>


<script>
import firebase from "firebase";
//import router from "../router";

export default {
  data: () => ({
    links: [
      { text: "Accueil", to: "/" },
      { text: "Connexion", to: "/connexion" }
    ],
    error: "",
    valid: true,
    password: "",
    passwordRules: [
      v => !!v || "le mot de passe est obligatoire!",
      v =>
        (v && v.length <= 20 && v.length >= 6) ||
        "le mot de passe doit contenir au moins 6 caractères  et ne doit pas dépasser 20 caractères!"
    ],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v =>
        (/.+@.+\..+/.test(v) && v.length >= 10) ||
        "Veuillez renseigner un email valide !"
    ]
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

    connect() {
      
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(data => {
          data.user
            .updateProfile({
              displayName: this.email
            })
            .then(() => {
              this.$router.replace({ name: "Homeuser" });
              alert("bravo");
            });
        })
        .catch(err => {
          this.error = err.message;
          alert("l'émail ou le mot de passe est invalid");
        });
    }
  }
};
</script>