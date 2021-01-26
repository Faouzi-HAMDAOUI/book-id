
<template>
  <div class="ajouterLivre">
    <!--  --------------------------- Add Books --------------------------- -->
    <v-row class="mt-3 mb-3" justify="center">
      <v-card width="1000">
        <v-card-text>
          <v-container>
            <v-row dense>
              <v-col md="4" sm="12" xs="12">
                <v-img height="300" :src="img1" @click="click1"></v-img>
                <v-spacer></v-spacer>
                <input
                  type="file"
                  ref="input1"
                  style="display: none"
                  @change="previewImage"
                  accept="image/*"
                />
                <v-fab-transition>
              <v-btn
                class="mt-16 ml-8"
                color="white"
                dark
                small
                @click="click1"
                absolute
                top
                left
                fab
              >
                <v-icon color="orange">mdi-pencil</v-icon>
              </v-btn>
            </v-fab-transition>
              </v-col>

              <v-col md="8" sm="12" xs="12">
                <label><h2>Titre*</h2></label>
                <v-text-field
                  v-model="title"
                  label="Ajouter un titre..."
                  filled
                  hint="penser a un titre court!"
                ></v-text-field>
                <label><h2>Auteur*</h2></label>
                <v-text-field
                  v-model="auteur"
                  label="Ajouter un auteur..."
                  filled
                  hint="penser a un titre court!"
                ></v-text-field>
                <label><h2>Genre*</h2></label>
                <v-combobox
                  v-model="genre"
                  :items="genres"
                  filled
                  chips
                  clearable
                  multiple
                >
                  <template
                    v-slot:selection="{ attrs, item, select, selected }"
                  >
                    <v-chip
                      v-bind="attrs"
                      :input-value="selected"
                      close
                      color="#FEB546"
                      @click="select"
                      @click:close="remove(item)"
                    >
                      <strong >{{ item }}</strong
                      >&nbsp;
                     
                    </v-chip>
                  </template>
                </v-combobox>
              </v-col>

              <template>
                <v-container fluid>
                  <label><h2>Résumé*</h2></label>
                  <v-textarea
                    v-model="resume"
                    clearable
                    filled
                    clear-icon="mdi-close-circle"
                    label="Ajouter un résumé..."
                  ></v-textarea>
                </v-container>
              </template>
            </v-row>
            <v-row dense>
              <v-col  md="6" sm="12" xs="12">
                <label ><h2 class="mb-2 ml-4">Etat du livre</h2></label>
                <v-select
                class="ml-3"
                  v-model="etats"
                  :items="items"
                  filled
                  label="Sléctionné un Etat"
                ></v-select>
              </v-col>

              <v-col  md="6" sm="12" xs="12">
                <label ><h2 class="ml-10">Donner une note</h2></label>
                <v-rating class="ml-6" color="#FEB546"  background-color="grey lighten-1" filled v-model="note" hover length="5" size="50"></v-rating>
              </v-col>
            </v-row>
            <template>
              <v-container  fluid>
                <label><h2 class="mb-2">Mon avis sur le livre</h2></label>
                <v-textarea
                  v-model="avis"
                  clearable
                  filled
                  clear-icon="mdi-close-circle"
                  label="Mon avis personnel..."
                ></v-textarea>
              </v-container>
            </template>
            <v-sheet filled width="100%" height="100%" class="pa-12">
              <h2>Don du livre</h2>
              <v-switch
                v-model="switch2"
                flat
                label="Je souhaite donner mon livre"
              ></v-switch>
            </v-sheet>
          </v-container>

          <small>*indique un champ obligatoire!</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="text-capitalize" >
            Annuler
          </v-btn>
          <v-btn color="#2F0392" class="white--text text-capitalize mr-10" @click="create">
            Valider
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-row>

    <!--  --------------------------- End Add Books --------------------------- -->

    <!--  --------------------------- confirm message --------------------------- -->
<v-row justify="center">
    <v-dialog
      v-model="confMsg"
      persistent
     max-width="500px"
    >
      
  <v-card
   max-width="500px" 
  >
    <v-toolbar
      color="light-green darken-1"
      dark
    >
      <v-toolbar-title>Confirmation</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon
      @click="confMsg = false"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>

          <div class="text-center">
           <h2> votre livre à été ajouter avec succès!</h2>
         </div>
    
  </v-card>

    </v-dialog>
  </v-row>
<!--  --------------------------- End confirm message --------------------------- -->
  </div>
</template>
<script>
import firebase from "firebase";
import { db } from "../main";
export default {
  data: () => ({
    confMsg: false,
    myUser: [],
    genre: ["Science-fiction"],
    genres: ["Drame", "Fantastique", "Romance", "Policier","Science-fiction"],
    items: ["Bonne", "Trés bonne", "Moyenne", "Pas térrible"],
    img1: "https://via.placeholder.com/300",
    avis: "",
    title: "",
    auteur: "",
    note: 0,
    resume: "",
    etats: "",
    switch2: false,
    ville: "",
    idUser: "",
    nameUser: "",
    disponible: "disponible",

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
    remove(item) {
      this.genre.splice(this.genre.indexOf(item), 1);
      this.genre = [...this.genre];
    },
    create() {
      const post = {
        photo: this.img1,
        donateur: this.switch2,
        avis: this.avis,
        title: this.title,
        auteur: this.auteur,
        note: this.note,
        etats: this.etats,
        resume: this.resume,
        genre: this.genre,
        nameUser: this.myUser[0].name,
        idUser: this.myUser[0].idUser,
        ville: this.myUser[0].ville,
        disponible: this.disponible,
        dateRetour: "",
        emprunteur: "",
        links: [],
        commentaires: []
      };
      db.collection("books")
        .add(post)
        .then(response => {
          console.log(response);
          this.confMsg = true;

           setTimeout(() => {
              return (this.confMsg = false);
           }, 4000);
          (this.avis = ""),
            (this.title = ""),
            (this.auteur = ""),
            (this.note = 0),
            (this.resume = ""),
            (this.etats = ""),
            (this.img1 = "https://via.placeholder.com/300"),
            (this.switch2 = false);
        })
        .catch(err => {
          console.log(err);
        });
    },
    click1() {
      this.$refs.input1.click();
    },

    previewImage(event) {
      this.uploadValue = 0;
      this.img1 = null;
      this.imageData = event.target.files[0];
      this.onUpload();
    },

    onUpload() {
      this.img1 = null;
      const storageRef = firebase
        .storage()
        .ref(`${this.imageData.name}`)
        .put(this.imageData);
      storageRef.on(
        `state_changed`,
        snapshot => {
          this.uploadValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        error => {
          console.log(error.message);
        },
        () => {
          this.uploadValue = 100;
          storageRef.snapshot.ref.getDownloadURL().then(url => {
            this.img1 = url;
            console.log(this.img1);
          });
        }
      );
    }
  }
};
</script>


