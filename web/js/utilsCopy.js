const Home = Vue.component("home", {
  template: `<div class="loginSign">
    <div class="menu">
      <div class="news">
      <br>
        <p>Welcome to League of Trivia. This is the first update of the game, so stay stunned for more news in the future!</p>
      </div>
      <div class="inspedralbes">
        <p>Aqui la pagina del instituto para el cual se entrega este juegazo</p>
        <br>
        <img src="img/LogoPedralbes.png" alt="Logo Pedralbes">
      </div>
      <div class="fotoquiz">
        <img src="img/quiz_invi.png" alt="Quiz Foto">
      </div>
      <div class="extra">
        <p>In this extra part we will be informing about other things to our players!</p>
      </div>
    </div>
  </div>`,
});

const Partida = Vue.component("partida", {
  props: ["gotdPROP"],
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
      countDown: 20,
    };
  },
  template:
    `
    <div>
        <div v-show="!empezado">
          <h2 class="Pregunta">Difficulty</h2>
            <div class="container_dificultad">
                <div class="selector row">
                    <div class="col">
                        <input type="radio" name="selector" class="selector-item_radio" id="facil" value="easy"
                            v-model="dificultad">
                        <label for="facil" class="selector-item_label">Easy</label>
                    </div>
                    <div class="col">
                        <input type="radio" name="selector" class="selector-item_radio" id="media" value="medium"
                            v-model="dificultad">
                        <label for="media" class="selector-item_label">Medium</label>
                    </div>
                    <div class="col">
                        <input type="radio" name="selector" class="selector-item_radio" id="dificil" value="hard"
                            v-model="dificultad">
                        <label for="dificil" class="selector-item_label">Hard</label>
                    </div>
                </div>
            </div>
            <h2 class="Pregunta">Category</h2>
            <div class="container_categoria">
                <div class="selector row">
                    <div class="col-6">
                        <input type="radio" name="selector_categoria" class="selector-item_radio" id="arts_and_literature"
                            value="arts_and_literature" v-model="categoria">
                        <label for="arts_and_literature" class="selector-item_label">Art& Literature</label>
                    </div>
                    <div class="col-6">
                        <input type="radio" name="selector_categoria" class="selector-item_radio" id="film_and_tv"
                            value="film_and_tv" v-model="categoria">
                        <label for="film_and_tv" class="selector-item_label">TV shows & Films</label>
                    </div>
                    <div class="col-6">
                        <input type="radio" name="selector_categoria" class="selector-item_radio" id="food_and_drink"
                            value="food_and_drink" v-model="categoria">
                        <label for="food_and_drink" class="selector-item_label">Drinks & Foods</label>
                    </div>
                    <div class="col-6">
                        <input type="radio" name="selector_categoria" class="selector-item_radio" id="general_knowledge"
                            value="general_knowledge" v-model="categoria">
                        <label for="general_knowledge" class="selector-item_label">General Knowlegde</label>
                    </div>
                    <div class="col-6">
                        <input type="radio" name="selector_categoria" class="selector-item_radio" id="geography"
                            value="geography" v-model="categoria">
                        <label for="geography" class="selector-item_label">Geography</label>
                    </div>                    
                    <div class="col-6">
                        <input type="radio" name="selector_categoria" class="selector-item_radio" id="history"
                            value="history" v-model="categoria">
                        <label for="history" class="selector-item_label">History</label>
                    </div>
                    <div class="col-6">
                        <input type="radio" name="selector_categoria" class="selector-item_radio" id="music" value="music"
                            v-model="categoria">
                        <label for="music" class="selector-item_label">Music</label>
                    </div>
                    <div class="col-6">
                        <input type="radio" name="selector_categoria" class="selector-item_radio" id="science"
                            value="science" v-model="categoria">
                        <label for="science" class="selector-item_label">Science</label>
                    </div>
                    <div class="col-6">
                        <input type="radio" name="selector_categoria" class="selector-item_radio" id="society_and_culture"
                            value="society_and_culture" v-model="categoria">
                        <label for="society_and_culture" class="selector-item_label">Culture & Society</label>
                    </div>
                    <div class="col-6">
                        <input type="radio" name="selector_categoria" class="selector-item_radio" id="sports_and_leisure"
                            value="sports_and_leisure" v-model="categoria">
                        <label for="sports_and_leisure" class="selector-item_label">Entertainment & Sports</label>
                    </div>
                </div>
            </div>
            <div class="buttonPlayDiv" v-on:click="countDownTimer()">
                <b-button class="buttonPlay" @click="jugar" variant="success">Play</b-button>
            </div>
            <br>
            <div class="buttonPlay" v-show="dificultadVacia">Error! You need to choose a difficulty !</div>
        </div>
        <div class="wrapper">
            <div class="contador">
                <div id="buttonPlayGame" class="timer">
                    {{ countDown }}
                </div>
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
                                    v-on:click.once="resetTime(), comprovaResultats('Resposta1-'+(index), pregunta.correctAnswer, index), delay('#slide-' + (index + 1))">
                                    <a class="button" :id="'Resposta1-' + (index)">{{respuestas[index][0]}}</a>
                                </div>
                                <div class="Respuesta-2"
                                    v-on:click.once="resetTime(), comprovaResultats('Resposta2-'+(index), pregunta.correctAnswer, index), delay('#slide-' + (index + 1))">
                                    <a class="button" :id="'Resposta2-' + (index)">{{respuestas[index][1]}}</a>
                                </div>
                                <div class="Respuesta-3"
                                    v-on:click.once="resetTime(), comprovaResultats('Resposta3-'+(index), pregunta.correctAnswer, index), delay('#slide-' + (index + 1))">
                                    <a class="button" :id="'Resposta3-' + (index)">{{respuestas[index][2]}}</a>
                                </div>
                                <div class="Respuesta-4"
                                    v-on:click.once="resetTime(), comprovaResultats('Resposta4-'+(index), pregunta.correctAnswer, index), delay('#slide-' + (index + 1))">
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
        </div>
        <div v-show="empezado">
            <table>
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
    </div>
    `,
  mounted: function () {
    if (this.gotdPROP == "true") {
      this.jugar();
    }
  },

  methods: {
    countDownTimer() {
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1
          this.countDownTimer()
          document.getElementById("buttonPlayGame").style.display = "block";
        }, 1000)
      }

    },
    delay(URL) {
      setTimeout(function () {
        window.location = URL;
      }, 2000);
    },

    resetTime() {
      setTimeout(() => {
        this.countDown = 20;
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

      let url;
      if (this.gotdPROP == "true") {
        url = "./trivia4-app/public/api/getJSONPartidaDelDia";
      } else {
        url = `https://the-trivia-api.com/api/questions?${categoriaF}limit=10&difficulty=${this.dificultad}`;
      }
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
          document.getElementById(
            "resultsPrint"
          ).innerHTML = `<p>Correct Answer!</p>`;
          document.getElementById("resultsPrint").style.display = "block";
          setTimeout(function () {
            document.getElementById("resultsPrint").style.display = "none";
          }, 2000);
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
    <h2>REGISTER</h2>
    <b-col sm="5" class="mx-auto">
      <b-form-input v-model="form.name" placeholder="Nom" class="m-3" required></b-form-input>
      <b-form-input v-model="form.surname" placeholder="Cognom" class="m-3" required></b-form-input>
      <b-form-input v-model="form.nickname" placeholder="Nom d'usuari" class="m-3" required></b-form-input>
      <b-form-input v-model="form.mail" placeholder="Correu" class="m-3" required></b-form-input>
      <b-form-input v-model="form.psswd" placeholder="Password" class="m-3" required></b-form-input>
    </b-col>
    <b-button class="buttonPlay"@click="submitRegister" variant="primary">Register <b-spinner v-show="procesando" small type="grow">
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
        <b-button class="buttonPlay" @click="submitLogin" variant="primary">Login <b-spinner v-show="procesando" small type="grow">
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
      idPlayer: useLoginStore().getIdPlayer(),
      player_name: useLoginStore().getPlayerName(),
      store: useLoginStore(),
    };
  },
  template: `
  <ul id="navbar">
    <li><router-link to="/" class="routerlink">Home</router-link></li>
    <li><router-link to="/joc/false" class="routerlink">Play a game</router-link></li>
    <li><router-link to="/joc/true" class="routerlink" v-show="store.logged">Game of the day</router-link></li>
    <li><router-link to="/totesLesPartides" class="routerlink" v-show="store.logged">All games</router-link></li>
    <li><router-link to="/partidesGuardades" class="routerlink" v-show="store.logged">Game history</router-link></li>
    <li><router-link to="/registre" class="routerlink rightNav activeSign" v-show="!store.logged">Sign up</router-link></li>
    <li><router-link to="/login" class="routerlink rightNav" v-show="!store.logged">Log in</router-link></li>
    <li><b-button @click="logOut" class="routerlink rightNav" variant="primary" v-show="store.logged">Logout</b-button></li>
    <div>
    <b-button v-show="store.logged" v-b-modal.modal-center class="routerlink rightNav">{{store.name_player}}</b-button>
    <b-modal id="modal-center" centered title="Perfil">
      <p>Nom Usuari:</p>
      <p class="my-4">{{ player_name }}</p>
    </b-modal>
  </div>
  </ul>
  `,
  methods: {
    logOut() {
      this.store.logout();
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
    path: "/joc/:gotdPROP",
    component: Partida,
    props: true,
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
