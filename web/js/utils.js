const Home = Vue.component("home", {
  template: `<div>hola</div>`,
});

const Partida = Vue.component("partida", {
  data: function () {
    return {
      datos: [],
      contadorBuenas: 0,
      contadorMalas: 0,
    };
  },
  template: `
  <div class="b-slider">
    <div class="slider"> 
      <div class="slides">
          <div :id="'slide-' + (index)" v-for="(dada, index) in datos">
              <div class="container" >
                  <div class="Pregunta">
                  {{dada.question}}
                  </div>
                  <div class="Respuesta-1 incorrecta" v-on:click="comprovaResultats('Resposta1-'+(index), dada.correctAnswer)">
                      <a :id="'Resposta1-' + (index)" :href="'#slide-' + (index + 1)">{{dada.incorrectAnswers[0]}}</a>
                  </div>
                  <div class="Respuesta-2 correcta" v-on:click="comprovaResultats('Resposta2-'+(index), dada.correctAnswer)">
                      <a :id="'Resposta2-' + (index)" :href="'#slide-' + (index + 1)">{{dada.correctAnswer}}</a>
                  </div>
                  <div class="Respuesta-3 incorrecta" v-on:click="comprovaResultats('Resposta3-'+(index), dada.correctAnswer)">
                      <a :id="'Resposta3-' + (index)" :href="'#slide-' + (index + 1)">{{dada.incorrectAnswers[1]}}</a>
                  </div>
                  <div class="Respuesta-4 incorrecta" v-on:click="comprovaResultats('Resposta4-'+(index), dada.correctAnswer)">
                      <a :id="'Resposta4-' + (index)" :href="'#slide-' + (index + 1)">{{dada.incorrectAnswers[2]}}</a>
                  </div>
              </div>
          </div>
      </div>
  </div>`,
  mounted: function () {
    let url =
      "https://the-trivia-api.com/api/questions?limit=10&difficulty=hard";
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.datos = data;
      });
  },
  methods: {
    comprovaResultats: function (respuestaUser, respuestaCorrecta) {
      let respuesta = document.getElementById(respuestaUser).innerHTML;
      if (respuesta == respuestaCorrecta) {
        alert("RESPUESTA CORRECTA")
        this.contadorBuenas++;
      } else {
        alert("RESPUESTA INCORRECTA")
        this.contadorMalas++;
        console.log(this.contadorMalas)
      } 
      if (this.contadorBuenas + this.contadorMalas == 10) {
        alert("La teva puntuacio es " + this.contadorBuenas + "/10");
      }      
    }
  },
});

// =============== Routes ===============
const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/joc",
    component: Partida,
  },
];

// 3. Create the router instance and pass the `routes` option
const router = new VueRouter({
  routes, // short for `routes: routes`
});

let app = new Vue({
  el: "#app",
  router,
});
