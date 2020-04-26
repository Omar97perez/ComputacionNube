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
      </div>
    </section>
    <!--/ Intro Single End /-->

    <!--/ Property Grid Star /-->
      <section class="property-grid grid">
        <div class="container" align="center">
            <h3 class="font-weight-bold">Json Methodo</h3>
            <input type="file" id="fileJSON">
            <h3 class="font-weight-bold mt-4">Archivo comprimido (formato .zip)</h3>
            <input type="file" id="fileMethod">
            <div class="col-12 mt-5" align="center">
              <button type="button" class="btn btn-primary" @click="SubirMetodo()">Enviar</button>
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
              executeAjaxRequest();
              var int=self.setInterval("Endrefresh()",6000);
          },
          error: function(jqXHR, textStatus, errorMessage) {
              console.log(errorMessage); 
          }
      });
    }
  },
  computed:  {

  },
}
</script>
