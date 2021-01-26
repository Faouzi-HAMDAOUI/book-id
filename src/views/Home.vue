<template>
  <div class="home">
    <v-row color="grey lighten-4">
      <v-col md="6" sm="12" xs="12">
        <img
          height="350"
          src="https://www.carnets-de-traverse.com/blog/wp-content/uploads/2018/07/00-Blog-Voyage-Bibliotheque-Monde-Inspiration-954x477.jpg"
          alt=""
        />
      </v-col>
      <v-col md="6" sm="12" xs="12">
        <h1 class="ml-4 mt-4 mb-8">Baseligne cool qui vent réve</h1>
        <p class="ml-4  mb-5 mr-8">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum
        </p>
        <div class="text-center">
          <v-btn link to="/register" class="mr-4" rounded color="primary">
            S'inscrire
          </v-btn>
          <v-btn link to="/connexion" class="ml-4" rounded color="primary">
            Se connecter
          </v-btn>
        </div>
      </v-col>
    </v-row>

    <v-row class="text-center mb-12 ml-12 mt-12">
      <div class="text-center">
        <v-stepper v-model="e1">
          <div class="text-center">
            <h1>Concept</h1>
          </div>
          <v-stepper-items>
            <v-stepper-content
              v-for="n in steps"
              :key="`${n}-content`"
              :step="n"
            >
              <v-card width="1300px" class="mb-12" height="300px">
                <v-row>
                  <v-col md="6" sm="12" xs="12">
                    <img
                      class="mt-8"
                      height="230"
                      src="https://www.opodo.fr/blog/wp-content/uploads/sites/16/2015/07/shutterstock_546748369-min.jpg"
                      alt=""
                    />
                  </v-col>
                  <v-col md="6" sm="12" xs="12">
                    <h1 class="ml-4 mt-4 mb-8">Etape {{ n }}</h1>
                    <p class="ml-4  mb-5 mr-8">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book. It has survived not only five
                      centuries, but also the leap into electronic typesetting,
                      remaining essentially unchanged. It was popularised in the
                      1960s with the release of Letraset sheets containing Lorem
                      Ipsum passages, and more recently with desktop publishing
                      software like Aldus PageMaker including versions of Lorem
                      Ipsum
                    </p>
                  </v-col>
                </v-row>
              </v-card>

              <v-btn color="primary" @click="nextStep(n)">
                Continue
              </v-btn>

              <v-btn text @click="cancel">
                Cancel
              </v-btn>
            </v-stepper-content>
          </v-stepper-items>

          <v-stepper-header>
            <template v-for="n in steps">
              <v-stepper-step
                :key="`${n}-step`"
                :complete="e1 > n"
                :step="n"
                editable
              >
                Etape {{ n }}
              </v-stepper-step>

              <v-divider v-if="n !== steps" :key="n"></v-divider>
            </template>
          </v-stepper-header>
        </v-stepper>
      </div>
    </v-row>
    <v-row class="mb-16 mt-10"
      ><v-col md-4 class="text-center"></v-col>
      <v-col md-4 class="text-center"><h1>Fonctionalités</h1></v-col>
      <v-col md-4 class="text-center"></v-col>
    </v-row>
    <v-row color="grey lighten-1" class="text-center mb-12 ml-12 mt-12">
      <v-col md="4" sm="6" xs="12">
        <v-avatar color="grey lighten-1" size="100"> </v-avatar>
        <p class="text-center mt-6 ml-8 mr-8">
          galley of type and scrambled it to make a type specimen book. It has
          survived not only five centuries sheets containing Lorem Ipsum
          passages, and more
        </p>
      </v-col>
      <v-col md="4" sm="6" xs="12">
        <v-avatar color="grey lighten-1" size="100"> </v-avatar>
        <p class="text-center mt-6 ml-8 mr-8">
          galley of type and scrambled it to make a type specimen book. It has
          survived not only five centuries sheets containing Lorem Ipsum
          passages, and more
        </p>
      </v-col>
      <v-col md="4" sm="6" xs="12">
        <v-avatar color="grey lighten-1" size="100"> </v-avatar>
        <p class="text-center mt-6 ml-8 mr-8">
          galley of type and scrambled it to make a type specimen book. It has
          survived not only five centuries sheets containing Lorem Ipsum
          passages, and more
        </p>
      </v-col>
    </v-row>

    <template>
      <v-parallax
        height="350"
        src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"
      ></v-parallax>
    </template>
    <v-row class="mb-16 mt-16">
      <v-col md-6 class="text-center">
        <h1 class=" mt-12 mb-8">Titre de la section</h1>
        <p class="ml-10  mt-8 mr-10">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum
        </p>
      </v-col>
      <v-col md-6 class="text-center">
        <template>
          <v-hover v-slot="{ hover }">
            <v-card class="mx-auto" color="grey lighten-4" max-width="600">
              <v-img
                :aspect-ratio="16 / 9"
                src="https://cdn.vuetifyjs.com/images/cards/kitchen.png"
              >
                <v-expand-transition>
                  <div
                    v-if="hover"
                    class="d-flex transition-fast-in-fast-out orange darken-2 v-card--reveal display-3 white--text"
                    style="height: 100%;"
                  >
                    $14.99
                  </div>
                </v-expand-transition>
              </v-img>
              <v-card-text class="pt-6" style="position: relative;">
                <v-btn
                  absolute
                  color="orange"
                  class="white--text"
                  fab
                  large
                  right
                  top
                >
                  <v-icon>mdi-cart</v-icon>
                </v-btn>
                <div class="font-weight-light grey--text title mb-2">
                  For the perfect meal
                </div>
                <h3 class="display-1 font-weight-light orange--text mb-2">
                  QW cooking utensils
                </h3>
                <div class="font-weight-light title mb-2">
                  Our Vintage kitchen utensils delight any chef.<br />
                  Made of bamboo by hand
                </div>
              </v-card-text>
            </v-card>
          </v-hover>
        </template></v-col
      ></v-row
    >
  </div>
</template>
     

<script>
export default {
  data() {
    return {
      e1: 1,
      steps: 6
    };
  },

  watch: {
    steps(val) {
      if (this.e1 > val) {
        this.e1 = val;
      }
    }
  },

  methods: {
    nextStep(n) {
      if (n === this.steps) {
        this.e1 = 1;
      } else {
        this.e1 = n + 1;
      }
    },
    cancel() {
      this.e1 = 1;
    }
  }
};
</script>
<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
}
</style>
