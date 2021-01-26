<template>
  <nav>
    <v-app-bar app>
      <!-- <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon> -->
      <v-toolbar-title ><img class="mr-4 ml-6" width="74" src="../assets/logo.png" /> BOOK.ID </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn text
        class="text-capitalize mr-2"
       color="#2F0392"
       link >Accueil</v-btn>
      <v-btn text class="text-capitalize mr-2"
       color="#2F0392">Concept</v-btn>
      <v-btn text  class="text-capitalize mr-2"
       color="#2F0392">Fonctionnalités</v-btn>
      <v-btn text  class="text-capitalize mr-2"
       color="#2F0392">FAQ</v-btn>
      <v-btn  color="#2F0392" class="white--text text-capitalize mr-8" Link to="/connexion">
       Connexion
      </v-btn>
    </v-app-bar>
  </nav>
</template>

<script>
export default {
  data: () => ({
    drawer: null
  })
};
</script>