const Home = Vue.component("home", {
  template: `<div class="loginSign">
  <p>Hello there this is the best trivial game ever created</p>
  
  
  
  </div>`,
});

const Profile = Vue.component("profile", {
  template: `<div>Perfil usuari</div>`,
});

const Partida = Vue.component("partida", {
  props: ["id-partida"],
  data: function () {
    return {
      preguntas: [],
      respuestas: [],
      contadorBuenas: 0,
      contadorRespuestas: 0,
      dificultad: "",
      categoria: "",
      empezado: false,
      acabado: false,
      dificultadVacia: false,
      idGame: 0,
      store: useLoginStore(),
    };
  },
  template: `
  <div>
    <div v-show="!empezado">
        <div class="Titulo">
            <br>
            <h4>Difficulty</h4>
            <br>
            <input type="radio" id="facil" value="easy" v-model="dificultad">
            <label for="facil">Easy</label>
            <br><br>
            <input type="radio" id="media" value="medium" v-model="dificultad">
            <label for="media">Medium</label>
            <br><br>
            <input type="radio" id="dificil" value="hard" v-model="dificultad">
            <label for="dificil">Hard</label>
            <br><br>
        </div>
        <div class="Titulo">
            <br>
            <h4>Category</h4>
            <br>
            <select v-model="categoria">
                <option value="arts_and_literature">Art & Literature</option>
                <option value="film_and_tv">TV shows & Films</option>
                <option value="food_and_drink">Drinks & Foods</option>
                <option value="general_knowledge">General Knowlegde</option>
                <option value="geography">Geography</option>
                <option value="history">History</option>
                <option value="music">Music</option>
                <option value="science">Science</option>
                <option value="society_and_culture">Culture & Society</option>
                <option value="sports_and_leisure">Entertainment & Sports</option>
            </select><br><br><br>
        </div>
        <div class="buttonPlayDiv">
            <b-button class="buttonPlay" @click="jugar" variant="success">Play</b-button>
        </div>
        <br>
        <div class="buttonPlay" v-show="dificultadVacia">Error! You need to choose a difficulty !</div>
    </div>
    <div class="b-slider" v-show="!acabado">
        <div class="slider">
            <div class="slides">
                <div :id="'slide-' + (index)" v-for="(pregunta, index) in preguntas">
                    <div class="container">
                        <div class="Pregunta">
                            <div v-show="categoria == ''">Category: {{pregunta.category}}<br></div>
                            Question {{index + 1}}:<br>
                            {{pregunta.question}}
                        </div>
                        <br><br><br>
                        <div class="Respuesta-1"
                            v-on:click.once="comprovaResultats('Resposta1-'+(index), pregunta.correctAnswer, index), delay('#slide-' + (index + 1))">
                            <a class="button" :id="'Resposta1-' + (index)"
                                 >{{respuestas[index][0]}}</a>
                        </div>
                        <div class="Respuesta-2"
                            v-on:click.once="comprovaResultats('Resposta2-'+(index), pregunta.correctAnswer, index), delay('#slide-' + (index + 1))">
                            <a class="button" :id="'Resposta2-' + (index)">{{respuestas[index][1]}}</a>
                        </div>
                        <div class="Respuesta-3"
                            v-on:click.once="comprovaResultats('Resposta3-'+(index), pregunta.correctAnswer, index), delay('#slide-' + (index + 1))">
                            <a class="button" :id="'Resposta3-' + (index)">{{respuestas[index][2]}}</a>
                        </div>
                        <div class="Respuesta-4"
                            v-on:click.once="comprovaResultats('Resposta4-'+(index), pregunta.correctAnswer, index), delay('#slide-' + (index + 1))">
                            <a class="button" :id="'Resposta4-' + (index)">{{respuestas[index][3]}}</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="resultsPrint">
    </div>
    <div id="scorePrint" class="scorePrint">
    </div>
    <div v-show="empezado">
        <table>
            <tr>
                <td>1</td>
                <td>2</td>
                <td>3</td>
                <td>4</td>
                <td>5</td>
                <td>6</td>
                <td>7</td>
                <td>8</td>
                <td>9</td>
                <td>10</td>
            </tr>
            <tr>
                <td id="pregunta0"></td>
                <td id="pregunta1"></td>
                <td id="pregunta2"></td>
                <td id="pregunta3"></td>
                <td id="pregunta4"></td>
                <td id="pregunta5"></td>
                <td id="pregunta6"></td>
                <td id="pregunta7"></td>
                <td id="pregunta8"></td>
                <td id="pregunta9"></td>
            </tr>
        </table>
    </div>
  </div>`,
  methods: {
    delay(URL) {
      setTimeout(function () {
        window.location = URL;
      }, 2000);
    },
    resetDades() {
      this.preguntas = [];
      this.respuestas = [];
      this.contadorBuenas = 0;
      this.contadorRespuestas = 0;
      this.dificultad = "";
      this.categoria = "";
      this.empezado = false;
      this.acabado = false;
      this.dificultadVacia = false;
      this.idGame = 0;
    },
    jugar() {
      let categoriaF = "";

      if (this.categoria != "") {
        categoriaF = "categories=" + this.categoria + "&";
      }

      if (this.dificultad == "") {
        this.dificultadVacia = true;
      } else {
        let url = `https://the-trivia-api.com/api/questions?${categoriaF}limit=10&difficulty=${this.dificultad}`;
        fetch(url)
          .then((response) => response.json())
          .then((data) => {
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
            this.empezado = true;
            if (this.store.logged) {
              let datosEnvio = new FormData();
              datosEnvio.append("difficulty", this.dificultad);
              datosEnvio.append("category", this.categoria);
              datosEnvio.append("json", JSON.stringify(this.preguntas));

              this.enviarDades(datosEnvio);
            }
          });
      }
    },
    enviarDades(datosPregunta) {
      fetch("./trivia4-app/public/api/setDadesPartida", {
        method: "POST",
        body: datosPregunta,
      })
        .then((response) => response.json())
        .then((data) => {
          this.idGame = data;
        });
    },
    comprovaResultats: function (respuestaUser, respuestaCorrecta, idPregunta) {
      let respuesta = document.getElementById(respuestaUser).innerHTML;
      let pregunta = document.getElementById("pregunta" + idPregunta);
      if (!this.acabado) {
        if (respuesta == respuestaCorrecta) {
          pregunta.classList.add("correctAnswer");
          this.contadorBuenas++;
        } else {
          pregunta.classList.add("incorrectAnswer");
          document.getElementById(
            "resultsPrint"
          ).innerHTML = `<p>Incorrect Answer<br>Correct answer is: ${respuestaCorrecta}</p>`;
          document.getElementById("resultsPrint").style.display = "block";
          setTimeout(function () {
            document.getElementById("resultsPrint").style.display = "none";
          }, 2000);
        }
        this.contadorRespuestas++;
      }

      if (this.contadorRespuestas == 10) {
        this.acabado = true;

        document.getElementById(
          "scorePrint"
        ).innerHTML = `<p>Your score is ${this.contadorBuenas}/${this.contadorRespuestas}</p>`;
        if (this.store.logged) {
          this.enviarDadesPartidaJugador();
        }
      }
    },
    shuffleRespostes: function () {
      this.respuestas.forEach((array) => {
        for (var i = array.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var temp = array[i];
          array[i] = array[j];
          array[j] = temp;
        }
      });
    },
    enviarDadesPartidaJugador: function () {
      let datosEnvio = new FormData();
      datosEnvio.append("id_player", useLoginStore().getIdPlayer());
      datosEnvio.append("id_game", this.idGame);
      datosEnvio.append("score", this.contadorBuenas);
      fetch("./trivia4-app/public/api/storeGameXPlayer", {
        method: "POST",
        body: datosEnvio,
      });
    },
  },
});

const Partides = Vue.component("historial", {
  props: ["url"],
  data: function () {
    return {
      partidas: [],
      idPlayer: useLoginStore().getIdPlayer(),
      player_name: useLoginStore().getPlayerName(),
    };
  },
  template: `
  <div>
    <h1 v-show="idPlayer == 0">No has iniciat sessió!</h1>
    <h1 v-show="partidas.length == 0 && idPlayer != 0">No hay partidas!</h1>

    <div v-show="idPlayer != 0">
        <h1>Partides de l'usuari: {{player_name}}</h1>
        <div v-for="partida in partidas">
            <h1>{{partida.id}}</h1>
            <li>Game: {{partida.id_game}}</li>
            <li>Score: {{partida.score}}</li>
            <li>Date: {{partida.date}}</li>
        </div>
    </div>
  </div>`,
  mounted: function () {
    if (this.idPlayer != 0) {
      url = "./trivia4-app/public/api/getPartidesUsuari/" + this.idPlayer;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          this.partidas = data;
        });
    }
  },
});

const totesLesPartides = Vue.component("historial-general", {
  props: ["url"],
  data: function () {
    return {
      partidas: [],
      idPlayer: useLoginStore().getIdPlayer(),
      player_name: useLoginStore().getPlayerName(),
    };
  },
  template: `
  <div>
    <h1 v-show="idPlayer == 0">No has iniciat sessió!</h1>
    <h1 v-show="partidas.length == 0 && idPlayer != 0">No hay partidas!</h1>

    <div v-show="idPlayer != 0">
        <div v-for="partida in partidas">
            <h1>{{partida.id}}</h1>
            <li>Game: {{partida.id_game}}</li>
            <li>Score: {{partida.score}}</li>
            <li>Date: {{partida.date}}</li>
            <router-link to="/joc" class="routerlink" id-partida=partida.id_game>Play a game</router-link>
        </div>
        <router-view></router-view>
    </div>
  </div>
  `,
  mounted: function () {
    if (this.idPlayer != 0) {
      url = "./trivia4-app/public/api/getPartides";
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          this.partidas = data;
        });
    }
  },
});

const Registre = Vue.component("registre-player", {
  data: function () {
    return {
      form: {
        name: "",
        surname: "",
        nickname: "",
        mail: "",
        psswd: "",
      },
      procesando: false,
    };
  },
  template: `
  <div class="loginSign">
    <br>
    <h2>Register</h2>
    <b-col sm="5" class="mx-auto">
      <b-form-input v-model="form.name" placeholder="Nom" class="m-3" required></b-form-input>
      <b-form-input v-model="form.surname" placeholder="Cognom" class="m-3" required></b-form-input>
      <b-form-input v-model="form.nickname" placeholder="Nom d'usuari" class="m-3" required></b-form-input>
      <b-form-input v-model="form.mail" placeholder="Correu" class="m-3" required></b-form-input>
      <b-form-input v-model="form.psswd" placeholder="Password" class="m-3" required></b-form-input>
    </b-col>
    <b-button @click="submitRegister" variant="primary">Register <b-spinner v-show="procesando" small type="grow">
        </b-spinner>
    </b-button>
  </div>
  `,
  methods: {
    submitRegister() {
      this.procesando = true;

      let datosEnvio = new FormData();
      datosEnvio.append("name", this.form.name);
      datosEnvio.append("surname", this.form.surname);
      datosEnvio.append("mail", this.form.mail);
      datosEnvio.append("nickname", this.form.nickname);
      datosEnvio.append("psswd", this.form.psswd);

      fetch(`./trivia4-app/public/api/setDadesPlayer`, {
        method: "POST",
        body: datosEnvio,
      });
      this.procesando = false;
    },
  },
});

const Login = Vue.component("login", {
  data: function () {
    return {
      idPlayer: useLoginStore().getIdPlayer(),
      player_name: useLoginStore().getPlayerName(),
    };
  },
  template: `
  <div class="loginSign">
      <div v-show="!logged">
        <br>
        <h2>LOG IN</h2>
        <b-col sm="5" class="mx-auto">
          <b-form-input v-model="form.nickname" placeholder="Nickname" class="m-3" required></b-form-input>
          <b-form-input v-model="form.psswd" type="password" placeholder="Password" class="m-3" required></b-form-input>
        </b-col>
        <b-button @click="submitLogin" variant="primary">Login <b-spinner v-show="procesando" small type="grow">
            </b-spinner>
        </b-button>
      </div>
      <div v-show="logged">
          Bienvenido {{infoLogin.nombre}}<br>
          <img :src="infoLogin.imagen"></img><br>
      </div>
  </div>`,
  data: function () {
    return {
      form: {
        nickname: "",
        psswd: "",
      },
      infoLogin: {
        nombre: "",
        imagen: "",
        id: "",
      },
      logged: false,
      procesando: false,
      store: useLoginStore(),
    };
  },
  methods: {
    submitLogin() {
      this.procesando = true;

      let datosEnvio = new FormData();
      datosEnvio.append("nickname", this.form.nickname);
      datosEnvio.append("psswd", this.form.psswd);

      fetch(`./trivia4-app/public/api/getDadesPlayer`, {
        method: "POST",
        body: datosEnvio,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data[0]) {
            this.infoLogin.nombre = data[1].nickname;
            this.infoLogin.id = data[1].id;
            this.logged = true;
            this.store.login();
            this.store.setIdPlayer(data[1].id);
            this.store.setPlayerName(data[1].nickname);
          }
          this.procesando = false;
        });
    },
  },
});

Vue.component("navbar-router", {
  data: function () {
    return {
      store: useLoginStore(),
    };
  },
  template: `
  <ul id="navbar">
    <li><router-link to="/" class="routerlink">Home</router-link></li>
    <li><router-link to="/joc" class="routerlink">Play a game</router-link></li>
    <li><router-link to="/totesLesPartides" class="routerlink" v-show="store.logged">All games</router-link></li>
    <li><router-link to="/partidesGuardades" class="routerlink" v-show="store.logged">Game history</router-link></li>
    <li><router-link to="/registre" class="routerlink rightNav activeSign" v-show="!store.logged">Sign up</router-link></li>
    <li><router-link to="/login" class="routerlink rightNav" v-show="!store.logged">Log in</router-link></li>
    <li><b-button @click="logOut" class="routerlink rightNav" variant="primary" v-show="store.logged">Logout</b-button></li>
    <li><router-link to="/profile" class="routerlink rightNav" v-show="store.logged">Profile</router-link></li>
    <li><h3 class="routerlink rightNav">{{store.name_player}}</h3></li>
  </ul>
  `,
  methods: {
    logOut() {
      useLoginStore().logout();
    },
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
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/partidesGuardades",
    component: Partides,
  },
  {
    path: "/registre",
    component: Registre,
  },
  {
    path: "/totesLesPartides",
    component: totesLesPartides,
  },
];

// 3. Create the router instance and pass the `routes` option
const router = new VueRouter({
  routes, // short for `routes: routes`
});

const useLoginStore = Pinia.defineStore("loggedSession", {
  state() {
    return {
      logged: false,
      id_player: 0,
      name_player: "",
    };
  },
  actions: {
    login(state) {
      this.logged = true;
    },
    logout(state) {
      this.logged = false;
      this.id_player = 0;
      this.name_player = "";
    },
    setIdPlayer(id) {
      this.id_player = id;
    },
    getIdPlayer() {
      return this.id_player;
    },
    setPlayerName(name) {
      this.name_player = name;
    },
    getPlayerName() {
      return this.name_player;
    },
  },
});

Vue.use(Pinia.PiniaVuePlugin);
Vue.use(BootstrapVue);

let app = new Vue({
  el: "#app",
  router,
  pinia: Pinia.createPinia(),
  computed: {
    //Necesario para que funcione pinia
    ...Pinia.mapState(useLoginStore, ["logged"]),
  },
  methods: {
    //Necesario para que funcione pinia
    ...Pinia.mapActions(useLoginStore, ["login"]),
    ...Pinia.mapActions(useLoginStore, ["logout"]),
  },
});
