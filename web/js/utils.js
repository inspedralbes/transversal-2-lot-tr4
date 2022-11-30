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
  <div>
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
      </div>
      <br>
    </div>
    <div id = "ResultsPrint">
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
        this.contadorBuenas++;
        document.getElementById("ResultsPrint").innerHTML = "<p>Correct Answer</p>"
        document.getElementById("ResultsPrint").style.display="block"
        setTimeout(function () {document.getElementById("ResultsPrint").style.display="none"}, 3000)
      } else {
        this.contadorMalas++;
        document.getElementById("ResultsPrint").innerHTML = "<p>Incorrect Answer</p>";
        document.getElementById("ResultsPrint").style.display="block"
        setTimeout(function () {document.getElementById("ResultsPrint").style.display="none"}, 3000)
      }
      if (this.contadorBuenas + this.contadorMalas == 10) {
        document.getElementById("ResultsPrint").innerHTML = "<p>Your score is " + this.contadorBuenas + "/10</p>"
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
