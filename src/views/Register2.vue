<template>
  <div>
   
    <v-card class="mx-auto mt-8" max-width="550" outlined>
      <v-breadcrumbs class="mb-6" :items="links">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
      <v-form class="mr-12 ml-12" ref="form" v-model="valid" lazy-validation>
        <h1 class="mt-4 mb-2">Finaliser l'inscription</h1>
        <p>Ces informations vous permetteront de communiquer avec les autres utilisateurs prés de chez vous</p>
        <v-row>
         <v-col md="6" sm="12" xs="12">
          <v-text-field
           v-model="nameUser"
           placeholder="Charles..."
          :rules="nameRules"
          required
            filled
            label="Prénom"
            
            append-icon="mdi-account-tie"
          ></v-text-field>
         </v-col>
         <v-col md="6" sm="12" xs="12">
          <v-text-field
          v-model="fullNameUser"
          :rules="fullNameRules"
          required
            filled
            label="Nom"
             placeholder="Baudelaire..."
            append-icon="mdi-account-tie"
          ></v-text-field>
         </v-col>
        </v-row>
        <v-text-field
          v-model="adresse"
          :rules="adresseRules"
          label="adresse"
           placeholder="2 rue de la paix..."
           append-icon="mdi-office-building-marker-outline"
          filled
          required
        ></v-text-field>
         <v-text-field
          v-model="ville"
          :rules="villeRules"
          label="ville"
           placeholder="Paris..."
           append-icon="mdi-map-marker"
          filled
          required
        ></v-text-field>
        <v-row>
          <v-col md="6" sm="12" xs="12">
             <v-btn
          block
          :disabled="!valid"
          class="mr-4 primary"
          @click="addNewUser"
        >
          Finaliser
        </v-btn>
         </v-col>
           <v-col md="6" sm="12" xs="12">
             <v-btn class="mb-8" block @click="reset">
          Annuler
        </v-btn>
          </v-col>
        </v-row>
         <h3 class="text-center mt-2 mb-2">
            <v-btn  
        text
      color="primary"
       link 
       to="/homeuser">
       Ignorer pour l'instant >
        </v-btn>
         </h3>
      </v-form>
    </v-card>

  </div>
</template>

<script>
import firebase from "firebase";
import { db } from "../main";

const usersRef = db.collection("users");

export default {
  data: () => ({
    error: null,
    user: null,
    liks: [],
    links: [
      { text: "Accueil", to: "/homeuser" },
      { text: "Connexion", to: "/" },
      { text: "Inscription", to: "" }
    ],
    valid: true,

    nameUser: "",
    nameRules: [
      v => !!v || "Prénom est obligatoire ",
      v =>
        (v && v.length <= 20) || "le prénom ne doit pas dépasser 20 caractére"
    ],
    fullNameUser: "",
    fullNameRules: [
      v => !!v || "Nom est obligatoire ",
      v =>
        (v && v.length <= 20) || "le nom ne doit pas dépasser 20 caractére"
    ],
    adresse: "",
    adresseRules: [
      v => !!v || "adresse est obligatoire",
      v =>
        (v && v.length <= 70) || "une adresse ne doit pas dépasser 70 caractére"
    ],
    ville: "",
    villeRules: [
      v => !!v || "ville est obligatoire",
      v =>
        (v && v.length <= 30) || "une ville ne doit pas dépasser 30 caractére"
    ],
    telephone: "",
    telephoneRules: [
      v => !!v || "le télephone est obligatoire",
      v =>
        (v && v.length <= 20) ||
        "le Téléphone ne doit pas dépasser 20 caractére"
    ],
    newUser: {
      name: "",
      email: "",
      id: "",
      adresse: "",
      ville: "",
      fullName: "",
      liks: []
    }
  }),

  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  },

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

    addNewUser() {
      (this.newUser = {
        name: this.nameUser,
        email: this.user.email,
        idUser: this.user.uid,
        adresse: this.adresse,
        ville: this.ville,
        fullName: this.fullNameUser,
        liks: this.liks
      }),
        usersRef.add(this.newUser);
      this.$router.replace({ name: "Homeuser" });
    }
  }
};
</script>