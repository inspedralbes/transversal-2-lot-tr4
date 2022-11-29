const Home = Vue.component('home', {
  template: `<div>hola</div>`
})

const Partida = Vue.component('partida', {
  template: `<div class="slider">
    <div class="slides">
        <div id="slide-1">
            <div class="container">
                <div class="Pregunta">
                    ¿Cómo le llaman los locales a la Ciudad de Nueva York?
                </div>
                <div class="Respuesta-1 incorrecta">
                    <a href="#slide-2">World's City</a>
                </div>
                <div class="Respuesta-2 correcta">
                    <a href="#slide-2">Gotham</a>
                </div>
                <div class="Respuesta-3 incorrecta">
                    <a href="#slide-2">Mordor</a>
                </div>
                <div class="Respuesta-4 incorrecta">
                    <a href="#slide-2">The city of freedom</a>
                </div>
            </div>
        </div>
    </div>
</div>`
})

// =============== Routes ===============
const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/joc",
    component: Partida,
  }
];

// 3. Create the router instance and pass the `routes` option
const router = new VueRouter({
  routes, // short for `routes: routes`
});

let app = new Vue({
  el: "#app",
  router,
});
