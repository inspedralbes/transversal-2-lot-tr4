const Home = Vue.component('home', {
    template: `<div>hola</div>`
})

const Partida = Vue.component('partida', {
    template: `
    
    `
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
