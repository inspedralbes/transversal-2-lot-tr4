const Home = Vue.component("home", {
  template: `
  <div class="divGeneral">
    <div class="menu">
      <div class="news">
      <br>
        <p>Welcome to League of Trivia. This is the first update of the game, so stay stunned for more news in the future!</p>
      </div>
      <div class="inspedralbes">
        <p>Aqui la pagina del instituto para el cual se entrega este juegazo</p>
        <br>
        <img src="img/LogoPedralbes.png" alt="Logo Pedralbes" class="responsive">
      </div>
      <div class="fotoquiz">
        Hello
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
      indice: 1,
      timer: null,
    };
  },
  template: `
  <div>
    <div v-show="!empezado">
        <h2 class="Pregunta">Difficulty</h2>
        <div class="container__dificultad">
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
        <div class="mensajeErrorDificultad" v-show="dificultadVacia"><h4>Error! You need to choose a difficulty !</h4></div>

        <h2 class="Pregunta">Category</h2>
        <div class="container__categoria">
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
        <div class="button__PlayDiv">
            <b-button class="button__Play--leagueStyle" @click="jugar" variant="success">Play</b-button>
        </div>
        <br>
    </div>
    <div class="wrapper">
        <div class="contador" v-show="empezado">
            <div id="buttonPlayGame" class="timer">
                {{ countDown }}
            </div>
        </div>
        <div class="b-slider" v-show="!acabado">
            <div class="slider">
                <div class="slides" id="respuestas">
                    <div :id="'slide-' + (index)" v-for="(pregunta, index) in preguntas">

                        <div class="container__preguntes">
                            <div class="Pregunta">
                                <div v-show="categoria == ''">Category: {{pregunta.category}}<br></div>
                                Question {{index + 1}}:<br>
                                {{pregunta.question}}
                            </div>
                            <br><br><br>
                            <div class="Respuesta__1"
                                v-on:click.once="blockOrUnblockRespuesta(), resetTime(), comprovaResultats('Resposta1-'+(index), pregunta.correctAnswer, index, pregunta.id), delay('#slide-' + (index + 1))">
                                <a class="button__respuestas" :id="'Resposta1-' + (index)">{{respuestas[index][0]}}</a>
                            </div>
                            <div class="Respuesta__2"
                                v-on:click.once="blockOrUnblockRespuesta(), resetTime(), comprovaResultats('Resposta2-'+(index), pregunta.correctAnswer, index, pregunta.id), delay('#slide-' + (index + 1))">
                                <a class="button__respuestas" :id="'Resposta2-' + (index)">{{respuestas[index][1]}}</a>
                            </div>
                            <div class="Respuesta__3"
                                v-on:click.once="blockOrUnblockRespuesta(), resetTime(index), comprovaResultats('Resposta3-'+(index), pregunta.correctAnswer, index, pregunta.id), delay('#slide-' + (index + 1))">
                                <a class="button__respuestas" :id="'Resposta3-' + (index)">{{respuestas[index][2]}}</a>
                            </div>
                            <div class="Respuesta__4"
                                v-on:click.once="blockOrUnblockRespuesta(), resetTime(), comprovaResultats('Resposta4-'+(index), pregunta.correctAnswer, index, pregunta.id), delay('#slide-' + (index + 1))">
                                <a class="button__respuestas" :id="'Resposta4-' + (index)">{{respuestas[index][3]}}</a>
                            </div>
                            <div class="Respuesta__5"
                                v-on:click.once="blockOrUnblockRespuesta(), resetTime(), comprovaResultats('Resposta5-'+(index), pregunta.correctAnswer, index, pregunta.id), delay('#slide-' + (index + 1))">
                                <a class="button__respuestas" :id="'Resposta5-' + (index)">+++++++++++++++++++</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="resultsPrint" id="resultsPrint">
        </div>
    </div>
    <div v-show="acabado" class="scorePrint">
      <p>Your score is {{contadorBuenas}}/{{contadorRespuestas}}</p>
      <b-button class="button__Play--leagueStyle" v-show="gotdPROP != 'true'" @click="resetDades" variant="success">Play Again</b-button>
    </div>
    <div v-show="empezado">
        <table class="tabla">
            <tr>
                <td class = "tabla__respuestas" id="pregunta0"></td>
                <td class = "tabla__respuestas" id="pregunta1"></td>
                <td class = "tabla__respuestas" id="pregunta2"></td>
                <td class = "tabla__respuestas" id="pregunta3"></td>
                <td class = "tabla__respuestas" id="pregunta4"></td>
                <td class = "tabla__respuestas" id="pregunta5"></td>
                <td class = "tabla__respuestas" id="pregunta6"></td>
                <td class = "tabla__respuestas" id="pregunta7"></td>
                <td class = "tabla__respuestas" id="pregunta8"></td>
                <td class = "tabla__respuestas" id="pregunta9"></td>
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
    blockOrUnblockRespuesta() {
      var element = document.getElementById("respuestas");
      element.classList.toggle("disabled");
      setTimeout(function () {
        element.classList.toggle("disabled");
      }, 1000);
    },
    countDownTimer() {
      document.getElementById("buttonPlayGame").style.display = "block";
      if (this.countDown != 0) {
        this.timer = setTimeout(() => {
          this.countDown -= 1;
          this.countDownTimer();
        }, 1000);
      } else if (this.countDown == 0) {
        if (this.indice == 1) {
          document.getElementById("Resposta5-0").click();
          this.indice++;
        } else if (this.indice == 2) {
          document.getElementById("Resposta5-1").click();
          this.indice++;
        } else if (this.indice == 3) {
          document.getElementById("Resposta5-2").click();
          this.indice++;
        } else if (this.indice == 4) {
          document.getElementById("Resposta5-3").click();
          this.indice++;
        } else if (this.indice == 5) {
          document.getElementById("Resposta5-4").click();
          this.indice++;
        } else if (this.indice == 6) {
          document.getElementById("Resposta5-5").click();
          this.indice++;
        } else if (this.indice == 7) {
          document.getElementById("Resposta5-6").click();
          this.indice++;
        } else if (this.indice == 8) {
          document.getElementById("Resposta5-7").click();
          this.indice++;
        } else if (this.indice == 9) {
          document.getElementById("Resposta5-8").click();
          this.indice++;
        } else if (this.indice == 10) {
          document.getElementById("Resposta5-9").click();
          this.indice++;
        }
      }
    },

    delay(URL) {
      setTimeout(function () {
        window.location = URL;
      }, 1000);
    },

    resetTime() {
      clearTimeout(this.timer);
      if (this.indice == 10) {
        this.indice = 1;
        setTimeout(
          () =>
            (document.getElementById("buttonPlayGame").style.display = "none"),
          1000
        );
      } else {
        setTimeout(() => {
          if (this.countDown == 0) {
            this.countDown = 20;
            this.countDownTimer();
          } else {
            this.countDown = 20;
            this.indice++;
            this.countDownTimer();
          }
        }, 1000);
      }
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
      for (let i = 0; i < 10; i++) {
        var element = document.getElementById(`pregunta${i}`);
        element.classList.remove("incorrectAnswer");
        element.classList.remove("correctAnswer");
      }
    },

    jugar() {
      let categoriaF = "";

      if (this.dificultad == "") {
        this.dificultadVacia = true;
      } else {
        clearTimeout(this.timer);
        this.indice = 1;
        this.countDown = 20;
        this.countDownTimer();
      }
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

            if (this.gotdPROP != "true") {
              this.enviarDades(datosEnvio);
            } else {
              fetch("./trivia4-app/public/api/getIdPartidaDelDia")
                .then((response) => response.json())
                .then((data) => {
                  this.idGame = data;
                  if (this.store.logged) {
                    this.enviarPuntuacioInicial();
                  }
                });
            }
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
          if (this.store.logged) {
            this.enviarPuntuacioInicial();
          }
        });
    },
    enviarRespostaABBDD(idPreguntaApi, correcta) {
      let datosEnvio = new FormData();
      datosEnvio.append("idApi", idPreguntaApi);
      datosEnvio.append("correcta", correcta);
      fetch("./trivia4-app/public/api/storeResultatPregunta", {
        method: "POST",
        body: datosEnvio,
      });
    },
    enviarPuntuacioInicial: function () {
      let datosEnvio = new FormData();
      datosEnvio.append("id_player", this.store.getIdPlayer());
      datosEnvio.append("id_game", this.idGame);
      fetch("./trivia4-app/public/api/storeGameXPlayerInicial", {
        method: "POST",
        body: datosEnvio,
      });
    },
    enviarScorePlayer: function () {
      url = "./trivia4-app/public/api/setScorePlayer";
      let datosEnvio = new FormData();
      datosEnvio.append("id_player", this.store.getIdPlayer());
      datosEnvio.append("id_game", this.idGame);
      datosEnvio.append("score", this.contadorBuenas);
      datosEnvio.append("difficulty", this.dificultad);
      fetch(url, {
        method: "POST",
        body: datosEnvio,
      });
    },
    comprovaResultats: function (respuestaUser, respuestaCorrecta, idPregunta, idPreguntaApi) {
      let respuesta = document.getElementById(respuestaUser).innerHTML;
      let pregunta = document.getElementById("pregunta" + idPregunta);
      if (!this.acabado) {
        if (respuesta == respuestaCorrecta) {
          this.enviarRespostaABBDD(idPreguntaApi, true);
          pregunta.classList.add("correctAnswer");
          this.contadorBuenas++;
          document.getElementById(
            "resultsPrint"
          ).innerHTML = `<p>Correct Answer!</p>`;
          document.getElementById("resultsPrint").style.display = "block";
          setTimeout(function () {
            document.getElementById("resultsPrint").style.display = "none";
          }, 1000);
        } else {
          this.enviarRespostaABBDD(idPreguntaApi, false);
          pregunta.classList.add("incorrectAnswer");
          document.getElementById(
            "resultsPrint"
          ).innerHTML = `<p>Incorrect Answer<br>Correct answer is: ${respuestaCorrecta}</p>`;
          document.getElementById("resultsPrint").style.display = "block";
          setTimeout(function () {
            document.getElementById("resultsPrint").style.display = "none";
          }, 1000);
        }
        this.contadorRespuestas++;
      }

      if (this.contadorRespuestas == 10) {
        setTimeout(() => (this.acabado = true), 1000);
        if (this.store.logged) {
          this.enviarScorePlayer();
        }
        switch (this.dificultad) {
          case "medium":
            this.contadorRespuestas *= 2;
            this.contadorBuenas *= 2;
            break;

          case "hard":
            this.contadorRespuestas *= 3;
            this.contadorBuenas *= 3;
            break;

          default:
            break;
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
  <div class="loginSign">
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
  <div class="loginSign">
    <h1 v-show="idPlayer == 0">No has iniciat sessió!</h1>
    <h1 v-show="partidas.length == 0 && idPlayer != 0">No hay partidas!</h1>

    <div v-show="idPlayer != 0">
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
      url = "./trivia4-app/public/api/getPartides";
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          this.partidas = data;
        });
    }
  },
});

const Ranking = Vue.component("ranking", {
  data: function () {
    return {
      players: [],
      mostrar: false,
      store: useLoginStore(),
    };
  },
  template: `
    <div v-show="mostrar" class="divGeneral">
      <h1>Llista de jugadors.</h1>
      <div v-for="player in players">
          <li class ="li__personaRanking">{{player.nickname}} <a v-show="store.id_player == player.id">(YOU)</a>
          <b-button v-show="store.logged && store.id_player != player.id" class="button__Play--RankingList" @click="enviarSolicitud(player.id)" :id='"boto" + (player.id)'>Afegir</b-button></li>
      </div>
    </div>
  `,
  mounted: function () {
    url = "./trivia4-app/public/api/getPlayers";
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.players = data;
        // console.log(this.players);
        this.mostrar = true;
      });
  },
  methods: {
    enviarSolicitud(idSolicitat) {
      let datosEnvio = new FormData();
      datosEnvio.append("id_requester", this.store.getIdPlayer());
      datosEnvio.append("id_requested", idSolicitat);

      fetch(`./trivia4-app/public/api/mandarSolicitutAmistat`, {
        method: "POST",
        body: datosEnvio,
      });
      boton = document.getElementById("boto" + idSolicitat);
      boton.disabled = true;
      boton.innerHTML = "Pendent...";
    },
  },
});

Vue.component("solicituts", {
  data: function () {
    return {
      solicituts: [],
      mostrar: false,
      store: useLoginStore(),
    };
  },
  template: `
  <div>
    <h1>Solicituts d'amistat.</h1>
    <div v-show="mostrar">
      <h2 v-show="solicituts.length == 0">You don't have any pending friend request!</h2>
      <div v-for="solicitut in solicituts">
        <h1>L'usuari {{solicitut.nickname}} t'ha enviat una sol·licitut d'amistat</h1>
        <p>
          <b-button class="button__Play--leagueStyle" @click="envia(true, solicitut.id)">Accept</b-button>
          <b-button class="button__Play--leagueStyle" @click="envia(false, solicitut.id)">Deny</b-button>
        </p> 
      </div>
    </div>
    <div v-show="!mostrar">
      <h2>No hi ha resultats!</h2>
    </div>
  </div>
  `,
  mounted: function () {
    if (this.store.logged) {
      this.rebreSolicituts();
    }
  },
  methods: {
    envia(opcio, id) {
      let datosEnvio = new FormData();
      datosEnvio.append("id", id);
      datosEnvio.append("accept", opcio);

      fetch(`./trivia4-app/public/api/resultatSolicitutAmistat`, {
        method: "POST",
        body: datosEnvio,
      })
        .then((response) => response.json())
        .then((data) => {
          this.rebreSolicituts();
        });
    },
    rebreSolicituts() {
      this.solicituts = [];
      url =
        "./trivia4-app/public/api/getSolicitutsPendents/" +
        this.store.getIdPlayer();
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          if (data != false) {
            this.solicituts = data;
            this.mostrar = true;
          }
        });
    },
  },
});

const Amics = Vue.component("llista-amics", {
  data: function () {
    return {
      amics: [],
      mostrar: false,
      store: useLoginStore(),
    };
  },
  template: `
  <div v-show="mostrar" class="divGeneral">
    <h1>Amics</h1>
    <h2 v-show="amics.length == 0">You don't have friends!</h2>
    <div v-for="amic in amics" v-show="amic.nickname != store.getPlayerName()">
      <h3>{{amic.nickname}} <b-button variant="danger" @click="eliminarAmic(amic.friend_id), rebreSolicituts()">Delete friend</b-button></h3>
    </div>
    <h4>=====================================</h4>
    <solicituts></solicituts>
  </div>
  `,
  mounted: function () {
    if (this.store.logged) {
      this.rebreSolicituts();
    }
  },
  methods: {
    rebreSolicituts() {
      this.amics = [];
      url = "./trivia4-app/public/api/dadesAmics/" + this.store.getIdPlayer();
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.amics = data;
          this.mostrar = true;
        });
    },
    eliminarAmic(id) {
      url = "./trivia4-app/public/api/esborrarAmic/" + id;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          this.rebreSolicituts();
        });
    },
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
  <div class="divGeneral">
    <br>
    <h2>REGISTER</h2>
    <b-col sm="5" class="mx-auto">
      <b-form-input class = "input__logYsign" v-model="form.name" placeholder="Nom" required></b-form-input>
      <b-form-input class = "input__logYsign" v-model="form.surname" placeholder="Cognom"  required></b-form-input>
      <b-form-input class = "input__logYsign" v-model="form.nickname" placeholder="Nom d'usuari"  required></b-form-input>
      <b-form-input class = "input__logYsign" v-model="form.mail" placeholder="Correu" required></b-form-input>
      <b-form-input class = "input__logYsign" v-model="form.psswd" placeholder="Password"required></b-form-input>
    </b-col>
    <b-button class="button__Play--leagueStyle" @click="submitRegister" variant="primary">Register <b-spinner v-show="procesando" small type="grow">
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
  <div class="divGeneral">
      <div v-show="!logged">
        <br>
        <h2>LOG IN</h2>
        <b-col sm="5" class="mx-auto">
          <b-form-input class="input__logYsign" v-model="form.nickname" placeholder="Nickname" required></b-form-input>
          <b-form-input class ="input__logYsign" v-model="form.psswd" type="password" placeholder="Password" required></b-form-input>
        </b-col>
        <b-button class="button__Play--leagueStyle" @click="submitLogin" variant="primary">Login <b-spinner v-show="procesando" small type="grow">
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
  <ul class ="navbar" id="navbar">
  <li v-on:click="HomeResetPartida()">
      <router-link  to="/" class="routerlink">Home</router-link>
  </li>
  <li>
      <router-link to="/joc/false" class="routerlink">Play a game</router-link>
  </li>
  <li>
      <router-link to="/gotd" class="routerlink">Game of the day</router-link>
  </li>
  <li>
      <router-link to="/ranking" class="routerlink">Ranking</router-link>
  </li>
  <li>
      <router-link to="/amics" class="routerlink" v-show="store.logged">Friends</router-link>
  </li>
  <li>
      <router-link to="/totesLesPartides" class="routerlink" v-show="store.logged">All games</router-link>
  </li>
  <li>
      <router-link to="/partidesGuardades" class="routerlink" v-show="store.logged">Game history</router-link>
  </li>
  <li>
      <router-link to="/registre" class="rightNav activeSign" v-show="!store.logged">Sign up</router-link>
  </li>
  <li>
      <router-link to="/login" class="rightNav" v-show="!store.logged">Log in</router-link>
  </li>
  <li>
      <b-button @click="logOut" class="rightNav" variant="primary" v-show="store.logged">Logout</b-button>
  </li>
  <div>
      <b-button v-show="store.logged" v-b-modal.modal-center class="routerlink rightNav">{{store.name_player}}
      </b-button>
      <b-modal id="modal-center" centered title="Perfil">
          <p>Nom Usuari: <strong class="my-4">{{ store.name_player }}</strong></p>
      </b-modal>
  </div>
</ul>
  `,
  methods: {
    logOut() {
      useLoginStore().logout();
    },

    HomeResetPartida() {
      this.indice = 1;
      clearTimeout(timer);
      this.countDown = 20;
    },
  },
});

const Gotd = Vue.component("gotd", {
  data: function () {
    return {
      store: useLoginStore(),
      jugat: false,
      puntuacions: [],
      mostrar: false,
      idGame: 0,
    };
  },
  template: `
  <div class="divGeneral">
    <div v-show="store.logged && mostrar && !jugat">
      <router-link to="/joc/true"><b-button>Juga uwu</b-button></router-link>
    </div>
    <div v-show="!store.logged">
      <h2>Inicia sessió per poder jugar la partida del dia!</h2>
    </div>
    <div v-show="jugat">
      <h2>Ja has jugat la partida del dia</h2>
    </div>
    <h2>================================</h2>
    <h2>Puntuacions Game of the Day</h2>
    <div v-show="puntuacions.length > 0">
      <div v-for="(puntuacio, index) in puntuacions">
        <h3>{{index + 1}}. {{puntuacio.nickname}} -> {{puntuacio.score}}</h3>
      </div>
    </div>
    <h3 v-show="puntuacions.length == 0">Encara no hi ha partides registrades</h3>
  </div>`,
  mounted: function () {
    fetch("./trivia4-app/public/api/getIdPartidaDelDia")
      .then((response) => response.json())
      .then((data) => {
        this.idGame = data;
        this.buscarPuntuacions();
        this.haJugatGotd();
      });
  },
  methods: {
    buscarPuntuacions() {
      url = "./trivia4-app/public/api/puntuacionsPartida/" + this.idGame;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          this.puntuacions = data;
          this.mostrar = true;
        });
    },
    haJugatGotd() {
      fetch(
        "./trivia4-app/public/api/haJugatPartidaDelDia/" +
        this.store.getIdPlayer()
      )
        .then((response) => response.json())
        .then((data) => {
          this.jugat = data;
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
    path: "/joc/:gotdPROP",
    component: Partida,
    props: true,
  },
  {
    path: "/gotd",
    component: Gotd,
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
  {
    path: "/amics",
    component: Amics,
  },
  {
    path: "/ranking",
    component: Ranking,
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
