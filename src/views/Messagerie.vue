<template>
<div class="message">
  <v-row>
    <!---------------- la liste des utilisateurs ------------------------->
    <v-col md="3" sm="4" xs="2">

  <v-card
    class="mx-auto"
    max-width="300"
    tile
  >
    <v-list shaped>
      <v-subheader>
        <v-text-field
            v-model="query"
            @keyup="search(query)"
            label="Rechercher une conversation..."
            prepend-icon="mdi-magnify"
            hide-details="auto"
            class="mb-4"
            color="orange"
          >
          </v-text-field>
      </v-subheader>
      <v-list-item-group
        v-model="selectedItem"
         color="orange"
      >
        <v-list-item
          v-for="(user, i) in users"
          :key="i"
          @click="showUser(i)"
         
          
        >
          <!-- <v-list-item-icon v-if="user.idUser != myId"> -->
             <v-list-item-icon>
           <v-avatar>
        <img
        src="https://cdn.vuetifyjs.com/images/john.jpg"
       >
     </v-avatar>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              {{user.name}} {{user.fullName}}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>

    </v-col>
    <!-- ---------------------------End la liste des utilisateurs------------------------ -->

     <!-- -----------------------la liste des messages-----------------------  -->
    <v-col md="6" sm="6" xs="4">
      <v-card class="text-center"  v-if="!nameChat">
        <h2>Sélectionner un utilisateur...</h2>
      </v-card>
     <v-card class="mx-auto" max-width="auto" v-if="nameChat">
<v-list v-for="myMessage in allMessages[0]" :key="myMessage.id">
  <v-list-item
                        class="mt-1"
                        :key="myMessage.id"
                        v-if="
                          (myMessage.idRecepteur == idChat &&
                            myMessage.idEmeteur == myId) ||
                            (myMessage.idEmeteur == idChat &&
                              myMessage.idRecepteur == myId)
                        "
                      >
        <v-snackbar v-if="myMessage.idRecepteur == idChat"
      :timeout="-1"
      :value="true"
      absolute
      right
      width="20"
      shaped
      class="mt-1 ml-16"
      top
      color="#2F0392"
    >
      {{ myMessage.msg }}
    </v-snackbar>
      <v-snackbar v-if="myMessage.idEmeteur == idChat"
      :timeout="-1"
      :value="true"
      absolute
      left
      shaped
      class="mt-1 mr-16"
      top
     color="grey"
    >
      {{ myMessage.msg }}
    </v-snackbar>
    </v-list-item>
</v-list>

            <!--------- --------- send message --------------------------------------->
            <v-form ref="form" class="mt-14">
              <v-container>
                <v-row>
                  <v-col md="10" sm="10" xs="12">
                    <v-text-field
                      label="Ecrivez un message..."
                      v-model="message"
                      @keyup.enter="sendChat"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col md="2" sm="2" xs="2">
                    <v-btn icon class="mt-5 ml-0" @click="sendChat">
                      <v-icon>mdi-send-outline</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
            <!--------- --------- End send message--------------------------------------->
          </v-card>
    </v-col>
     <!-- -----------------------End la liste des messages----------------------- -->

     <!-- -----------------------détails utilisateurs----------------------- -->
    <v-col md="3" sm="4" xs="2" >
      <v-card class="text-center" v-if="nameChat">
         <v-avatar class="mt-16 mb-4" >
        <img
        src="https://cdn.vuetifyjs.com/images/john.jpg"
        :alt="nameChat"
       >
     </v-avatar>
     <h2>{{ nameChat }}</h2>
     <v-btn  
        text
        class="mt-2 mb-10 text-capitalize"
      color="primary"
       link 
       to="/register">
        Voir le profil
        </v-btn>
      </v-card>
      <v-card v-if="nameChat">
          <v-list three-line>
        <v-list-item>
          <v-list-item-avatar>
            <v-icon color="orange" class="mt-2" x-large>mdi-flag</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title >
              Harry potter et cham...
            </v-list-item-title>
            
              <v-list-item-subtitle>Demande d'emprunt</v-list-item-subtitle>
          </v-list-item-content>
         
        </v-list-item>

        <v-list-item>
          <v-list-item-avatar>
            <v-icon color="green" class="mt-2" x-large>mdi-flag</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title >
              Nymphéas Noirs
            </v-list-item-title>
            
              <v-list-item-subtitle>A rendre le 10/04/2021</v-list-item-subtitle>
          </v-list-item-content>
         
        </v-list-item>
        <v-list-item>
          <v-list-item-avatar>
            <v-icon color="orange" class="mt-2" x-large>mdi-reply</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title >
              Notre-Dame de paris
            </v-list-item-title>
            
              <v-list-item-subtitle>Prét du livre à valider</v-list-item-subtitle>
          </v-list-item-content>
         
        </v-list-item>
        <v-list-item>
          <v-list-item-avatar>
            <v-icon color="green" class="mt-2" x-large>mdi-reply</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title >
              Les fleurs du mal
            </v-list-item-title>
            
              <v-list-item-subtitle>Retour le 03/04/2021</v-list-item-subtitle>
          </v-list-item-content>
         
        </v-list-item>
    </v-list>
        </v-card>
    </v-col>
    <!-- ----------------------- END détails utilisateurs----------------------- -->
  </v-row>
</div>
</template>
  
<script>
import firebase from "firebase";
import { db, msgsRef } from "../main";
//import router from "../router";
//const msgsRef = db.collection("messages");

export default {
  data: () => ({
    userAuth: null,
    emet: false,
    myName: "",
    myId: "",
    show: false,
    dialog: false,
    nameChat: "",
    idChat: "",
    message: "",
    msgg: [],
   
    query: "",
    newMsg: {},
    users: [],
    
    allMessage: [],
    allMessagesUser: [],
    allMessages: [],
    searchPerson: [],
   selectedItem: 1,
    idmsg: "6JfI2xqVKYWnYkSMypaJ",
    isActive: false
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

    this.getUsers();
  },

  methods: {
   
    getUsers: function() {
      db.collection("users")
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            let newUser = doc.data();
            newUser.id = doc.id;
            this.users.push(newUser);
          });
        });
    },

    showUser(i) {
      
      this.nameChat = this.users[i].name;
      this.idChat = this.users[i].idUser;
      this.myId = this.userAuth.uid;

      this.getMyMessages();
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

    sendChat: function() {
      this.date = new Date().toISOString().substr(0, 19);
      this.getMyMessages();
      (this.newMsg = {
        nameEmeteur: this.myName,
        nameRecepteur: this.nameChat,
        idEmeteur: this.myId,
        idRecepteur: this.idChat,
        msg: this.message,
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
            this.message = "";
          })
          .catch(error => {
            console.error("Error lors denvois de message: ", error);
          });
      }, 1000);
      
    },

   
    search(quer) {
      this.searchPerson = quer
        ? this.users.filter(user =>
            user.name.toLowerCase().includes(quer.toLowerCase())
          )
        : this.users;
      this.users = this.searchPerson;
    },

  },
  watch: {
    query: function(v) {
      if (v == "") {
        this.users = [];
        this.getUsers();
      }
    }
  },
  // computed: {
  //   allMessagess() {
  //     return _.orderBy(this.allMessages, "created");
  //   }
  // }
};
</script>
