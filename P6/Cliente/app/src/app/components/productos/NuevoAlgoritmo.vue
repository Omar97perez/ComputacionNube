<template>
  <div>
    <section class="intro-single">
      <div class="container">
        <div class="row">
          <div class="col-md-12 col-lg-8">
            <div class="title-single-box">
              <h1 class="title-single">Nuevo Algoritmo</h1>
            </div>
          </div>
        </div>
          <div id="alert">
          </div>
      </div>

      <div class="form-group col-sm-4 col-sm-offset-4 text-center">
        <div id="loading"></div>
      </div>
      
      <div class="container mt-5" align="center">
          <h3 class="font-weight-bold">Seguridad</h3>
          <p>Para obtener mayor seguridad. Por favor, escriba su email y contraseña nuevamente.</p>
          <h4 class="mt-3">Email</h4>
          <input type="email" v-model="email" class="form-control col-md-6 col-xs-12" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
          <h4 class="mt-3">Contraseña</h4>
          <input type="password" v-model="password" class="form-control col-md-6 col-xs-12" id="exampleInputEmail1" aria-describedby="emailHelp">

          <h3 class="font-weight-bold mt-5">Archivos Métodos</h3>
          <h4 class="mt-3">Json Methodo</h4>
          <input type="file" id="fileJSON">
          <h4 class="mt-4">Archivo comprimido (formato .zip)</h4>
          <input type="file" id="fileMethod">
          <div class="row">
            <div class="col-6 mt-5" align="right">
              <button type="button" class="btn btn-primary" @click="SubirMetodo()">Enviar</button>
            </div>
            <div class="col-6 mt-5" align="left">
              <router-link :to="{ name: 'index' }"><button type="button" class="btn btn-danger">Cancelar</button></router-link>
            </div>
          </div>
      </div>
    </section>
  </div>
</template>

<script>

export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },

  created() {},

  methods: {
    SubirMetodo() {
      var URL = "/api/authenticate/" + this.email + "/" + this.password;
      this.executeAjaxRequest();
      var formData = new FormData();
      formData.append("file", document.getElementById("fileJSON").files[0]);
      formData.append("file", document.getElementById("fileMethod").files[0]);

      document.getElementById('alert').className= '';
      document.getElementById('alert').innerHTML= '';

      $.ajax({
          url: URL,
          type: "POST",
          data: formData,
          processData: false,
          contentType: false,
          success: function(response) {
            if(!response){
              var int=self.setInterval("document.getElementById('loading').className = '';document.getElementById('alert').className= 'alert alert-danger mt-3';document.getElementById('alert').innerHTML= 'Los datos de Inicio de sesión son incorrectos.'",6000);
            }
            else{
              URL = "/api/Upload/Method/" + response;
              $.ajax({
                  url: URL,
                  type: "POST",
                  data: formData,
                  processData: false,
                  contentType: false,
                  success: function(response) {
                    if(!response){
                      var int=self.setInterval("document.getElementById('loading').className = '';document.getElementById('alert').className= 'alert alert-danger mt-3';document.getElementById('alert').innerHTML= 'Ha ocurrido un problema con el servidor. Inténtelo de nuevo más tarde.'",6000);
                    }
                    else{
                      var int=self.setInterval("document.getElementById('loading').className = '';document.getElementById('alert').className= 'alert alert-success mt-3';document.getElementById('alert').innerHTML= 'El Algoritmo se ha subido correctamente.'",6000);
                    }
                  },
                  error: function(jqXHR, textStatus, errorMessage) {
                      console.log(errorMessage); 
                  }
              });
            }
          },
          error: function(jqXHR, textStatus, errorMessage) {
              console.log(errorMessage); 
          }
      });
    },
    executeAjaxRequest() {
      document.getElementById("loading").className = "loading";
    },
    Endrefresh()
    {
        document.getElementById("loading").className = "";
    }
  },
  computed:  {

  },
}
</script>
