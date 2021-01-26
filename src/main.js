import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import * as firebase from "firebase";
import "firebase/firestore";
import { firestorePlugin } from "vuefire";
import VueFilterDateParse from "@vuejs-community/vue-filter-date-parse";
import Vue2Filters from "vue2-filters";
import store from "store";

Vue.use(Vue2Filters);
Vue.use(firestorePlugin);
Vue.use(VueFilterDateParse);
Vue.config.productionTip = false;

const firebaseConfig = {
    apiKey: "AIzaSyAx1pGFin7OMwiK05Ig4zUghl4asGG7MPg",
    authDomain: "book-id-5d222.firebaseapp.com",
    projectId: "book-id-5d222",
    storageBucket: "book-id-5d222.appspot.com",
    messagingSenderId: "550807298345",
    appId: "1:550807298345:web:ab768c553bbc97066f5738",
};

// Initialize Firebase
//const firebaseApp = firebase.default.initializeApp(firebaseConfig);
//firebase.auth().StateChanged();
//export const db = firebaseApp;

// export const msgsRef = db.collection("messages");
const firebaseApp = firebase.default.initializeApp(firebaseConfig);
export const db = firebaseApp.firestore();
export const msgsRef = db.collection("messages");
export const booksRef = db.collection("books");
export const favorisRef = db.collection("favoris");

Vue.prototype.$db = db;

Vue.filter("getName", function(name) {
    return name.split("@")[0];
});

new Vue({
    router,
    vuetify,
    store,
    render: (h) => h(App),
}).$mount("#app");