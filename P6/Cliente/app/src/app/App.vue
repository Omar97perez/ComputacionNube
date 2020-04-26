<template>
  <div>
    <body>
      <div class="click-closed"></div>

      <nav class="navbar navbar-default navbar-trans navbar-expand-lg fixed-top">
        <div class="container">
          <button class="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarDefault"
            aria-controls="navbarDefault" aria-expanded="false" aria-label="Toggle navigation">
            <div class="row">
              <div class="col-2">
                <span class="span1"></span>
                <span class="span2"></span>
                <span class="span1"></span>
              </div>
              <div class="col-8">
                <a class="navbar-brand text-brand"><img src="img/cloud-2044797_960_720.webp" alt="favicon"  width="25%">Code<a style="color:#1b89d8">Cloud</a></a>
              </div>
            </div>

          </button>


           <div class="navbar-collapse collapse justify-content-center mostrado-movil" id="navbarDefault" align="center">
              <button type="button" class="btn btn-b-n mostrado-movil" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-expanded="false" >
                <div class="dropdown"  v-if="loggedIn">
                  <a class="dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="color:white"><span class="fa fa-user" aria-hidden="true" style="color:white"></span></a>
                  <div class="dropdown-menu" aria-labelledby="login" >
                    <a class="dropdown-item" ><router-link :to="{ name: 'nuevoanuncio' }"class="navbar-toggler collapsed" data-toggle="collapse" data-target="#navbarDefault"
                      aria-controls="navbarDefault" aria-expanded="false" aria-label="Toggle navigation"><i class="fa fa-plus"></i> Nuevo Algoritmo</router-link></a>
                    <a class="dropdown-item" ><router-link :to="{ name: 'ModUsuario' }" class="navbar-toggler collapsed" data-toggle="collapse" data-target="#navbarDefault"
                      aria-controls="navbarDefault" aria-expanded="false" aria-label="Toggle navigation"><i class="fa fa-user"></i> Modificar Usuario</router-link></a>
                    <a class="dropdown-item" ><router-link :to="{ name: 'perfil' }" class="navbar-toggler collapsed" data-toggle="collapse" data-target="#navbarDefault"
                      aria-controls="navbarDefault" aria-expanded="false" aria-label="Toggle navigation"><i class="fa fa-user"></i> Perfil</router-link></a>
                    <a class="dropdown-item" ><router-link :to="{ name: 'Logout' }" class="navbar-toggler collapsed" data-toggle="collapse" data-target="#navbarDefault"
                      aria-controls="navbarDefault" aria-expanded="false" aria-label="Toggle navigation"> <i class="fa fa-sign-out"></i> Logout</router-link></a>
                  </div>
                </div>
                <router-link v-else :to="{ name: 'Login' }"  data-toggle="collapse" data-target="#navbarDefault"
                  aria-controls="navbarDefault" aria-expanded="false" aria-label="Toggle navigation"><nav class="fa fa-user" aria-hidden="true" style="color:white"></nav></router-link>
              </button>
            </div>
           <div class="navbar-collapse collapse justify-content-center" id="navbarDefault">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <router-link :to="{ name: 'index' }" class="nav-link navbar-toggler collapsed" data-toggle="collapse" data-target="#navbarDefault"
                    aria-controls="navbarDefault" aria-expanded="false" aria-label="Toggle navigation"><a class="nav-link">Inicio</a></router-link>
                </li>
                <li class="nav-item">
                  <router-link :to="{ name: 'clases' }" class="nav-link navbar-toggler collapsed" data-toggle="collapse" data-target="#navbarDefault"
                    aria-controls="navbarDefault" aria-expanded="false" aria-label="Toggle navigation"><a class="nav-link">Algoritmos</a></router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="{ name: 'contacto' }" class="nav-link navbar-toggler collapsed" data-toggle="collapse" data-target="#navbarDefault"
                      aria-controls="navbarDefault" aria-expanded="false" aria-label="Toggle navigation"><a class="nav-link">Contacto</a></router-link>
                </li>
              </ul>
           </div>




          <div class="navbar-collapse collapse justify-content-center" id="navbarDefault">

              <ul class="navbar-nav ocultar-en-escritorio">
                <li class="nav-item ">
                  <router-link :to="{ name: 'index' }" class="nav-link"><a class="navbar-brand text-brand"><img src="img/cloud-2044797_960_720.webp"  alt="favicon"  width="10%"> Code<span class="color-b">Cloud</span></a></router-link>
                </li>
                <li class="nav-item">
                  <router-link :to="{ name: 'clases' }" class="nav-link"><a class="nav-link">Algoritmos</a></router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="{ name: 'contacto' }" class="nav-link"><a class="nav-link">Contacto</a></router-link>
                </li>
              </ul>

          </div>
          <div class="navbar-collapse collapse justify-content-center ocultar-en-escritorio" id="navbarDefault" align="center">

               <button type="button" class="btn btn-b-n" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-expanded="false" >
                 <div class="dropdown"  v-if="loggedIn">
                   <a class="dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"style="color:white"><span class="fa fa-user" aria-hidden="true" style="color:white"></span></a>
                   <div class="dropdown-menu" aria-labelledby="login" >
                     <a class="dropdown-item" ><router-link :to="{ name: 'nuevoanuncio' }" class="na-link"><i class="fa fa-plus"></i> Nuevo Algoritmo</router-link></a>
                     <a class="dropdown-item" ><router-link :to="{ name: 'ModUsuario' }" class="na-link"><i class="fa fa-user"></i> Modificar Usuario</router-link></a>
                     <a class="dropdown-item" ><router-link :to="{ name: 'perfil' }" class="na-link"><i class="fa fa-user"></i> Perfil</router-link></a>
                     <a class="dropdown-item" ><router-link :to="{ name: 'Logout' }" class="na-link"> <i class="fa fa-sign-out"></i> Logout</router-link></a>
                   </div>
                 </div>
                 <router-link v-else :to="{ name: 'Login' }"><span class="fa fa-user" aria-hidden="true" style="color:white"></span></router-link>
               </button>
             </div>
        </div>
      </nav>

      <div class="">
        <transition name="fade">
          <router-view></router-view>
        </transition>
      </div>

      <section class="section-footer">
        <div class="container">
          <div class="row">
            <div class="col-sm-12 col-md-4">
              <div class="widget-a">
                <div class="w-header-a">
                  <h3 class="w-title-a text-brand"><img src="img/cloud-2044797_960_720.webp"  alt="favicon"  width="15%"> Code<span class="color-b">Cloud</span></h3>
                </div>
                <div class="w-body-a">
                  <p class="w-text-a color-a">
                    CosasDeClase consiste en una aplicación web basada en la idea de ayudar
                    a los alumnos de cualquier curso académico.
                  </p>
                </div>
                <div class="w-footer-a">
                  <ul class="list-unstyled">
                    <li class="color-text-a">
                      <span class="color-a">Email:</span> cosasdeclase@gmail.com</li>
                    <li class="color-text-a">
                      <span class="color-a">Teléfono:</span> +54 356 945234</li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-sm-12 col-md-4 section-md-t3">
              <div class="widget-a">
                <div class="w-header-a">
                  <h3 class="w-title-a text-brand">La empresa</h3>
                </div>
                <div class="w-body-a">
                  <div class="w-body-a">
                    <ul class="list-unstyled">
                      <li class="item-list-a">
                        <i class="fa fa-angle-right"></i><router-link :to="{ name: 'contacto' }" class="na-link">Mapa</router-link>
                      </li>
                      <li class="item-list-a">
                        <i class="fa fa-angle-right"></i><router-link :to="{ name: 'contacto' }" class="na-link">Contacto</router-link>
                      </li>
                      <li class="item-list-a">
                        <i class="fa fa-angle-right"></i><router-link :to="{ name: 'contacto' }" class="na-link">Afiliados</router-link>
                      </li>
                      <li class="item-list-a">
                        <i class="fa fa-angle-right"></i><router-link :to="{ name: 'contacto' }" class="na-link">Política de privacidad</router-link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-12 col-md-4 section-md-t3">
              <div class="widget-a">
                <div class="w-header-a">
                  <h3 class="w-title-a text-brand">Página web</h3>
                </div>
                <div class="w-body-a">
                  <ul class="list-unstyled">
                    <li class="item-list-a">
                      <i class="fa fa-angle-right"></i><router-link :to="{ name: 'index' }" class="na-link">Inicio</router-link>
                    </li>
                    <li class="item-list-a">
                      <i class="fa fa-angle-right"></i><router-link :to="{ name: 'clases' }" class="na-link">Clases Particulares</router-link>
                    </li>
                    <li class="item-list-a">
                      <i class="fa fa-angle-right"></i><router-link :to="{ name: 'apuntes' }" class="na-link">Apuntes</router-link>
                    </li>
                    <li class="item-list-a">
                      <i class="fa fa-angle-right"></i><router-link :to="{ name: 'noticias' }" class="na-link">Noticias</router-link>
                    </li>
                    <li class="item-list-a">
                      <i class="fa fa-angle-right"></i><router-link :to="{ name: 'contacto' }" class="na-link">Contacto</router-link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer>
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="socials-a">
                <ul class="list-inline">
                  <li class="list-inline-item">
                    <a href="#">
                      <i class="fa fa-facebook" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li class="list-inline-item">
                    <a href="#">
                      <i class="fa fa-twitter" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li class="list-inline-item">
                    <a href="#">
                      <i class="fa fa-instagram" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li class="list-inline-item">
                    <a href="#">
                      <i class="fa fa-pinterest-p" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li class="list-inline-item">
                    <a href="#">
                      <i class="fa fa-dribbble" aria-hidden="true"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>

    </body>
  </div>
</template>

<script>
class Buscador {
  constructor(busqueda = '',tipo = '',ciudad = '') {
    this.busqueda = busqueda;
    this.tipo = tipo;
    this.ciudad = ciudad;
  }
}

import { dollars } from './js/filters';

export default {
  name: 'App',
  data(){
    return{
      Productos: [],
      Buscador: new Buscador(),
    }
  },
  mounted() {
     this.$store.dispatch('get_user_data')
   },
  computed: {
    inCart() { return this.$store.getters.inCart; },
    numInCart() { return this.inCart.length; },
    cart() {
      return this.$store.getters.inCart.map((cartItem) => {
        return this.Productos.find((forSaleItem) => {
          return cartItem === forSaleItem._id;
        });
      });
    },
    total() {
      return this.cart.reduce((acc, cur) => acc + cur.price, 0);
    },
    loggedIn() {
      return this.$store.getters.loggedIn
    },
    isAdmin() {
      return this.$store.getters.isAdmin
    }
  },
  filters: {
    dollars,
  },
  created() {
    this.getProductos();
  },
  methods: {
    removeFromCart(index) { this.$store.dispatch('removeFromCart', index); },
    getProductos() {
      fetch('/api/CosasDeClase/Producto/')
        .then(res => res.json())
        .then(data => {
          this.Productos = data;
        });
    },
    addToPrev(invId) {
      console.log(invId)
      this.$store.dispatch('addToPrev', invId);
    },
  },
};
</script>
