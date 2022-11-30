const Home = Vue.component("home", {
  template: `<div>hola</div>`,
});

const Partida = Vue.component("partida", {
  data: function () {
    return {
      preguntas: [],
      respuestas: [],
      contadorBuenas: 0,
      contadorMalas: 0,
    };
  },
  template: `
    <div class="b-slider">
      <div class="slider"> 
        <div class="slides">
            <div :id="'slide-' + (index)" v-for="(pregunta, index) in preguntas">
                <div class="container" >
                    <div class="Pregunta">
                    {{pregunta.question}}
                    </div>
                    <div class="Respuesta-1" v-on:click="comprovaResultats('Resposta1-'+(index), pregunta.correctAnswer)">
                        <a :id="'Resposta1-' + (index)" :href="'#slide-' + (index + 1)">{{respuestas[index][0]}}</a>
                    </div>
                    <div class="Respuesta-2" v-on:click="comprovaResultats('Resposta2-'+(index), pregunta.correctAnswer)">
                        <a :id="'Resposta2-' + (index)" :href="'#slide-' + (index + 1)">{{respuestas[index][1]}}</a>
                    </div>
                    <div class="Respuesta-3" v-on:click="comprovaResultats('Resposta3-'+(index), pregunta.correctAnswer)">
                        <a :id="'Resposta3-' + (index)" :href="'#slide-' + (index + 1)">{{respuestas[index][2]}}</a>
                    </div>
                    <div class="Respuesta-4" v-on:click="comprovaResultats('Resposta4-'+(index), pregunta.correctAnswer)">
                        <a :id="'Resposta4-' + (index)" :href="'#slide-' + (index + 1)">{{respuestas[index][3]}}</a>
                    </div>
                </div>
            </div>
        </div>
    </div>`,
  mounted: function () {
    let url =
      `https://the-trivia-api.com/api/questions?categories=${this.categoria}&limit=10&difficulty=${this.dificultad}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.preguntas = data;
        data.forEach((question) => {
            let pregunta = [];
            
          question.incorrectAnswers.forEach((respostes) => {
            pregunta.push(respostes);
          });
          pregunta.push(question.correctAnswer);
          this.respuestas.push(pregunta);
        });

        this.shuffleRespostes();
        console.log(this.respuestas);
      });
  },
  methods: {
    comprovaResultats: function (respuestaUser, respuestaCorrecta) {
      let respuesta = document.getElementById(respuestaUser).innerHTML;
      console.log(respuesta);
      console.log(respuestaCorrecta);
      if (respuesta == respuestaCorrecta) {
        alert("RESPUESTA CORRECTA");
        this.contadorBuenas++;
        console.log(this.contadorBuenas);
      } else {
        alert("RESPUESTA INCORRECTA");
        this.contadorMalas++;
        console.log(this.contadorMalas);
      }
      if (this.contadorBuenas + this.contadorMalas == 10) {
        alert("La teva puntuacio es " + this.contadorBuenas + "/10");
      }
    },
    shuffleRespostes: function() {
        this.respuestas.forEach(array => {
            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
        });
    },
    comprovaSiEsRespostaCorrecta: function() {
        
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
