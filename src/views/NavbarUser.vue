<template>
  <div class="NavbarUser">
    <nav>
      <v-app-bar app color="#2F0392">
        <v-app-bar-nav-icon color="white" @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-spacer></v-spacer>
        <v-toolbar-title ><img width="74" src="../assets/logo_blc.png" /> </v-toolbar-title>
         
          

        <v-spacer></v-spacer>

         <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
         class="mr-2" color="white" dark fab width="40" height="40"
          v-bind="attrs"
          v-on="on"
        >
         <v-icon color="#2F0392"  large>
            mdi-account
          </v-icon>
        </v-btn>
      </template>

      <v-list >

        <v-list-item class="mr-4">
          <v-list-item-title><v-btn class="text-capitalize" @click="logOut">
           Mon profil
        </v-btn></v-list-item-title>
        </v-list-item>
         <v-list-item class="mr-4">
          <v-list-item-title><v-btn class="text-capitalize" @click="logOut">
           Déconnexion
        </v-btn></v-list-item-title>
        </v-list-item>

      </v-list>
    </v-menu>
      </v-app-bar>
       <v-list  height="64" >
        <v-list-item-content>
         
        </v-list-item-content>
      </v-list>
      <v-navigation-drawer v-model="drawer" app class="mt-16">
       

        <v-divider ></v-divider>

        <v-list dense nav class="mt-8">
          <v-list-item
            color="orange"
            link
            v-for="link in links"
            :key="link.title"
            :to="link.to"
          >
            <v-list-item-icon>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ link.title }} </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-list dense nav class="mt-8">
          <v-list-item
            color="orange"
            link
            v-for="link in links2"
            :key="link.title"
            :to="link.to"
          >
            <v-list-item-icon>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ link.title }} </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-list dense nav class="mt-8">
          <v-list-item
            color="orange"
            link
            v-for="link in links1"
            :key="link.title"
            :to="link.to"
          >
            <v-list-item-icon>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ link.title }} </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </nav>
  </div>
</template>

<script>
import firebase from "firebase";
import { db } from "../main";
//const msgsRef = db.collection("messages");

export default {
  data: () => ({
    userAuth: null,
    myName: "",
    myId: "",
    drawer: null,
    query: "",
    myUser: [],
     allMessages: [],
    nbreMsg: 1,
    links: [
      { title: "Accueil", to: "/homeuser", icon: "mdi-home-flood" },
      { title: "Matche ton livre", to: "/decouvrir", icon: "mdi-view-carousel" }
      
    ],
    links1: [{
        title: "Ma bibliothèque",
        to: "/maBiblioteque",
        icon: "mdi-view-dashboard"
      },
      {
        title: "Ajouter un livre",
        to: "/ajouterLivre",
        icon: "mdi-plus-box-multiple"
      },
      {
        title: "Mes emprunts",
        to: "/reservations",
        icon: "mdi-flag"
      },
      { title: "Mes favoris", to: "/favoris", icon: "mdi-cards-heart" }
      
     // { title: "Test", to: "/br", icon: "mdi-cards-heart" }
      ],
    links2: [{
        title: `Messagerie (2)`,
        to: "/messagerie",
        icon: "mdi-message-processing"
      },
      { title: "Groupes", to: "/groupes", icon: "mdi-account-multiple" },],
  }),

  created: function() {
    // check auth
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.userAuth = user;
        this.myName = user.email;
        this.myId = user.uid;
      } else {
        this.userAuth = null;
      }
    });

    this.getUser();
  },

  methods: {
    getUser: function() {
      db.collection("users")
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            let newUser = doc.data();
            newUser.id = doc.id;
            if (newUser.idUser == this.myId) {
              this.myUser.push(newUser);
            }
          });
        });
      return this.myUser;
    },

     getMyMessages: function() {
      db.collection("messages")
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            let msgUser = doc.data();
            msgUser.id = doc.id;
            let msgg = msgUser.msg;
            this.allMessages.push(msgg);
          });
        });

      return this.allMessages;
    },

    search(quer) {
      this.searchPerson = quer
        ? this.users.filter(user =>
            user.name.toLowerCase().includes(quer.toLowerCase())
          )
        : this.users;
      this.users = this.searchPerson;
    },

    logOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          firebase.auth().onAuthStateChanged(() => {
            this.$router.push("/");
          });
        });
    }
  },
  watch: {
    query: function(v) {
      if (v == "") {
        this.users = [];
        this.getUsers();
      }
    }
  }
};
</script>
<style>
.myColor {
    background-color: #2F0392;
    color: white;
  }
</style>