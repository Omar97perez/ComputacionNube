import Vue from 'vue';
import VueRouter from 'vue-router';
import VueCarousel from 'vue-carousel';

Vue.use(VueCarousel);
Vue.use(VueRouter);

import VueAxios from 'vue-axios';
import axios from 'axios';
Vue.use(VueAxios, axios);

import App from './App.vue';
import Index from './components/index.vue';
import EjecutarAlgoritmo from './components/productos/EjecutarAlgoritmos.vue'
import Contacto from './components/contacto.vue'
import Perfil from './components/usuario/perfil.vue'
import NuevoAlgoritmo from './components/productos/NuevoAlgoritmo.vue'
import store from './js/store';
import Login from './components/usuario/Login.vue';
import Logout from './components/usuario/Logout.vue';
import Registro from './components/usuario/Registro.vue';
import ModUsuario from './components/usuario/ModUsuario.vue';

const routes = [
  {
    name: 'index',
    path: '/',
    component: Index,
    meta: {
      isPublic: true
    }
  },
  {
  path: '/Ejecutar/Algoritmos',
  name: 'ejecutarAlgoritmo',
  component: EjecutarAlgoritmo,
  meta: {
    isPublic: true
  }
},
{
  path: '/Contacto',
  name: 'contacto',
  component: Contacto,
  meta: {
    isPublic: true
  }
},
{
  path: '/Perfil',
  name: 'perfil',
  component: Perfil,
  meta: {
    isPublic: true
  }
},
{
  path: '/Nuevo/Algoritmo',
  name: 'nuevoAlgoritmo',
  component: NuevoAlgoritmo,
  meta: {
    isPublic: true
  }
},
{
  name: 'Login',
  path: '/Login',
  component: Login,
  meta: {
    isPublic: true,
    justPublic: true
  }
},
{
  name: 'Logout',
  path: '/Logout',
  component: Logout,
},
{
  name: 'Registro',
  path: '/Registro',
  component: Registro,
  meta: {
    isPublic: true,
    justPublic: true
  }
},
{
  name: 'ModUsuario',
  path: '/Usuario/ModUsuario',
  component: ModUsuario,
},
];

const router = new VueRouter({ routes});

router.beforeEach((to, from, next) => {
  if (!to.matched.some(record => record.meta.isPublic) && localStorage.getItem("token") == null) {
      next();
      next('/Login');
  } else {
    // console.log(store.getters.name )
    if(to.matched.some(record => record.meta.justPublic) && localStorage.getItem("token")) {
      next('/');
    }
    else {
      if(to.matched.some(record => record.meta.isAdmin) && (store.getters.email != "root@root.com")) {
        console.log(store.getters.name )
        next('/');
      }
      else {
     // console.log("adsfadsf")
        next();
      }
    }

  }
})
new Vue(Vue.util.extend({ router, store }, App)).$mount('#app');
