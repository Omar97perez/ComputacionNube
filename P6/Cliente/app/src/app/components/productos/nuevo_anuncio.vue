<template>
  <div>
    <!--/ Intro Single star /-->
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
            <h3 class="font-weight-bold">Json Methodo</h3>
            <input type="file" id="fileJSON">
            <h3 class="font-weight-bold mt-4">Archivo comprimido (formato .zip)</h3>
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
     
    }
  },
  created() {
   
  },

  methods: {
    SubirMetodo() {
      this.executeAjaxRequest();
      var formData = new FormData();
      formData.append("file", document.getElementById("fileJSON").files[0]);
      formData.append("file", document.getElementById("fileMethod").files[0]);

      $.ajax({
          url: "/api/Upload/Method",
          type: "POST",
          data: formData,
          processData: false,
          contentType: false,
          success: function(response) {
            var int=self.setInterval("document.getElementById('loading').className = '';document.getElementById('alert').className= 'alert alert-success mt-3';document.getElementById('alert').innerHTML= 'El Algoritmo se ha subido correctamente'",6000);
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
