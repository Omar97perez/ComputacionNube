if(retoRealizar == 1 ){
    document.getElementById("fraseSeleccioanda").innerHTML = "Seleccione los cuadrados blancos";
    var hexadecimal = new Array("1","2","3","4","5","6","7","A","B","C","D","E","F");
    var positiony = new Array("3", "-1", "-5", "3", "-1", "-5", "3", "-1", "-5","3", "-1", "-5","3", "-1", "-5", "3", "-1", "-5");
    var positionx = new Array("10", "-13", "16", "-13", "16", "10", "16" ,"10", "-13", "4", "4", "4", "-1", "-1", "-1", "-7", "-7", "-7" );

    var frases = new Array("Seleccione los dos cuadrados rojos", "Seleccione los dos cuadrados blancos", "Seleccione los dos cuadrados negros");
    var colores = new Array("#b84147", "#ffffff", "#000000");

    var elementoAleatorio = numero_al_azar(0,2);

    document.getElementById("fraseSeleccioanda").innerHTML = frases[elementoAleatorio];

    var seleccioncubo1 = false;
    var seleccioncubo2 = false;

    var cube = new THREE.Mesh(
      new THREE.BoxGeometry(3, 3, 0),
      new THREE.MeshBasicMaterial({ color: colores[elementoAleatorio] })
    );
    cube.cursor = 'pointer';

    var elemento = numero_al_azar(0,positiony.length -1);
    cube.position.y = positiony[elemento];
    cube.position.x = positionx[elemento];
    positiony.splice(elemento,1);
    positionx.splice(elemento,1);
    cube.position.z = -10;
    cube.name = 'cube';
    
    var cube2 = new THREE.Mesh(
      new THREE.BoxGeometry(3, 3, 0),
      new THREE.MeshPhongMaterial({ color: colores[elementoAleatorio] })
    );
    cube2.cursor = 'pointer';
    elemento = numero_al_azar(0,positiony.length -1);
    cube2.position.y = positiony[elemento];
    cube2.position.x = positionx[elemento];
    positiony.splice(elemento,1);
    positionx.splice(elemento,1);
    cube2.position.z = -10;
    cube2.name = 'cube';

    var color_aleatorio = "#";
    for (i=0;i<6;i++){
        posarray = numero_al_azar(0,hexadecimal.length - 1);
        color_aleatorio += hexadecimal[posarray]
     }

    var cube3 = new THREE.Mesh(
      new THREE.BoxGeometry(3, 3, 0),
      new THREE.MeshPhongMaterial({ color: color_aleatorio })
    );
    cube3.cursor = 'pointer';
    elemento = numero_al_azar(0,positiony.length -1);
    cube3.position.y = positiony[elemento];
    cube3.position.x = positionx[elemento];
    positiony.splice(elemento,1);
    positionx.splice(elemento,1);
    cube3.position.z = -10;
    cube3.name = 'cube';
    
    color_aleatorio = "#";
    for (i=0;i<6;i++){
        posarray = numero_al_azar(0,hexadecimal.length - 1);
        color_aleatorio += hexadecimal[posarray]
     }

    var cube4 = new THREE.Mesh(
      new THREE.BoxGeometry(3, 3, 0),
      new THREE.MeshPhongMaterial({ color: color_aleatorio })
    );
    cube4.cursor = 'pointer';
    elemento = numero_al_azar(0,positiony.length -1);
    cube4.position.y = positiony[elemento];
    cube4.position.x = positionx[elemento];
    positiony.splice(elemento,1);
    positionx.splice(elemento,1);
    cube4.position.z = -10;
    cube4.name = 'cube';

    color_aleatorio = "#";
    for (i=0;i<6;i++){
        posarray = numero_al_azar(0,hexadecimal.length - 1);
        color_aleatorio += hexadecimal[posarray]
     }

    var cube5 = new THREE.Mesh(
      new THREE.BoxGeometry(3, 3, 0),
      new THREE.MeshPhongMaterial({ color: color_aleatorio })
    );
    cube5.cursor = 'pointer';
    elemento = numero_al_azar(0,positiony.length -1);
    cube5.position.y = positiony[elemento];
    cube5.position.x = positionx[elemento];
    positiony.splice(elemento,1);
    positionx.splice(elemento,1);
    cube5.position.z = -10;
    cube5.name = 'cube';

    color_aleatorio = "#";
    for (i=0;i<6;i++){
        posarray = numero_al_azar(0,hexadecimal.length - 1);
        color_aleatorio += hexadecimal[posarray]
     }

    var cube6 = new THREE.Mesh(
      new THREE.BoxGeometry(3, 3, 0),
      new THREE.MeshPhongMaterial({ color: color_aleatorio })
    );
    cube6.cursor = 'pointer';
    elemento = numero_al_azar(0,positiony.length -1);
    cube6.position.y = positiony[elemento];
    cube6.position.x = positionx[elemento];
    positiony.splice(elemento,1);
    positionx.splice(elemento,1);
    cube6.position.z = -10;
    cube6.name = 'cube';
    

    if(nivel != 1)
    {
      color_aleatorio = "#";
      for (i=0;i<6;i++){
          posarray = numero_al_azar(0,hexadecimal.length - 1);
          color_aleatorio += hexadecimal[posarray]
       }
       
        var cube7 = new THREE.Mesh(
          new THREE.BoxGeometry(3, 3, 0),
          new THREE.MeshPhongMaterial({ color: color_aleatorio })
        );
        cube7.cursor = 'pointer';
        elemento = numero_al_azar(0,positiony.length -1);
        cube7.position.y = positiony[elemento];
        cube7.position.x = positionx[elemento];
        positiony.splice(elemento,1);
        positionx.splice(elemento,1);
        cube7.position.z = -10;
        cube7.name = 'cube';

        color_aleatorio = "#";
        for (i=0;i<6;i++){
            posarray = numero_al_azar(0,hexadecimal.length - 1);
            color_aleatorio += hexadecimal[posarray]
         }

        var cube8 = new THREE.Mesh(
          new THREE.BoxGeometry(3, 3, 0),
          new THREE.MeshPhongMaterial({ color: color_aleatorio })
        );
        cube8.cursor = 'pointer';
        elemento = numero_al_azar(0,positiony.length -1);
        cube8.position.y = positiony[elemento];
        cube8.position.x = positionx[elemento];
        positiony.splice(elemento,1);
        positionx.splice(elemento,1);
        cube8.position.z = -10;
        cube8.name = 'cube';

        scene.add(cube7);
        scene.add(cube8);

        cube7.on('click', function(ev) {
    
          seleccioncubo1 = true;
          Comprobacion(1);
        });
    
        cube8.on('click', function(ev) {
    
          seleccioncubo2 = true;
          Comprobacion(2);
        });

        if(nivel == 3)
        {
          color_aleatorio = "#";
          for (i=0;i<6;i++){
              posarray = numero_al_azar(0,hexadecimal.length - 1);
              color_aleatorio += hexadecimal[posarray]
           }

          var cube9 = new THREE.Mesh(
            new THREE.BoxGeometry(3, 3, 0),
            new THREE.MeshPhongMaterial({ color: color_aleatorio })
          );
          cube9.cursor = 'pointer';
          elemento = numero_al_azar(0,positiony.length -1);
          cube9.position.y = positiony[elemento];
          cube9.position.x = positionx[elemento];
          positiony.splice(elemento,1);
          positionx.splice(elemento,1);
          cube9.position.z = -10;
          cube9.name = 'cube';

          color_aleatorio = "#";
          for (i=0;i<6;i++){
              posarray = numero_al_azar(0,hexadecimal.length - 1);
              color_aleatorio += hexadecimal[posarray]
           }
  
          var cube10 = new THREE.Mesh(
            new THREE.BoxGeometry(3, 3, 0),
            new THREE.MeshPhongMaterial({ color: color_aleatorio })
          );
          cube10.cursor = 'pointer';
          elemento = numero_al_azar(0,positiony.length -1);
          cube10.position.y = positiony[elemento];
          cube10.position.x = positionx[elemento];
          positiony.splice(elemento,1);
          positionx.splice(elemento,1);
          cube10.position.z = -10;
          cube10.name = 'cube';

          color_aleatorio = "#";
          for (i=0;i<6;i++){
              posarray = numero_al_azar(0,hexadecimal.length - 1);
              color_aleatorio += hexadecimal[posarray]
           }

          var cube11 = new THREE.Mesh(
            new THREE.BoxGeometry(3, 3, 0),
            new THREE.MeshPhongMaterial({ color: color_aleatorio })
          );
          cube11.cursor = 'pointer';
          elemento = numero_al_azar(0,positiony.length -1);
          cube11.position.y = positiony[elemento];
          cube11.position.x = positionx[elemento];
          positiony.splice(elemento,1);
          positionx.splice(elemento,1);
          cube11.position.z = -10;
          cube11.name = 'cube';

          color_aleatorio = "#";
          for (i=0;i<6;i++){
              posarray = numero_al_azar(0,hexadecimal.length - 1);
              color_aleatorio += hexadecimal[posarray]
           }

          var cube12 = new THREE.Mesh(
            new THREE.BoxGeometry(3, 3, 0),
            new THREE.MeshPhongMaterial({ color: color_aleatorio })
          );
          cube12.cursor = 'pointer';
          elemento = numero_al_azar(0,positiony.length -1);
          cube12.position.y = positiony[elemento];
          cube12.position.x = positionx[elemento];
          positiony.splice(elemento,1);
          positionx.splice(elemento,1);
          cube12.position.z = -10;
          cube12.name = 'cube';

          scene.add(cube9);
          scene.add(cube10);
          scene.add(cube11);
          scene.add(cube12);

          cube9.on('click', function(ev) {
      
            seleccioncubo1 = true;
            Comprobacion(9);
          });
      
          cube10.on('click', function(ev) {
      
            seleccioncubo2 = true;
            Comprobacion(10);
          });

          cube11.on('click', function(ev) {
      
            seleccioncubo1 = true;
            Comprobacion(11);
          });
      
          cube12.on('click', function(ev) {
      
            seleccioncubo2 = true;
            Comprobacion(12);
          });
        }
    }
    
    scene.add(cube);
    scene.add(cube2);
    scene.add(cube3);
    scene.add(cube4);
    scene.add(cube5);
    scene.add(cube6);

    var ambient = new THREE.AmbientLight( 0x999999 );
    scene.add( ambient );
    var light = new THREE.PointLight(0xffffff);
    light.position.set(20, 50, 10);
    scene.add(light);

    var box = document.querySelector('#event-box');

    cube.on('click', function(ev) {

      seleccioncubo1 = true;
      Comprobacion(1);
    });

    cube2.on('click', function(ev) {

      seleccioncubo2 = true;
      Comprobacion(2);
    });

    cube3.on('click', function(ev) {
  
        Comprobacion(3);
    });

    cube4.on('click', function(ev) {
  
        Comprobacion(4);
    });

    cube5.on('click', function(ev) {
  
        Comprobacion(5);
    });

    cube6.on('click', function(ev) {
  
        Comprobacion(6);
    });

    function revisar(){

      document.getElementById("Siguiente").style.display = "block";
      document.getElementById("Inicio").style.display = "block";

      scene.remove(cube3); 

      timout=setTimeout(function(){
        scene.remove(cube4); 
      },200,"JavaScript");

      timout=setTimeout(function(){
        scene.remove(cube5); 
      },400,"JavaScript");

      timout=setTimeout(function(){
        scene.remove(cube6); 
      },600,"JavaScript");

      if(nivel != 1){
        timout=setTimeout(function(){
          scene.remove(cube7); 
        },800,"JavaScript");
  
        timout=setTimeout(function(){
          scene.remove(cube8); 
        },1000,"JavaScript");
  
        if(nivel == 3){
          timout=setTimeout(function(){
            scene.remove(cube9); 
          },1200,"JavaScript");
    
          timout=setTimeout(function(){
            scene.remove(cube10); 
          },1400,"JavaScript");

          timout=setTimeout(function(){
            scene.remove(cube11); 
          },1600,"JavaScript");
    
          timout=setTimeout(function(){
            scene.remove(cube12); 
          },1800,"JavaScript");
        }
      }

    }
    
    function Comprobacion(elemento){
      if(elemento == 1)
      {
        if(seleccioncubo2 == true){
            var tiempoPuntuacion = (tiempo - 10) * -1;
            var puntuacion = tiempoPuntuacion * 10;
            puntuacionFinal = puntuacionFinal + puntuacion;
            document.getElementById("puntuacionFinal").innerHTML = puntuacionFinal;
            document.getElementById("puntuacion").innerHTML = puntuacion;
            $('#aciertoModal').modal('show');  
        }
      }
      else if(elemento == 2)
      {
        if(seleccioncubo1 == true){
            var tiempoPuntuacion = (tiempo - 10) * -1;
            var puntuacion = tiempoPuntuacion * 10 * nivel;
            puntuacionFinal = puntuacionFinal + puntuacion;
            document.getElementById("puntuacionFinal").innerHTML = puntuacionFinal;
            document.getElementById("puntuacion").innerHTML = puntuacion;
            $('#aciertoModal').modal('show');  
        }
      }
      else{
        errores++;
        document.getElementById("errores").innerHTML = errores;
        $('#falloModal').modal('show'); 
        document.getElementById("puntuacionFinalerror").innerHTML = puntuacionFinal;
      }
      document.getElementById("puntuacionFinalBueno").innerHTML = puntuacionFinal;
      document.getElementById("puntuacionFinalMalo").innerHTML = puntuacionFinal;
      resultadoFinal = true;
    }
    function render() {
      renderer.render(scene, camera);
      requestAnimationFrame(render);
    }
    render();
}