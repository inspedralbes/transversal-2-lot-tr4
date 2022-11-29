// =============== Routes ===============
const routes = [
    {
      path: "/",
      component: Buscador,
    },
    {
      path: "/admin",
      component: Admin,
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
