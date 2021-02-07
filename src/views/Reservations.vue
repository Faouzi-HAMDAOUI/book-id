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

    <!-- ------------------ la liste de mes livre a gérer --------------------- -->

    <v-simple-table fixed-header>
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
              <h2>Prêteur</h2>
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
          <tr>
            <td>
              <v-icon color="green" class="mr-2" large>mdi-flag</v-icon>
              Emprunté
            </td>
            <td>Le procés du jour</td>
            <td>Gérard darmana</td>
            <td>Axel</td>
            <td>Villeurbanne</td>
            <td>à définir</td>
          </tr>
          <tr>
            <td>
              <v-icon color="#FEB546" class="mr-2" large>mdi-flag</v-icon>
              Demandé
            </td>
            <td>La nuit sacré</td>
            <td>Françoin Holand</td>
            <td>Cloé</td>
            <td>Dijon</td>
            <td>03 fév 2021</td>
          </tr>
          <tr v-for="book in myListeBooks" :key="book.id">
            <td
              v-if="book.disponible == 'prêté' || book.disponible == 'Demandé'"
            >
              <p v-if="book.disponible == 'prêté'">
                <v-icon color="green" class="mr-2" large>mdi-flag</v-icon>
                Emprunté
              </p>
              <p v-if="book.disponible == 'Demandé'">
                <v-icon color="#FEB546" class="mr-2" large>mdi-flag</v-icon>
                Demandé
              </p>
            </td>
            <td
              v-if="book.disponible == 'prêté' || book.disponible == 'Demandé'"
            >
              {{ book.title }}
            </td>
            <td
              v-if="book.disponible == 'prêté' || book.disponible == 'Demandé'"
            >
              {{ book.auteur }}
            </td>
            <td
              v-if="book.disponible == 'prêté' || book.disponible == 'Demandé'"
            >
              {{ book.nameUser }}
            </td>
            <td
              v-if="book.disponible == 'prêté' || book.disponible == 'Demandé'"
            >
              {{ book.ville }}
            </td>
            <td v-if="book.disponible == 'prêté'">03 fév 2021</td>
            <td v-if="book.disponible == 'Demandé'">à définir</td>
          </tr>
          <tr class="text-center" width="1000">
            <td></td>
            <td></td>
            <td>
              <p class="font-weight-light" color="grey lighten-2primary">
                Fin de la liste
              </p>
            </td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

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
