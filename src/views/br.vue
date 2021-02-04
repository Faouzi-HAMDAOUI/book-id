<template>
  <v-carousel height="700" hide-delimiters>
    <v-carousel-item v-for="(book, i) in listBooks" :key="i">
      <v-row>
        <v-col class="mt-16 ml-16" md="4" sm="4" xs="4">
          <img :src="book.photo" class="mt-16 ml-16" height="360px" alt="" />
        </v-col>
        <v-col class="mt-12" md="7" sm="4" xs="4">
          <v-sheet color="transparent" class="black--text mr-12 mt-16">
            <v-row>
              <div>
                <h1 class=" mt-16">{{ book.title }}</h1>
                <h3 class=" mt-2">{{ book.auteur }}</h3>
                <v-chip
                  v-if="book.genre[0]"
                  class="ma-2  mt-1"
                  color="deep-purple darken-1"
                >
                  {{ book.genre[0] }}
                </v-chip>
                <v-chip
                  v-if="book.genre[1]"
                  class="ma-2  mt-1"
                  color="purple darken-1"
                >
                  {{ book.genre[1] }}
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
      </v-row>

      <v-bottom-navigation
        class="text-center black--text transparent"
        height="110"
      >
        <v-row class="justify-center">
          <v-col md="2">
            <v-avatar class="mt-3 mr-10 ml-10" size="62" color="orange">
              <v-icon @click="deleteBook(i)" dark>
                mdi-close
              </v-icon>
            </v-avatar>
            <p>Ne m'intéresse pas</p>
          </v-col>
          <v-col md="2">
            <v-avatar class="mt-3" size="62" color="orange">
              <v-icon @click="sendMessage(book)" dark>
                mdi-flag
              </v-icon>
            </v-avatar>
            <p>Réserver</p>
          </v-col>

          <v-col md="2">
            <v-avatar class="mt-3 mr-10 ml-10" size="62" color="orange">
              <!-- <v-icon @click="showBook(book)" dark>
                mdi-cards-heart
              </v-icon> -->

              <v-icon
                dark
                v-if="
                  book.links[0].idUser === user.uid ||
                    (book.links[1] && book.links[1].idUser === myId) ||
                    (book.links[2] && book.links[2].idUser === myId) ||
                    (book.links[3] && book.links[3].idUser === myId) ||
                    (book.links[4] && book.links[4].idUser === myId) ||
                    (book.links[5] && book.links[5].idUser === myId) ||
                    (book.links[6] && book.links[6].idUser === myId) ||
                    (book.links[7] && book.links[7].idUser === myId) ||
                    (book.links[8] && book.links[8].idUser === myId)
                "
                color="red"
                @click="deleteLik(book.id, i)"
              >
                mdi-cards-heart
              </v-icon>
              <v-icon dark v-else @click="addLik(book.id, i)" color="black">
                mdi-cards-heart
              </v-icon>
            </v-avatar>
            <p>Ajouter à mes favoris</p>
          </v-col>
        </v-row>
      </v-bottom-navigation>

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
    </v-carousel-item>
  </v-carousel>
</template>

<script>
import firebase from "firebase";
import { db, msgsRef, booksRef } from "../main";
export default {
  data() {
    return {
      myLik: [],
      lik: {},
      listBooks: [],
      myUser: [],
      value: 4,
      allMessages: [],
      allfavoris: [],
      msgg: [],
      idmsg: "6JfI2xqVKYWnYkSMypaJ",
      messageConf: "",
      confMsg: false,
      photo: "",
      avis: "",
      title: "",
      auteur: "",
      note: "",
      etats: "",
      resume: "",
      nameUser: "",
      idUser: "",
      ville: "",
      disponible: ""
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
    },
    deleteBook(i) {
      this.listBooks.splice(i, 1);
      this.messageConf = "Le livre a été retiré de la liste";
      this.confMsg = true;
      setTimeout(() => {
        return (this.confMsg = false);
      }, 4000);
      return this.listBooks;
    },
    //-------------------------------- favoris ----------------------

    addLik: function(id, i) {
      this.lik = { idUser: this.myId };
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
    },

    deleteLik: function(id, i) {
      this.myLik = this.listBooks[i].links;
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
    },

    getallFavoris() {
      db.collection("favoris")
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            let newfavoris = doc.data();
            newfavoris.id = doc.id;

            this.allfavoris.push(newfavoris);
          });
        });
      return this.allfavoris;
    },
    showBook(book) {
      this.photo = book.photo;
      this.avis = book.avis;
      this.title = book.title;
      this.auteur = book.auteur;
      this.note = book.note;
      this.etats = book.etats;
      this.resume = book.resume;
      this.nameUser = book.nameUser;
      this.idUser = this.myId;
      this.ville = book.ville;
      this.disponible = book.disponible;
      setTimeout(() => {
        this.addFavoris();
      }, 1000);
    },
    addFavoris() {
      this.getallFavoris();
      const post = {
        photo: this.photo,
        avis: this.avis,
        title: this.title,
        auteur: this.auteur,
        note: this.note,
        etats: this.etats,
        resume: this.resume,
        nameUser: this.nameUser,
        idUser: this.myId,
        ville: this.ville,
        disponible: this.disponible
      };

      db.collection("favoris")
        .add(post)
        .then(response => {
          console.log(response);
        })
        .catch(err => {
          console.log(err);
        });

      this.messageConf = "Le livre a été ajouté à vos favoris";
      this.confMsg = true;
      setTimeout(() => {
        return (this.confMsg = false);
      }, 4000);
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

    sendMessage(book) {
      this.date = new Date().toISOString().substr(0, 19);
      //this.getMyMessages();
      (this.newMsg = {
        nameEmeteur: this.myUser[0].name,
        nameRecepteur: book.nameUser,
        idEmeteur: this.myUser[0].idUser,
        idRecepteur: book.idUser,
        msg:
          "Bonjour, je suis intéressé par votre livre, et j'aimerais savoir si je peux l'emprunter ?",
        created: this.date
      }),
        this.getMyMessages();
      setTimeout(() => {
        this.msgg = this.allMessages[0];
        this.msgg.push(this.newMsg);
        msgsRef
          .doc(this.idmsg)
          .update({ msg: this.msgg }, { merge: true })
          .then(() => {
            console.log("Votre message a été envoyé avec succès!");
          })
          .catch(error => {
            console.error("Error lors denvois de message: ", error);
          });
      }, 1000);
      this.messageConf =
        "Votre demande a bien été prise en compte, vous serez contacté prochainement par son propriétaire !";
      this.confMsg = true;
      setTimeout(() => {
        return (this.confMsg = false);
      }, 4000);
    }
  }
};
</script>