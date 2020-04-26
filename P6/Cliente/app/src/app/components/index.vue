Productos_clases<template>
  <div>

      <section class="intro-single">
        <div class="intro-carousel">
          <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
              <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            </ol>
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img class="d-block w-100" src="img/slide-1.jpg" alt="First slide">
              </div>
              <div class="carousel-item">
                <img class="d-block w-100" src="img/slide-2.jpg" alt="Second slide">
              </div>
              <div class="carousel-item">
                <img class="d-block w-100" src="img/slide-3.jpg" alt="Third slide">
              </div>
            </div>
            <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="sr-only">Next</span>
            </a>
          </div>
        </div>
      </section>

        <section class="section-services section-t8">
          <div class="container">
            <div class="row">
              <div class="col-md-12">
                <div class="title-wrap d-flex justify-content-between">
                  <div class="title-box">
                    <h2 class="title-a">Nuestros servicios</h2>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4">
                <div class="card-box-c foo">
                  <div class="card-header-c d-flex">
                    <div class="card-box-ico">
                      <span class="fas fa-cloud-upload-alt"></span>                    
                    </div>
                    <div class="card-title-c align-self-center">
                      <h2 class="title-c">Sube</h2>
                    </div>
                  </div>
                  <div class="card-body-c">
                    <p class="content-c">
                      Sube tus algoritmos al servidor a través de unas especificaciones.
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="card-box-c foo">
                  <div class="card-header-c d-flex">
                    <div class="card-box-ico">
                      <span class="fa fa-clock-o"></span>
                    </div>
                    <div class="card-title-c align-self-center">
                      <h2 class="title-c">Ejecutas</h2>
                    </div>
                  </div>
                  <div class="card-body-c">
                    <p class="content-c">
                      Ejecuta tu algoritmo pidiendo los parámetros necesarios.
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="card-box-c foo">
                  <div class="card-header-c d-flex">
                    <div class="card-box-ico">
                      <span class="fa fa-eye"></span>
                    </div>
                    <div class="card-title-c align-self-center">
                      <h2 class="title-c">Observa</h2>
                    </div>
                  </div>
                  <div class="card-body-c">
                    <p class="content-c">
                      Observa el resultado de forma muy sencilla.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="section-news section-t8">
          <div class="container">
            <div class="row">
              <div class="col-md-12">
                <div class="title-wrap d-flex justify-content-between">
                  <div class="title-box">
                    <h2 class="title-a">Algoritmos</h2>
                  </div>
                  <div class="title-link">
                    <router-link :to="{ name: 'clases' }" ><a >Resto de algoritmos <span class="ion-ios-arrow-forward"></span></a></router-link>
                  </div>
                </div>
              </div>
            </div>
            <div id="carouselclases" class="carousel slide" data-ride="carousel">
            <!-- Indicador del carousel -->
            <ol class="carousel-indicators" style="margin-bottom: 0rem!important;">
              <li data-target="#carouselclases" data-slide-to="0" class="active" style="background-color: black!important;"></li>
              <li data-target="#carouselclases" data-slide-to="1" style="background-color: black!important;"></li>
              <li data-target="#carouselclases" data-slide-to="2" style="background-color: black!important;"></li>
            </ol>
            <!-- Objetos del carousel -->
            <div class="carousel-inner">
              <div class="item carousel-item active">
                <div class="row">
                  <div class="col-lg-1"></div>
                  <div v-for="Producto of Productos_clases.slice(0,3)" class="col-lg-3 col-md-4 col-s-6 card border-dark mb-4 box-shadow ml-lg-4 ml-md-2">
                    <div class="card-header">
                      <h4 class="my-0 font-weight-normal">{{Producto.Name}}</h4>
                    </div>
                    <div class="card-body">
                      <p>{{Producto.Description}}</p>
                      <button type="button" data-toggle="modal" data-target="#ModalEjecutarMetodo" class="btn btn-lg btn-block btn-dark">Ejecutar</button>
                    </div>
                  </div>
                </div>
              </div>

              <div class="item carousel-item">
                <div class="row">
                  <div class="col-lg-1"></div>
                  <div v-for="Producto of Productos_clases.slice(3,6)" class="col-lg-3 col-md-4 col-s-6 card border-dark mb-4 box-shadow ml-lg-4 ml-md-2">
                    <div class="card-header">
                      <h4 class="my-0 font-weight-normal">{{Producto.Name}}</h4>
                    </div>
                    <div class="card-body">
                      <p>{{Producto.Description}}</p>
                      <button type="button" data-toggle="modal" data-target="#ModalEjecutarMetodo" class="btn btn-lg btn-block btn-dark">Ejecutar</button>
                    </div>
                  </div>
                </div>
              </div>

              <div class="item carousel-item">
                <div class="row">
                  <div class="col-lg-1 col--1"></div>
                  <div v-for="Producto of Productos_clases.slice(6,9)" class="col-md-4  col-lg-3 col-s-6 card border-dark mb-4 box-shadow ml-lg-4 ml-md-2">
                    <div class="card-header">
                      <h4 class="my-0 font-weight-normal">{{Producto.Name}}</h4>
                    </div>
                    <div class="card-body">
                      <p>{{Producto.Description}}</p>
                      <button type="button" data-toggle="modal" data-target="#ModalEjecutarMetodo" class="btn btn-lg btn-block btn-dark">Ejecutar</button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            <a class="carousel-control-prev" href="#carouselclases" role="button" data-slide="prev" align="ledt">
              <i class="fas fa-less-than"></i>              
              <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselclases" role="button" data-slide="next">
              <i class="fas fa-greater-than"></i>              
              <span class="sr-only">Next</span>
            </a>
            </div>
          </div>
        </section>
  </div>

</template>

<script>
  export default {
    name: 'app',
    data() {
      return {
        Productos_clases: [],
        Productos_apuntes: [],
        Productos_noticias: [],
      }
    },
    created() {
      this.getProductos_clases();
    },
    methods: {
      getProductos_clases() {
        fetch('/api/Get/Methods')
          .then(res => res.json())
          .then(data => {
            this.Productos_clases = data["Methods"];
          });
      },
      addToPrev(invId) {
        this.$store.dispatch('addToPrev', invId);
      },
    }
  };
</script>
