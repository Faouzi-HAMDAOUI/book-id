<template>
  <div class="homeuser">
    <!--  --------------------------- list of Books --------------------------- -->
    <v-row>
      <v-col md="6" sm="12" xs="4">
        <v-row>
          <v-col md="10" sm="10" xs="10">
            <v-text-field
              v-model="book"
              @keyup="searchBook(book)"
              label="Rechercher un livre, un auteur, un utlisitaeur..."
            >
            </v-text-field>
          </v-col>
          <v-col md="2" sm="2" xs="2">
            <v-btn class="ml-0 mr-2" color="orange" x-large>
              <v-icon x-large>mdi-magnify</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-col class="d-flex" md="2" sm="4" xs="2">
        <v-select :items="items2" filled label="Genre"></v-select>
      </v-col>
      <v-col class="d-flex" md="2" sm="4" xs="2">
        <v-select :items="items3" filled label="Disponibilité"></v-select>
      </v-col>
    </v-row>
    <!-- <h2>{{ searchResult }}</h2> -->

    <v-container>
      <v-row align="center">
        <v-col class="d-flex mt-3" md="2" sm="4" xs="4">
          <v-select :items="items" label="Trier par" dense solo></v-select>
        </v-col>
      </v-row>
      <v-row dense>
        <v-col
          v-for="(book, i) in myListeBooks"
          :key="book.id"
          md="3"
          sm="6"
          xs="12"
        >
          <v-hover
            v-slot="{ hover }"
            v-if="
              (book.links[0] && book.links[0].idUser === myId) ||
                (book.links[1] && book.links[1].idUser === myId) ||
                (book.links[2] && book.links[2].idUser === myId) ||
                (book.links[3] && book.links[3].idUser === myId) ||
                (book.links[4] && book.links[4].idUser === myId) ||
                (book.links[5] && book.links[5].idUser === myId) ||
                (book.links[6] && book.links[6].idUser === myId) ||
                (book.links[7] && book.links[7].idUser === myId) ||
                (book.links[8] && book.links[8].idUser === myId) ||
                (book.links[9] && book.links[9].idUser === myId) ||
                (book.links[10] && book.links[10].idUser === myId)
            "
          >
            <v-card
              class="mx-auto"
              color="grey lighten-4"
              max-width="300"
              height="360"
            >
              <v-img height="360" :aspect-ratio="16 / 9" :src="book.photo">
                <v-expand-transition>
                  <div
                    v-if="hover"
                    class=" transition-fast-in-fast-out black darken-3 v-card--reveal display-5 white--text"
                    style="height: 100%;"
                  >
                    <p class="display-1 ml-4 mb-0 mt-11">{{ book.title }}</p>

                    <p class="font-italic mt-0 ml-4">
                      <slot></slot> {{ book.auteur }}
                    </p>
                    <v-chip
                      v-if="book.genre[0]"
                      class="ml-4 white--text mt-1"
                      color="deep-purple darken-1"
                    >
                      {{ book.genre[0] }}
                    </v-chip>
                    <v-chip
                      v-if="book.genre[1]"
                      class="ml-4 white--text  mt-1"
                      color="purple darken-1"
                    >
                      {{ book.genre[1] }}
                    </v-chip>
                    <v-btn
                      class="mt-16 ml-14"
                      outlined
                      color="white"
                      Link
                      :to="{ name: 'Book', params: { id: book.id } }"
                    >
                      Voir la fiche...
                    </v-btn>
                    <p class="mt-6 ml-2" align="bottom">
                      <v-icon color="white">mdi-map-marker</v-icon>
                      {{ book.ville }}
                    </p>
                  </div>
                </v-expand-transition>
              </v-img>
              <div class="mt-2">
                <v-icon
                  @click="deleteLik(book.id, i)"
                  class="mr-2"
                  color="red"
                  large
                >
                  mdi-heart
                </v-icon>
                <span color="#2F0392">Retirer des favoris</span>
              </div>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>

    <!--  --------------------------- End list of Books --------------------------- -->
    <!--  --------------------------- confirm message --------------------------- -->
    <v-row justify="center">
      <v-dialog v-model="confMsg" persistent max-width="500px">
        <v-card max-width="500px">
          <v-toolbar color="light-green darken-1" dark>
            <v-toolbar-title>Confirmation</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="confMsg = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>

          <div class="text-center">
            <h2>{{ messageConf }}</h2>
          </div>
        </v-card>
      </v-dialog>
    </v-row>
    <!--  --------------------------- End confirm message --------------------------- -->
  </div>
</template>

<script lang="ts">
import firebase from "firebase";
import { db, booksRef } from "../main";

export default {
  components: {},
  data: () => ({
    confMsg: false,
    messageConf: "",
    genre0: [],
    genre1: [],
    searchResult: "",
    //listBooks: [],
    searcheBook: [],
    myListeBooks: [],
    book: "",
    items2: ["Science", "sport", "programmation", "cuisine"],
    items3: ["Disponible", "Non-disponible"],
    myId: "",
    favoris: [],
    myLik: []
  }),
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
        this.email = user.email;
        this.myId = user.uid;
      } else {
        this.user = null;
      }
    });

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
            this.favoris = book.links;
            // this.myListeBooks.push(book);
            //this.listBooks.push(book);
            for (let i = 0, i_len = this.favoris.length; i < i_len; i++) {
              if (this.favoris[i].idUser == this.myId) {
                this.myListeBooks.push(book);
              }
            }
          });
        });
      this.searcheBook = this.myListeBooks;
    },

    deleteLik: function(id, i) {
      this.myLik = this.myListeBooks[i].links;
      for (let i = 0, i_len = this.myLik.length; i < i_len; i++) {
        if (this.myLik[i].idUser == this.myId) {
          this.myLik.splice(i, 1);
        }
      }
      booksRef
        .doc(id)
        .update({ links: this.myLik }, { merge: true })
        .then(() => {
          console.log("Document successfully updated!");
        })
        .catch(error => {
          console.error("Error updating document: ", error);
        });
      this.messageConf = "Le livre a été retiré sur la listes de vos favoris";
      this.confMsg = true;
      setTimeout(() => {
        return (this.confMsg = false);
      }, 4000);

      this.myListeBooks.splice(i, 1);
    },

    searchBook: function(book) {
      this.searcheBook = book
        ? this.myListeBooks.filter(myBook => {
            return (
              myBook.title.toLowerCase().includes(book.toLowerCase()) ||
              myBook.auteur.toLowerCase().includes(book.toLowerCase())
            );
          })
        : this.myListeBooks;

      this.myListeBooks = this.searcheBook;
      // return this.listBooks
      //      .filter((myBook) => {
      //          return myBook.title.toLowerCase().includes(book.toLowerCase());
      //           })
      //      .filter((myBook) => {
      //         myBook.user.toLowerCase().includes(book.toLowerCase());
      //      })
    }
  },

  watch: {
    book: function(v) {
      if (v == "") {
        this.myListeBooks = [];
        this.getBook();
      }
    },

    myListeBooks: function(va) {
      if (va == "") {
        this.searchResult = "aucun résultat ne correspond Ã  votre recherche";
      } else {
        this.searchResult = "";
      }
    }
  }
};
</script>

<style>
#create .v-speed-dial {
  position: absolute;
}

#create .v-btn--floating {
  position: relative;
}

.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.9;
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
