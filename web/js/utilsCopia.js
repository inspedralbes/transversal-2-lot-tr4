const Home = Vue.component("home", {
    template: `<div>hola</div>`,
  });
  
  Vue.component('login', {
    template: `<div>
    <div v-show="!logged">
        <b-form-input v-model="form.username" placeholder="Usuario" required></b-form-input>
        <b-form-input v-model="form.password" placeholder="Contraseña" required></b-form-input>
        <b-button @click="submitLogin" variant="primary" >Login <b-spinner v-show="procesando" small type="grow"></b-spinner>
        </b-button>
        <div id="errorLogin" v-show="errorUsuario">
        <p>Usuario incorrecto</p>
        </div>
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
                username: '',
                password: ''
            },
            infoLogin: {
                nombre: '',
                imagen: '',
                id: '',
            },
            logged: false,
            procesando: false,
            errorUsuario: false
        }
    },
    methods: {
        submitLogin() {
            this.procesando = true;
            fetch(`http://alvaro.alumnes.inspedralbes.cat/loginGET.php?username=${this.form.username}&pwd=${this.form.password}`)
                .then(response => response.json())
                .then(data => {
                    if (data.exito) {
                        this.infoLogin.nombre = data.nombre;
                        this.infoLogin.imagen = data.imagen;
                        this.infoLogin.id = data.id;
                        this.logged = true;
                    } else {
                        this.errorUsuario = true;
                    }
                    this.procesando = false;
                })
        },
  
        logOut() {
            this.logged = false
        },
    }
  });
  
  const Partida = Vue.component("partida", {
    data: function () {
      return {
        datos: [],
        dificultad: '',
        categoria: ''
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
                    <div class="Respuesta-1 incorrecta">
                        <a :href="'#slide-' + (index + 1)">{{dada.incorrectAnswers[0]}}</a>
                    </div>
                    <div class="Respuesta-2 correcta">
                        <a :href="'#slide-' + (index + 1)">{{dada.correctAnswer}}</a>
                    </div>
                    <div class="Respuesta-3 incorrecta">
                        <a :href="'#slide-' + (index + 1)">{{dada.incorrectAnswers[1]}}</a>
                    </div>
                    <div class="Respuesta-4 incorrecta">
                        <a :href="'#slide-' + (index + 1)">{{dada.incorrectAnswers[2]}}</a>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
    `,
    mounted: function () {
      let url =
        `https://the-trivia-api.com/api/questions?limit=10&difficulty=${this.dificultad}`;
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
  