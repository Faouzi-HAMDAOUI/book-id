<template>
  <v-app>
    <Navbar v-if="!isAuth" />
    <NavbarUser v-if="isAuth" />
    <v-main class="mx-4">
      <router-view></router-view>
    </v-main>
    <!-- <Foothers v-if="!isAuth" /> -->
  </v-app>
</template>


<script>
import Navbar from "./views/Navbar.vue";
import NavbarUser from "./views/NavbarUser.vue";
// import Foothers from "./views/Foothers.vue";

import firebase from "firebase";

// const booksRef = db.collection('users');
import { db } from "./main";

export default {
  name: "App",
  components: {
    Navbar,
    NavbarUser
    // Foothers
  },

  data: () => ({
    drawer: null,
    user: null,
    myUser: [],
    isAuth: false,
    uid: ""
  }),

  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
        this.isAuth = true;
        this.uid = user.uid;
      } else {
        this.user = null;
        this.isAuth = false;
      }
    });
  },

  methods: {
    getUser: function() {
      db.collection("users")
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            let newUser = doc.data();
            newUser.id = doc.id;
            if (newUser.uid == this.uid) {
              this.myUser.push(newUser);
            }
          });
        });
      return this.myUser;
    }
  }
};
</script>
