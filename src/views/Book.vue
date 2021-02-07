<template>
  <div class="book">
    <v-breadcrumbs class="mx-auto mb-6" :items="links">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    <v-row class="mt-4">
      <!-- -----------------Ma premier colone (la ou j'affiche mon image)--------------- -->
      <v-col md="4" class="justify-center">
        <v-img height="400" :src="book.photo"></v-img>

        <h2 class="ml-1">Infos supplémentaires</h2>
        <v-row>
          <v-icon v-if="book.disponible == 'prêté'" class="ml-3 mt-6"
            >mdi-close-circle</v-icon
          >
          <v-icon v-if="book.disponible == 'disponible'" class="ml-3 mt-6"
            >mdi-check-circle</v-icon
          >

          <h4 class=" mt-6">{{ book.disponible }}</h4>
        </v-row>

        <h3 class=" mt-3" align="bottom">
          <v-icon>mdi-map-marker</v-icon>
          {{ book.ville }}
        </h3>

        <h4 class="ml-1 mt-6">
          Donation : <span class="red--text"> Indisponible au don</span>
        </h4>
        <h2 class="mb-2 mt-4">Propriétaire</h2>
        <v-card mt-8>
          <v-list three-line>
            <v-list-item>
              <v-list-item-avatar>
                <v-img
                  src="https://cdn.vuetifyjs.com/images/lists/4.jpg"
                ></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>
                  <h3>{{ book.nameUser }}</h3>
                </v-list-item-title>
                <v-rating
                  value="3"
                  color="amber"
                  dense
                  half-increments
                  readonly
                  size="20"
                >
                </v-rating>
              </v-list-item-content>
              <v-spacer></v-spacer>
              <v-icon x-large>
                mdi-chevron-right
              </v-icon>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <!-- ----------------- End Ma premier colone (la ou j'affiche mon image)--------------- -->

      <!-- -----------------Ma deuxiéme colone -------------------------------------------- -->
      <v-col md="7" class="ml-2">
        <h1>{{ book.title }}</h1>
        <h3 class="mb-2">{{ book.auteur }}</h3>
        <v-rating
          class="mb-4"
          :value="book.note"
          color="amber"
          dense
          half-increments
          readonly
          size="30"
        >
        </v-rating>
        <p>
          <v-btn color="orange lighten-1" class="mr-4" @click="sendMessage">
            <v-icon> mdi-flag</v-icon>
            Réserver
          </v-btn>
          <v-icon @click="showBook(book)" x-large color="black">
            mdi-heart-outline
          </v-icon>
        </p>
        <p>{{ book.resume }}</p>

        <v-chip v-if="genre0" class="ma-2  mt-1">
          {{ genre0 }}
        </v-chip>
        <v-chip v-if="genre1" class="ma-2  mt-1">
          {{ genre1 }}
        </v-chip>

        <!-- ---------------------------------- Mes commentaires--------------------------------- -->
        <h2 class="mt-8">Commentaires</h2>
        <v-form ref="form">
          <v-row>
            <v-col md="3">Ajouter une note : </v-col>
            <v-col md="4">
              <v-rating
                value="0"
                color="amber"
                dense
                half-increments
                readonly
                size="20"
              >
              </v-rating>
            </v-col>
          </v-row>
          <v-row>
            <v-col md="10" sm="10" xs="12">
              <v-text-field
                placeholder="Ecrire un commentaire, un avis..."
                v-model="commentaire"
              >
              </v-text-field>
            </v-col>
            <v-col md="2" sm="2" xs="2">
              <v-btn
                x-large
                color="orange"
                icon
                class="mt-1 ml-0"
                @click="addComment(idBook)"
              >
                <v-icon x-large color="orange">mdi-send-outline</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-form>

        <!-- -------------------------la liste des commentaires------------------------- -->

        <v-list three-line>
          <template v-for="(item, index) in items">
            <v-subheader v-if="item.header" :key="item.header"></v-subheader>

            <v-divider
              v-else-if="item.divider"
              :key="index"
              :inset="item.inset"
            ></v-divider>

            <v-list-item v-else :key="item.title">
              <v-list-item-avatar>
                <v-img
                  src="https://cdn.vuetifyjs.com/images/lists/2.jpg"
                ></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-row class="ml-2">
                  <h3 class="mt-1">{{ item.title }}</h3>
                  <v-rating
                    class="ml-2"
                    :value="item.note"
                    color="amber"
                    dense
                    half-increments
                    readonly
                    size="20"
                  >
                  </v-rating>
                </v-row>

                <v-list-item-subtitle>{{ item.subtitle }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>

        <!-- --------------------------------End pour Mes commentaires--------------------------------- -->
      </v-col>

      <!-- -----------------Ma deuxiéme colone -------------------------------------------- -->
    </v-row>
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
            <h2>
              Votre demande a bien été prise en compte, vous serez contacté
              prochainement par son propriétaire !
            </h2>
          </div>
        </v-card>
      </v-dialog>
    </v-row>
    <!--  --------------------------- End confirm message --------------------------- -->
  </div>
</template>
            

<script>
import firebase from "firebase";
import { db, booksRef, msgsRef } from "../main";
// import router from "../router";
// const booksRef = db.collection("books");
// const reservRef = db.collection("reservations");
export default {
  data: () => ({
    links: [
      { text: "Retour aux résultats de recherche", to: "/homeuser" },
      { text: "détails d'un livre", to: "" }
    ],
    myUser: [],
    commentaire: "",
    book: {},
    genre0: [],
    genre1: [],
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
    disponible: "",
    myComment: [],
    idBook: "",
    // for reserve (send message)
    allMessages: [],
    msgg: [],
    newMsg: {},
    nameRec: "",
    idRec: "",
    idmsg: "6JfI2xqVKYWnYkSMypaJ",
    confMsg: false,
    // juste for test commente
    items: [
      { header: "Today" },
      {
        note: 4,
        avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
        title: "Noémie P.",
        subtitle:
          "typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
      },
      { divider: true, inset: true },
      {
        note: 5,
        avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
        title: "Pierre-Marie G.",
        subtitle:
          "typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
      },
      { divider: true, inset: true },
      {
        note: 2,
        avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
        title: "Sylvie C.",
        subtitle:
          "typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
      },
      { divider: true, inset: true },
      {
        note: 3,
        avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
        title: "Sérge M.",
        subtitle:
          "typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
      },
      { divider: true, inset: true },
      {
        note: 1,
        avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
        title: "Bertrand A.",
        subtitle:
          "typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
      }
    ]
  }),

  created: function() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
        this.email = user.email;
        this.uid = this.user.uid;
      } else {
        this.user = null;
      }
    });
    this.getUser();
    this.getBook();
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
    getBook: function() {
      db.collection("books")
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            let mybook = doc.data();
            mybook.id = doc.id;

            if (mybook.id == this.$route.params.id) {
              this.book = mybook;
              this.genre0 = mybook.genre[0];
              this.genre1 = mybook.genre[1];
              this.idBook = mybook.id;

              this.nameRec = mybook.nameUser;
              this.idRec = mybook.idUser;
            }
          });
        });
      return this.book;
    },
    addComment: function(id) {
      this.idBook = id;
      const comment = {
        idUserComment: this.myUser.idUser,
        nameUserComment: this.myUser.name + this.myUser.fullName,
        comment: this.commentaire
      };

      this.myComment = this.book.commentaires;
      this.myComment.push(comment);

      // const post = {
      //   photo: this.book.photo,
      //   donateur: this.book.switch2,
      //   avis: this.book.avis,
      //   title: this.book.title,
      //   auteur: this.book.auteur,
      //   note: this.book.note,
      //   etats: this.book.etats,
      //   resume: this.book.resume,
      //   genre: this.book.genre,
      //   nameUser: this.book.nameUser,
      //   idUser: this.book.idUser,
      //   ville: this.book.ville,
      //   disponible: this.book.disponible,
      //   dateRetour: this.book.dateRetour,
      //   emprunteur: this.book.emprunteur,
      //   links: this.book.links,
      //   commentaires: this.myComment
      // };

      booksRef
        .doc(this.idBook)
        .update({ commentaires: this.myComment })
        .then(() => {
          console.log("success updating document: ");
        })
        .catch(error => {
          console.error("Error updating document: ", error);
        });
      this.commentaire = "";
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
          alert("Le livre a été ajouté dans vos favoris");
        })
        .catch(err => {
          console.log(err);
        });
    },

    // for reserve
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

    sendChat(book) {
      this.nameRec = book.nameUser;
      this.idRec = book.idUser;
      this.confMsg = true;
      setTimeout(() => {
        return (this.confMsg = false);
      }, 4000);
      setTimeout(() => {
        this.sendMessage();
      }, 1000);
    },

    sendMessage: function() {
      this.date = new Date().toISOString().substr(0, 19);
      this.getMyMessages();
      (this.newMsg = {
        nameEmeteur: this.email,
        nameRecepteur: this.nameRec,
        idEmeteur: this.myId,
        idRecepteur: this.idRec,
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
            console.log("votre message a été postuler avec succée!");
          })
          .catch(error => {
            console.error("Error lors denvois de message: ", error);
          });
      }, 1000);
      this.confMsg = true;
      setTimeout(() => {
        return (this.confMsg = false);
      }, 4000);
    }
  }
};
</script>