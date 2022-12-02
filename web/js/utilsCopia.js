const Home = Vue.component("home", {
    template: `<div>Perfil usuari</div>`,
  });
  
  Vue.component("login", {
    template: `<div>
            <div v-show="!logged">
                <b-form-input v-model="form.username" placeholder="Usuario" required></b-form-input>
                <b-form-input v-model="form.password" placeholder="Contraseña" required></b-form-input>
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
          username: "",
          password: "",
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
        fetch(
          `http://alvaro.alumnes.inspedralbes.cat/loginGET.php?username=${this.form.username}&pwd=${this.form.password}`
        )
          .then((response) => response.json())
          .then((data) => {
            if (data.exito) {
              this.infoLogin.nombre = data.nombre;
              this.infoLogin.imagen = data.imagen;
              this.infoLogin.id = data.id;
              this.logged = true;
            }
            this.procesando = false;
          });
      },
      logOut() {
        this.logged = false;
      },
    },
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
        empezado: false,
      };
    },
    template: `
      <div>
        <div v-show="!empezado">
            <h4>Dificultat</h4>
            <input type="radio" id="facil" value="easy" v-model="dificultad">
            <label for="uno">Fácil</label>
            <br>
            <input type="radio" id="media" value="medium" v-model="dificultad">
            <label for="Dos">Media</label>
            <br>
            <input type="radio" id="dificil" value="hard" v-model="dificultad">
            <label for="Dos">Difícil</label>
            <br>
            <h4>Categoria</h4>
            <select v-model="categoria">
                <option value="arts_and_literature">Art i Literatura</option>
                <option value="film_and_tv">Pel·lícules i TV</option>
                <option value="food_and_drink">Menjar i Begudes</option>
                <option value="general_knowledge">Coneixement general</option>
                <option value="geography">Geografia</option>
                <option value="history">Història</option>
                <option value="music">Música</option>
                <option value="science">Ciència</option>
                <option value="society_and_culture">Societat i Cultura</option>
                <option value="sports_and_leisure">Esports i Lleure</option>
            </select><br><br>
            <b-button @click="jugar" variant="success">Jugar</b-button>
        </div>
  
        <div class="b-slider">
            <div class="slider">
                <div class="slides">
                    <div :id="'slide-' + (index)" v-for="(pregunta, index) in preguntas">
                        <div class="container">
                            <div class="Pregunta">
                                {{pregunta.question}}
                            </div>
                            <div class="Respuesta-1"
                                v-on:click="comprovaResultats('Resposta1-'+(index), pregunta.correctAnswer)">
                                <a :id="'Resposta1-' + (index)" :href="'#slide-' + (index + 1)">{{respuestas[index][0]}}</a>
                            </div>
                            <div class="Respuesta-2"
                                v-on:click="comprovaResultats('Resposta2-'+(index), pregunta.correctAnswer)">
                                <a :id="'Resposta2-' + (index)" :href="'#slide-' + (index + 1)">{{respuestas[index][1]}}</a>
                            </div>
                            <div class="Respuesta-3"
                                v-on:click="comprovaResultats('Resposta3-'+(index), pregunta.correctAnswer)">
                                <a :id="'Resposta3-' + (index)" :href="'#slide-' + (index + 1)">{{respuestas[index][2]}}</a>
                            </div>
                            <div class="Respuesta-4"
                                v-on:click="comprovaResultats('Resposta4-'+(index), pregunta.correctAnswer)">
                                <a :id="'Resposta4-' + (index)" :href="'#slide-' + (index + 1)">{{respuestas[index][3]}}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="ResultsPrint">
        </div>
    </div>`,
    methods: {
      jugar() {
        let url = `https://the-trivia-api.com/api/questions?categories=${this.categoria}&limit=10&difficulty=${this.dificultad}`;
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
            datosEnvio.append("json", this.preguntas);
  
            this.enviarDades(datosEnvio);
          });
      },
      enviarDades(datosPregunta) {
        fetch("./trivia4-app/public/api/setDadesPartida", {
          method: "POST",
          body: datosPregunta,
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
          document.getElementById("ResultsPrint").innerHTML =
            "<p>Your score is " + this.contadorBuenas + "/10</p>";
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
  