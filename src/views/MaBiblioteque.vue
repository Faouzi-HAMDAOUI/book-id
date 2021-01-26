<template>
  <div class="homeuser">
    <!--  --------------------------- list of Books --------------------------- -->
    <v-row >
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

    <!-- ------------------ la liste de mes livre a gérer --------------------- -->
    
  <v-simple-table
    fixed-header
    
  >
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
           <h2>Statut</h2>
          </th>
          <th class="text-left">
            <h2>Titre</h2>
          </th>
           <th class="text-left">
            <h2>Auteur</h2>
          </th>
           <th class="text-left">
            <h2>Emprunteur</h2>
          </th>
           <th class="text-left">
            <h2>Adresse</h2>
          </th>
           <th class="text-left">
             <h2>Date de retour</h2>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="book in myListeBooks"
          :key="book.id"
          
        >
          <td v-if="book.disponible == 'prêté' || book.disponible == 'Demandé' "  >
            <v-icon v-if="book.disponible == 'prêté' " color="green" class="mr-2" large>mdi-reply</v-icon>
            <v-icon v-if="book.disponible == 'Demandé' " color="#FEB546" class="mr-2" large>mdi-reply</v-icon>
            {{ book.disponible }}
            </td>
          <td v-if="book.disponible == 'prêté' || book.disponible == 'Demandé' " >{{ book.title }}</td>
          <td v-if="book.disponible == 'prêté' || book.disponible == 'Demandé' " >{{ book.auteur }}</td>
          <td v-if="book.disponible == 'prêté' || book.disponible == 'Demandé' " >{{ book.nameUser }}</td>
          <td v-if="book.disponible == 'prêté' || book.disponible == 'Demandé' " >{{ book.ville }}</td>
          <td v-if="book.disponible == 'prêté'" >03 fév 2021</td>
          <td v-if="book.disponible == 'Demandé'" >à définir</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>

    <v-container>
      <v-row align="center">
        <v-col class="d-flex mt-3" md="2" sm="4" xs="4">
          <v-select :items="items" label="Trier par" dense solo></v-select>
        </v-col>
      </v-row>
      <v-row dense>
        <v-col
          v-for="book in myListeBooks"
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
                    
                     <p class="display-1 ml-4 mb-0 mt-11" >{{ book.title }}</p> 
                    
                    <p class="font-italic mt-0 ml-4"><slot></slot> {{ book.auteur }}</p>
                    <v-chip v-if="book.genre[0]" class="ml-4 white--text mt-1" color="deep-purple darken-1">
                  {{ book.genre[0] }}
                </v-chip>
                <v-chip v-if="book.genre[1]" class="ml-4 white--text  mt-1" color="purple darken-1">
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
              <v-fab-transition>
                <v-btn
                v-if="book.disponible == 'prêté' "
                  class=" text-capitalize"
                  color="green"
                  dark
                  absolute
                  top
                  right
                >
                  <v-icon>mdi-reply</v-icon>
                  prêté
                </v-btn>
              </v-fab-transition>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>

    <!--  --------------------------- End list of Books --------------------------- -->
  </div>
</template>

<script lang="ts">
import firebase from "firebase";
import { db } from "../main";

export default {
  components: {},
  data: () => ({
    genre0: [],
    genre1: [],
    searchResult: "",
    //listBooks: [],
    searcheBook: [],
    myListeBooks: [],
    book: "",
    items2: ["Science", "sport", "programmation", "cuisine"],
    items3: ["Disponible", "Non-disponible"]
  }),
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
        this.email = user.email;
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
            //this.listBooks.push(book);
            if (book.idUser == this.user.uid) {
              this.myListeBooks.push(book);
            }
          });
        });
      this.searcheBook = this.myListeBooks;
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
