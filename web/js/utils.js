const Home = Vue.component("home", {
  template: `<div>hola</div>`,
});

const Partida = Vue.component("partida", {
  data: function () {
    return {
      datos: [],
    };
  },
  template: `
  <div class="slider">
    <div class="slides" v-for="dada in datos">
        <div id="slide-1">
            <div class="container" >
                <div class="Pregunta">
                {{dada.question}}
                </div>
                <div class="Respuesta-1 incorrecta">
                    <a href="#slide-2">{{dada.incorrectAnswers[0]}}</a>
                </div>
                <div class="Respuesta-2 correcta">
                    <a href="#slide-2">{{dada.correctAnswer}}</a>
                </div>
                <div class="Respuesta-3 incorrecta">
                    <a href="#slide-2">{{dada.incorrectAnswers[1]}}</a>
                </div>
                <div class="Respuesta-4 incorrecta">
                    <a href="#slide-2">{{dada.incorrectAnswers[2]}}</a>
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
  methods: {},
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
