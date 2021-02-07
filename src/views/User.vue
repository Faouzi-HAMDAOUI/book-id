<template>
  <div class="homeuser">
    <!--------------- la ligne pour afficher les détails sur un utilisateur ----------------->
    <v-row class="ml-6">
      <v-col md="2" class="justify-center ">
        <v-img
          class="avatar mt-3"
          width="130px"
          src="https://cdn.vuetifyjs.com/images/john.jpg"
          alt="John"
        >
        </v-img>
        <p class="mt-10">Avis des utilisateurs: (8)</p>
        <p>
          <v-rating
            value="4"
            color="amber"
            dense
            half-increments
            readonly
            size="18"
          >
          </v-rating>
        </p>
      </v-col>
      <v-col md="9" class="justify-center">
        <h2>{{ myUser[0].name }} {{ myUser[0].fullName }}</h2>
        <p class="mt-2">
          <v-icon>mdi-map-marker</v-icon>
          {{ myUser[0].ville }}
        </p>

        <h4 class="mt-10">Bibliothèque:</h4>
        <h1>
          <span color="#2F0392">{{ nbLivre }} Livres</span>
        </h1>
        <v-btn
          v-if="myID != $route.params.id"
          x-large
          class="ma-2 text-capitalize"
          outlined
          color="#2F0392"
        >
          <v-icon class="mr-3" large>mdi-message-processing</v-icon>
          Envoyer un message
        </v-btn>
        <v-btn
          v-if="myID == $route.params.id"
          x-large
          class="ma-2 text-capitalize"
          outlined
          color="#2F0392"
        >
          <v-icon class="mr-3" large>mdi-brush</v-icon>
          Modifier mon profil
        </v-btn>
        <v-btn
          v-if="myID != $route.params.id"
          align="bottom"
          x-large
          class="ma-2 text-capitalize ml-16"
          outlined
        >
          <v-icon class="mr-3" large>mdi-cancel</v-icon>
          Bloquer le profil
        </v-btn>
        <v-btn
          v-if="myID != $route.params.id"
          x-large
          class="ma-2 text-capitalize "
          outlined
        >
          <v-icon
            class="mr-3"
            large
            color="red darken-4
"
            >mdi-exclamation-thick</v-icon
          >
          Signaler le profil
        </v-btn>
      </v-col>
    </v-row>

    <v-divider color="#FEB546" class="mt-2 mb-12"></v-divider>
    <!--------------- End la ligne pour afficher les détails sur un utilisateur ----------------->
    <!--  --------------------------- list of Books --------------------------- -->
    <v-row>
      <v-col md="6" sm="12" xs="4">
        <v-row>
          <v-col md="10" sm="10" xs="10">
            <v-text-field
              v-model="book"
              @keyup="searchBook(book)"
              label="Rechercher un livre, un auteur, un utilisateur..."
            >
            </v-text-field>
          </v-col>
          <v-col md="2" sm="2" xs="2">
            <v-btn class=" ml-0 mr-2" color="#FEB546" x-large>
              <v-icon x-large color="white">mdi-magnify</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-col class="d-flex" md="2" sm="4" xs="2">
        <v-combobox
          v-model="Genre"
          :items="items2"
          label="Genre"
          multiple
          filled
        ></v-combobox>
      </v-col>
      <v-col class="d-flex" md="2" sm="4" xs="2">
        <v-combobox
          :items="items3"
          label="Disponibilité"
          multiple
          filled
        ></v-combobox>
      </v-col>
      <v-col class="d-flex" md="2" sm="4" xs="2">
        <!-- <v-select :items="items" filled label="Plus de filtres"></v-select> -->
        <v-btn
          depressed
          filled
          x-large
          class="text-capitalize mt-1"
          @click="filtre = !filtre"
        >
          Plus de filtres...
        </v-btn>
      </v-col>
    </v-row>
    <v-row v-if="filtre">
      <v-col class="d-flex" md="4" sm="4" xs="2">
        <v-combobox :items="items4" label="Note" multiple filled></v-combobox>
      </v-col>
      <v-col class="d-flex" md="4" sm="4" xs="2">
        <v-combobox
          :items="items5"
          label="Thématique"
          multiple
          filled
        ></v-combobox>
      </v-col>
      <v-col class="d-flex" md="4" sm="4" xs="2">
        <v-combobox
          :items="items6"
          label="Distance"
          multiple
          filled
        ></v-combobox>
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
          class="mb-16"
          v-for="(book, i) in listBooks"
          :key="book.id"
          md="3"
          sm="6"
          xs="12"
        >
          <v-hover v-slot="{ hover }">
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
                    <h2 class="mt-2 ml-4">{{ book.title }}</h2>

                    <p class="ml-4"><slot></slot> {{ book.auteur }}</p>
                    <v-chip
                      v-if="book.genre[0]"
                      class="ml-4  white--text mt-1"
                      color="deep-purple darken-1"
                    >
                      {{ book.genre[0] }}
                    </v-chip>
                    <v-chip
                      v-if="book.genre[1]"
                      class="ml-4 white--text mt-1"
                      color="purple darken-1"
                    >
                      {{ book.genre[1] }}
                    </v-chip>
                    <v-row v-if="book.disponible == 'disponible'">
                      <v-icon class="ml-6 mt-4" color="white"
                        >mdi-check-box-outline</v-icon
                      >
                      <h3 class="white--tex mt-4">Disponible</h3>
                    </v-row>
                    <v-btn
                      class="mt-16 ml-14 "
                      outlined
                      color="white"
                      Link
                      :to="{ name: 'Book', params: { id: book.id } }"
                    >
                      <span class="white--text">en savoir plus...</span>
                    </v-btn>
                    <p class="mt-16 ml-3" align="bottom">
                      <v-icon color="white">mdi-map-marker</v-icon>
                      {{ book.ville }}
                    </p>
                  </div>
                </v-expand-transition>
              </v-img>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon
                    v-if="
                      (book.links[0] && book.links[0].idUser === user.uid) ||
                        (book.links[1] && book.links[1].idUser === user.uid) ||
                        (book.links[2] && book.links[2].idUser === user.uid) ||
                        (book.links[3] && book.links[3].idUser === user.uid) ||
                        (book.links[4] && book.links[4].idUser === user.uid) ||
                        (book.links[5] && book.links[5].idUser === user.uid) ||
                        (book.links[6] && book.links[6].idUser === user.uid) ||
                        (book.links[7] && book.links[7].idUser === user.uid) ||
                        (book.links[8] && book.links[8].idUser === user.uid)
                    "
                    color="red"
                    large
                    @click="deleteLik(book.id, i)"
                  >
                    mdi-heart
                  </v-icon>
                  <v-icon
                    v-else
                    @click="addLik(book.id, i)"
                    color="black"
                    large
                  >
                    mdi-heart-outline
                  </v-icon>

                  <!-- <v-icon  @click="addLik(book.id, i)" color="black" large >mdi-heart-outline</v-icon> -->
                </v-list-item-icon>
                <v-list-item-content>
                  <v-rating
                    :value="book.note"
                    color="#FEB546"
                    dense
                    half-increments
                    readonly
                    size="27"
                  >
                  </v-rating>
                </v-list-item-content>
              </v-list-item>
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
    myID: "",
    myUser: [],
    nbLivre: 0,
    disp: true,
    filtre: false,
    Genre: "",
    searchResult: "",
    listBooks: [],
    searcheBook: [],
    liked: false,
    myLik: [],
    lik: {},
    book: "",
    items: ["Croissant", "Décroissant", "Date"],
    items2: ["Science-fiction", "Drame", "Fantastique", "Romance", "Policier"],
    items3: ["Disponible", "Non-disponible"],
    items4: ["1 étoile", "2 étoiles", "3 étoiles", "4 étoiles", "5 étoiles"],
    items5: ["Science", "Cuisine"],
    items6: ["< 5Km", "< 10Km", "< 15Km", "< 20Km"]
  }),
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
        this.email = user.email;
        this.myID = user.uid;
      } else {
        this.user = null;
      }
    });

    this.getBook();
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
            if (newUser.idUser == this.$route.params.id) {
              this.myUser.push(newUser);
            }
          });
        });
      return this.myUser;
    },
    getBook: function() {
      db.collection("books")
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            let book = doc.data();
            book.id = doc.id;
            //this.liked = book.links;

            for (var i = 0, i_len = book.links.length; i < i_len; i++) {
              if (book.links.idUser == this.user.uid) {
                this.liked = true;
              } else {
                this.liked = false;
              }
            }
            //this.listBooks.push(book);
            if (book.idUser == this.$route.params.id) {
              this.listBooks.push(book);
              this.nbLivre++;
            }
          });
        });
      this.searcheBook = this.listBooks;
    },

    addLik: function(id, i) {
      this.lik = { idUser: this.user.uid };
      this.myLik = this.listBooks[i].links;
      this.myLik.push(this.lik);

      booksRef
        .doc(id)
        .update({ links: this.myLik }, { merge: true })
        .then(() => {
          console.log("Document successfully updated!");
        })
        .catch(error => {
          console.error("Error updating document: ", error);
        });
      this.messageConf = "Le livre a été ajouté à vos favoris";
      this.confMsg = true;
      setTimeout(() => {
        return (this.confMsg = false);
      }, 4000);
    },

    deleteLik: function(id, i) {
      this.myLik = this.listBooks[i].links;
      for (let i = 0, i_len = this.myLik.length; i < i_len; i++) {
        if (this.myLik[i].idUser == this.user.uid) {
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
      this.messageConf = "Le livre a été retiré sur la liste de vos favoris";
      this.confMsg = true;
      setTimeout(() => {
        return (this.confMsg = false);
      }, 4000);
    },
    searchBook: function(book) {
      this.searcheBook = book
        ? this.listBooks.filter(myBook => {
            return (
              myBook.title.toLowerCase().includes(book.toLowerCase()) ||
              myBook.auteur.toLowerCase().includes(book.toLowerCase())
            );
          })
        : this.listBooks;

      this.listBooks = this.searcheBook;
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
        this.listBooks = [];
        this.getBook();
      }
    },

    listBooks: function(va) {
      if (va == "") {
        this.searchResult = "aucun rÃ©sultat ne correspond Ã  votre recherche";
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
.myColor {
  background-color: #2f0392;
  color: white;
}
</style>
