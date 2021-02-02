<template>
  <div class="groupes">
    <v-row>
      <v-col md="3">
        <h1 class="ml-16">Mes Groupes</h1>
      </v-col>
      <v-col md="3">
        <v-btn large class="text-capitalize" text color="#2F0392">
          <v-icon class="mr-3" large>mdi-plus-box</v-icon>
          <h3>Créer un groupe</h3>
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="ml-13">
      <v-col md="2">
        <img
          src="https://img.etimg.com/thumb/msid-78274961,width-650,imgsize-1227902,,resizemode-4,quality-100/zynga-said-it-licensed-rights-from-the-game-unit-at-warner-bros-which-produced-the-potter-films-based-on-the-hit-books-by-jk-rowling-.jpg"
          height="140"
        />

        <h4>Potterheads de Lyon-city</h4>
      </v-col>
      <v-col md="2">
        <img
          height="140"
          width="185"
          src="https://tra.img.pmdstatic.net/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Fbin.2F2020.2F04.2F06.2F1ae1a3d0-4dc4-4cde-9d59-4ef1d1225b64.2Ejpeg/1200x630/quality/80/voici-les-films-et-series-star-wars-que-vous-pouvez-voir-sur-disney.jpg"
        />

        <h4>Team Piou-piou et vaisseaux qui explosent</h4>
      </v-col>
      <v-col md="2">
        <img
          src="http://www.cestenfrance.fr/wp-content/uploads/2018/06/69PlaceBellecour01.jpg"
          height="140"
        />

        <h4>Le coin lecture des Lyonnais</h4>
      </v-col>
      <v-col md="2">
        <img
          src="https://polar.zonelivre.fr/wp-content/uploads/2015/02/Stephen-King-photo-%C2%A9-Dick-Dickinson-.jpg"
          height="140"
        />

        <h4>Club Stephen King</h4>
      </v-col>
    </v-row>

    <v-divider color="#FEB546" class="mt-12 mb-12"></v-divider>

    <v-row class="ml-14">
      <v-col md="6" sm="12" xs="4">
        <v-row>
          <v-col md="10" sm="10" xs="10">
            <v-text-field label="Rechercher un groupe..."> </v-text-field>
          </v-col>
          <v-col md="2" sm="2" xs="2">
            <v-btn class=" ml-0 mr-2" color="#FEB546" x-large>
              <v-icon x-large color="white">mdi-magnify</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="ml-14" align="center">
      <v-col class="d-flex mt-3" md="2" sm="4" xs="4">
        <v-select :items="items" label="Trier par" dense solo></v-select>
      </v-col>
    </v-row>
    <!-- -------------------la listes des cards ---------------------------->
    <v-row class="ml-16">
      <v-card class="mb-6 mr-2">
        <v-row>
          <v-col md="2">
            <img
              class="mt-2 ml-2"
              src="https://www.sortiesdvd.com/itunesimages/film/13102.jpg"
              height="195"
              width="200"
            />
          </v-col>
          <v-col md="7" class="ml-5">
            <h1 class="mt-4">J'aime çeu les enquêtes</h1>
            <p>
              <v-icon>mdi-account-supervisor</v-icon> 253 membres . Groupe
              public
            </p>
            <p>
              Un petit groupe peuplé de mordus d'enquêtes policières. ici on
              aime se partager nos plus belles travailles litéraires et on vous
              guide dans vos listes de lecture !
            </p>
            <p>Dernière activité: il y a 9h</p>
          </v-col>
          <v-col md="2">
            <v-btn x-large class="ma-2 text-capitalize mt-12" outlined>
              Voir plus...
            </v-btn>
            <v-btn
              x-large
              class="ma-2 text-capitalize white--text"
              color="#2F0392"
            >
              <span class="ml-2 mr-2">Rejoindre</span>
            </v-btn>
          </v-col>
        </v-row>
      </v-card>

      <v-card class="mb-6 mr-2">
        <v-row>
          <v-col md="2">
            <img
              class="mt-2 ml-2"
              src="http://lepetitcoach.com/wp-content/uploads/2014/12/vivelavie.jpg"
              height="195"
              width="200"
            />
          </v-col>
          <v-col md="7" class="ml-5">
            <h1 class="mt-4">La vie c'est bien, la mort c'est pas ouf</h1>
            <p>
              <v-icon>mdi-account-supervisor</v-icon> 87 membres . Groupe privé
            </p>
            <p>
              Un groupe fait pour que les gens qui aiment la vie. les macabés
              peuvent faire ce qu'il veulent, mais nous sachez bien qu'il faut
              savoir qu'on vit.
            </p>
            <p>Dernière activité: il y a 1j</p>
          </v-col>
          <v-col md="2">
            <v-btn x-large class="ma-2 text-capitalize mt-12" outlined>
              Voir plus...
            </v-btn>
            <v-btn
              x-large
              class="ma-2 text-capitalize white--text"
              color="#2F0392"
            >
              <span class="ml-2 mr-2">Rejoindre</span>
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-row>
  </div>
</template>

<script>
export default {
  data: () => ({
    items: ["Croissant", "Décroissant", "Date"]
  })
};
</script>