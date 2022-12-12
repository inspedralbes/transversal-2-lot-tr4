const Home = Vue.component("home",{
  template: `<div>Landing page</div>`
})

const Profile = Vue.component("profile", {
  template: `<div>Perfil usuari</div>`,
});

const Partida = Vue.component("partida", {
  data: function () {
    return {
      preguntas: [],
      respuestas: [],
      contadorBuenas: 0,
      contadorMalas: 0,
      dificultad: "",
      categoria: "",
      categoriaF: "",
      empezado: false,
      acabado: false,
      dificultadVacia: false,
      idGame: 0,
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
            <div class = "buttonPlayDiv">
              <b-button class="buttonPlay"  @click="jugar" variant="success">Play</b-button> 
            </div>
            <br>
            <div class ="buttonPlay" v-show="dificultadVacia">Error! You need to choose a difficulty  !</div>
        </div>
      <div class="b-slider">
          <div class="slider">
              <div class="slides">
                  <div :id="'slide-' + (index)" v-for="(pregunta, index) in preguntas">
                      <div class="container">
                          <div class="Pregunta">
                              Category: {{pregunta.category}}<br>
                              Question {{index + 1}}:<br>
                              {{pregunta.question}}
                          </div>
                          <br><br><br>
                          <div class="Respuesta-1"
                              v-on:click="comprovaResultats('Resposta1-'+(index), pregunta.correctAnswer)">
                              <a class="button" :id="'Resposta1-' + (index)" :href="'#slide-' + (index + 1)">{{respuestas[index][0]}}</a>
                          </div>
                          <div class="Respuesta-2"
                              v-on:click="comprovaResultats('Resposta2-'+(index), pregunta.correctAnswer)">
                              <a class="button" :id="'Resposta2-' + (index)" :href="'#slide-' + (index + 1)">{{respuestas[index][1]}}</a>
                          </div>
                          <div class="Respuesta-3"
                              v-on:click="comprovaResultats('Resposta3-'+(index), pregunta.correctAnswer)">
                              <a class="button" :id="'Resposta3-' + (index)" :href="'#slide-' + (index + 1)">{{respuestas[index][2]}}</a>
                          </div>
                          <div class="Respuesta-4"
                              v-on:click="comprovaResultats('Resposta4-'+(index), pregunta.correctAnswer)">
                              <a class="button" :id="'Resposta4-' + (index)" :href="'#slide-' + (index + 1)">{{respuestas[index][3]}}</a>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      <div id ="ScorePrint">
      </div>
      <div id="ResultsPrint">
      </div>
  </div>`,
  methods: {
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

            let datosEnvio = new FormData();
            datosEnvio.append("difficulty", this.dificultad);
            datosEnvio.append("category", this.categoria);
            datosEnvio.append("json", JSON.stringify(this.preguntas));

            this.enviarDades(datosEnvio);
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
    comprovaResultats: function (respuestaUser, respuestaCorrecta) {
      let respuesta = document.getElementById(respuestaUser).innerHTML;
      if (respuesta == respuestaCorrecta) {
        this.contadorBuenas++;
        document.getElementById("ResultsPrint").innerHTML =
          "<p>Correct Answer</p>";
        document.getElementById("ResultsPrint").style.display = "block";
        setTimeout(function () {
          document.getElementById("ResultsPrint").style.display = "none";
        }, 1000);
      } else {
        this.contadorMalas++;
        document.getElementById("ResultsPrint").innerHTML =
          "<p>Incorrect Answer</p>";
        document.getElementById("ResultsPrint").style.display = "block";
        setTimeout(function () {
          document.getElementById("ResultsPrint").style.display = "none";
        }, 1000);
      }
      if (this.contadorBuenas + this.contadorMalas == 10) {
        document.getElementById("ScorePrint").innerHTML =
          "<p>Your score is " + this.contadorBuenas + "/10</p>";
        if (this.contadorBuenas < 5) {
          document.getElementById("slide-9").innerHTML =
            "<p class='FinalMessage'>Maybe you need to get better</p>";
        } else if (this.contadorBuenas > 4 && this.contadorBuenas < 7) {
          document.getElementById("slide-9").innerHTML =
            "<p class='FinalMessage'>Good job!</p>";
        } else {
          document.getElementById("slide-9").innerHTML =
            "<p class='FinalMessage'>Impressive job! You are the best</p>";
        }
        this.enviarDadesPartidaJugador();
        this.acabado = true;
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

const Partides = Vue.component("partides", {
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
  </div>
  `,
  mounted: function () {
    if (this.idPlayer != 0) {
      url = "./trivia4-app/public/api/getPartidesUsuari/" + this.idPlayer;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
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
  <div class="loginSign"><br>
    <p>SIGN IN</p><br>
    <b-form-input v-model="form.name" placeholder="Name" required></b-form-input><br>
    <b-form-input v-model="form.surname" placeholder="Surname" required></b-form-input><br>
    <b-form-input v-model="form.nickname" placeholder="Username" required></b-form-input><br>
    <b-form-input v-model="form.mail" placeholder="Email" required></b-form-input><br>
    <b-form-input v-model="form.psswd" placeholder="Password" required></b-form-input>
    <br>
        <b-button @click="submitRegister" variant="primary">Register <b-spinner v-show="procesando" small type="grow">
            </b-spinner><br>
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

// Vue.component("card", {
//   props: ['datos'],
//   template: `
//     <b-card border-variant="secondary" :header="datos.Title" header-border-variant="secondary" align="center">
//     <div>
//         <b-img thumbnail fluid :src="datos.Poster" :alt="datos.Title"></b-img>
//         <b-button class="button-orange" @click="$emit('evtMasInformacion', datos.imdbID)">Mas información</b-button>
//         <b-button class="button-orange" pill @click="buscarInfo" variant="outline-dark">Afegir</b-button>
//     </div>
//     </b-card>`,
// });

const Login = Vue.component("login",{
  template: `<div class="loginSign"><br>
    <p>LOG IN</p><br>
            <div v-show="!logged">
                <b-form-input v-model="form.nickname" placeholder="Nickname" required></b-form-input><br>
                <b-form-input v-model="form.psswd" placeholder="Password" required></b-form-input><br>
                <b-button @click="submitLogin" variant="primary">Login <b-spinner v-show="procesando" small type="grow">
                    </b-spinner>
                </b-button>
            </div>
            <div v-show="logged">
                Bienvenido {{infoLogin.nombre}}<br>
                <img :src="infoLogin.imagen"></img><br>
                <b-button @click="logOut" variant="primary">Logout</b-button>
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
            useLoginStore().login();
            useLoginStore().setIdPlayer(data[1].id);
            useLoginStore().setPlayerName(data[1].nickname);
          }
          this.procesando = false;
        });
    },
    logOut() {
      this.infoLogin.nombre = "";
      this.infoLogin.id = "";
      this.form.nickname = "";
      this.form.psswd = "";
      this.logged = false;
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
    path:"/profile",
    component: Profile,
  },
  {
    path: "/joc",
    component: Partida,
  },
  {
    path: "/partidesGuardades",
    component: Partides,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/registre",
    component: Registre,
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
      this.logged = false
      this.id_player = 0;
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
    }
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
