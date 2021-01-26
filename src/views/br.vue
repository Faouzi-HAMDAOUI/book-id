<template>
  <v-carousel height="700" hide-delimiters>
    <v-carousel-item v-for="(book, i) in listBooks" :key="i">
      <v-row>
        <v-col md="5">
          <img
            :src="book.photo"
            class="mt-16 mb-16 ml-16"
            width="430"
            height="400"
            alt=""
          />
        </v-col>
        <v-col md="7">
          <v-sheet
            color="transparent"
            class="black--text mr-12 mt-16 text--black"
          >
            <v-row>
              <div>
                <h1 class=" mt-16">{{ book.title }}</h1>
                <h3 class=" mt-2">{{ book.auteur }}</h3>
                <v-chip class="ma-2  mt-1">
                  Proposé par : {{ book.nameUser }}
                </v-chip>
                <p class="mr-16  mt-12">
                  {{ book.resume }}
                </p>
                <p class="mt-6">
                  <v-icon class="black--text">mdi-map-marker</v-icon>
                  {{ book.ville }}
                </p>
              </div>
            </v-row>
          </v-sheet>
        </v-col>

        <v-bottom-navigation
          color="red"
          class="text-center"
          height="90"
          :value="value"
        >
          <v-avatar class="mt-3 mr-10 ml-10" size="62" color="orange">
            <v-icon dark>
              mdi-close
            </v-icon>
          </v-avatar>

          <v-avatar class="mt-3 mr-10 ml-10" size="62" color="orange">
            <v-icon dark>
              mdi-flag
            </v-icon>
          </v-avatar>

          <v-avatar class="mt-3 mr-10 ml-10" size="62" color="orange">
            <v-icon dark>
              mdi-cards-heart
            </v-icon>
          </v-avatar>
        </v-bottom-navigation>
      </v-row>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
import firebase from "firebase";
import { db } from "../main";
export default {
  data() {
    return {
      listBooks: [],
      myUser: [],
      value: 4,
      cloe: "ecEOW42HfPbsSgFcJ9Zf1s9x1Ff1",
      faouzi: "tWd2mBhz0GYC1AYAhjNhpBIoFI42",
      items: [
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg"
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg"
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg"
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg"
        }
      ]
    };
  },
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
    this.getBook();
  },
  methods: {
    getBook: function() {
      db.collection("books")
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            let book = doc.data();
            book.id = doc.id;

            if (book.ville == this.myUser[0].ville) {
              this.listBooks.push(book);
            }
          });
        });
      return this.listBooks;
    },
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
    }
  }
};
</script>