import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/navbar",
        name: "Navbar",
        component: () =>
            import ("../views/Navbar.vue"),
    },
    {
        path: "/navbarUser",
        name: "NavbarUser",
        component: () =>
            import ("../views/NavbarUser.vue"),
    },
    {
        path: "/homeuser",
        name: "Homeuser",
        component: () =>
            import ("../views/Homeuser.vue"),
    },
    {
        path: "/connexion",
        name: "Connexion",
        component: () =>
            import ("../views/Connexion.vue"),
    },
    {
        path: "/register",
        name: "Register",
        component: () =>
            import ("../views/Register.vue"),
    },

    {
        path: "/register2",
        name: "Register2",
        component: () =>
            import ("../views/Register2.vue"),
    },
    {
        path: "/decouvrir",
        name: "Decouvrir",
        component: () =>
            import ("../views/Decouvrir.vue"),
    },
    {
        path: "/favoris",
        name: "Favoris",
        component: () =>
            import ("../views/Favoris.vue"),
    },
    {
        path: "/groupes",
        name: "Groupes",
        component: () =>
            import ("../views/Groupes.vue"),
    },
    {
        path: "/maBiblioteque",
        name: "MaBiblioteque",
        component: () =>
            import ("../views/MaBiblioteque.vue"),
    },
    {
        path: "/Messagerie",
        name: "Messagerie",
        component: () =>
            import ("../views/Messagerie.vue"),
    },
    {
        path: "/reservations",
        name: "Reservations",
        component: () =>
            import ("../views/Reservations.vue"),
    },
    {
        path: "/ajouterLivre",
        name: "AjouterLivre",
        component: () =>
            import ("../views/AjouterLivre.vue"),
    },
    {
        path: "/book/:id",
        name: "Book",
        component: () =>
            import ("../views/Book.vue"),
    },
    {
        path: "/br",
        name: "br",
        component: () =>
            import ("../views/br.vue"),
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router