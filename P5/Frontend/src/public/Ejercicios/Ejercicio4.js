if(retoRealizar == 4 || retoRealizar == 6 || retoRealizar == 8 ){

    var hexadecimal = new Array("1","2","3","4","5","6","7","A","B","C","D","E","F");
    var positiony = new Array("3", "-1", "-5", "3", "-1", "-5", "3", "-1", "-5","3", "-1", "-5","3", "-1", "-5", "3", "-1", "-5");
    var positionx = new Array("10", "-13", "16", "-13", "16", "10", "16" ,"10", "-13", "4", "4", "4", "-1", "-1", "-1", "-7", "-7", "-7" );

    var figuras = new Array("1", "2", "3","4", "5", "6", "7" );
    if(nivel == 1) 
    {
        var numerofiguras = new Array("1", "1", "1", "1", "1", "2", "3" );
    }
    else if(nivel == 2) 
    {
        var numerofiguras = new Array("1", "2", "1", "1", "1", "3", "4" );
    }
    else
    {
        var numerofiguras = new Array("1", "2", "2", "2", "1", "3", "5" );
    }

    var frases = new Array("Seleccione los cubos que giran.", "Seleccione los cilindros que giran.", "Seleccione las pirámides que giran.", "Seleccione los cubos que no giren.", "Seleccione los cilindros que no giren.", "Seleccione las pirámides que no giren.", "Seleccione las esferas que no giren." );

    var elementoAleatorio = numero_al_azar(0,6);

    document.getElementById("fraseSeleccioanda").innerHTML = frases[elementoAleatorio];

    var seleccioncubo1 = false;
    var seleccioncubo2 = false;

    var trianguloMaterial = new THREE.MeshBasicMaterial({
        vertexColors:THREE.VertexColors,
        side:THREE.DoubleSide
    });

    var cube = new THREE.Mesh(
        new THREE.CylinderGeometry( 1, 1, 3),
        new THREE.MeshPhongMaterial({ color: color_aleatorio })
      );
      cube.cursor = 'pointer';
  
      var elemento = numero_al_azar(0,positiony.length -1);
      cube.position.y = positiony[elemento];
      cube.position.x = positionx[elemento];
      positiony.splice(elemento,1);
      positionx.splice(elemento,1);
      cube.position.z = -10;
      cube.name = 'cube';

    color_aleatorio = "#";
    for (i=0;i<6;i++){
        posarray = numero_al_azar(0,hexadecimal.length - 1);
        color_aleatorio += hexadecimal[posarray]
     }
    
    var cube2 = new THREE.Mesh(
      new THREE.BoxGeometry(3, 3, 0),
      new THREE.MeshPhongMaterial({ color: color_aleatorio })
    );
    cube2.cursor = 'pointer';
    elemento = numero_al_azar(0,positiony.length -1);
    cube2.position.y = positiony[elemento];
    cube2.position.x = positionx[elemento];
    positiony.splice(elemento,1);
    positionx.splice(elemento,1);
    cube2.position.z = -10;
    cube2.name = 'cube';

    color_aleatorio = "#";
    for (i=0;i<6;i++){
        posarray = numero_al_azar(0,hexadecimal.length - 1);
        color_aleatorio += hexadecimal[posarray]
     }

    var cube3 = new THREE.Mesh(
        new THREE.CylinderGeometry( 1, 1, 3),
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

    var piramideGeometria = new THREE.CylinderGeometry(0, 1.2, 1.8, 4, 1, true);


    for(i = 0; i < piramideGeometria.faces.length; i++){
        piramideGeometria.faces[i].vertexColors[0] = new THREE.Color(0xFF0000);
        if((i % 2) == 0){
            piramideGeometria.faces[i].vertexColors[1] = new THREE.Color(0x00FF00);
            piramideGeometria.faces[i].vertexColors[2] = new THREE.Color(0x0000FF);
        } else {
            piramideGeometria.faces[i].vertexColors[1] = new THREE.Color(0x0000FF);
            piramideGeometria.faces[i].vertexColors[2] = new THREE.Color(0x00FF00);
        }
        piramideGeometria.faces[i].vertexColors[3] = new THREE.Color(0xFF0000);
    }


    for(i = 0; i < piramideGeometria.faces.length; i++){
        if(piramideGeometria.faces[i] instanceof THREE.Face4){
            piramideGeometria.faces[i].vertexColors[0] = new THREE.Color(0xFF0000);
            if((i % 2) == 0){
                piramideGeometria.faces[i].vertexColors[1] = new THREE.Color(0x00FF00);
                piramideGeometria.faces[i].vertexColors[2] = new THREE.Color(0x0000FF);
            } else {
                piramideGeometria.faces[i].vertexColors[1] = new THREE.Color(0x0000FF);
                piramideGeometria.faces[i].vertexColors[2] = new THREE.Color(0x00FF00);
            }
            piramideGeometria.faces[i].vertexColors[3] = new THREE.Color(0xFF0000);
        } else {
            piramideGeometria.faces[i].vertexColors[0] = new THREE.Color(0xFF0000);
            piramideGeometria.faces[i].vertexColors[1] = new THREE.Color(0x00FF00);
            piramideGeometria.faces[i].vertexColors[2] = new THREE.Color(0x0000FF);
        }
    }

    color_aleatorio = "#";
    for (i=0;i<6;i++){
        posarray = numero_al_azar(0,hexadecimal.length - 1);
        color_aleatorio += hexadecimal[posarray]
     }

    piramide5 = new THREE.Mesh(piramideGeometria, new THREE.MeshPhongMaterial({ color: color_aleatorio }));
    var elemento = numero_al_azar(0,positiony.length -1);
    piramide5.position.y = positiony[elemento];
    piramide5.position.x = positionx[elemento];
    positiony.splice(elemento,1);
    positionx.splice(elemento,1);
    piramide5.position.z = -10;
    piramide5.name = 'piramide5';
    scene.add(piramide5);


    color_aleatorio = "#";
    for (i=0;i<6;i++){
        posarray = numero_al_azar(0,hexadecimal.length - 1);
        color_aleatorio += hexadecimal[posarray]
     }

    piramide6 = new THREE.Mesh(piramideGeometria, new THREE.MeshPhongMaterial({ color: color_aleatorio }));
    var elemento = numero_al_azar(0,positiony.length -1);
    piramide6.position.y = positiony[elemento];
    piramide6.position.x = positionx[elemento];
    positiony.splice(elemento,1);
    positionx.splice(elemento,1);
    piramide6.position.z = -10;
    piramide6.name = 'piramide6';
    scene.add(piramide6);

    color_aleatorio = "#";
    for (i=0;i<6;i++){
        posarray = numero_al_azar(0,hexadecimal.length - 1);
        color_aleatorio += hexadecimal[posarray]
     }

    piramide7 = new THREE.Mesh(piramideGeometria, new THREE.MeshPhongMaterial({ color: color_aleatorio }));
    var elemento = numero_al_azar(0,positiony.length -1);
    piramide7.position.y = positiony[elemento];
    piramide7.position.x = positionx[elemento];
    positiony.splice(elemento,1);
    positionx.splice(elemento,1);
    piramide7.position.z = -10;
    piramide7.name = 'piramide7';
    scene.add(piramide7);

    scene.add(cube);
    scene.add(cube2);
    scene.add(cube3);
    scene.add(cube4);

    var geometry = new THREE.SphereGeometry(1, 32, 32);
    color_aleatorio = "#";
    for (i=0;i<6;i++){
        posarray = numero_al_azar(0,hexadecimal.length - 1);
        color_aleatorio += hexadecimal[posarray]
     }
    var earthmesh8 = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({ color: color_aleatorio }));

    var elemento = numero_al_azar(0,positiony.length -1);
    earthmesh8.position.y = positiony[elemento];
    earthmesh8.position.x = positionx[elemento];
    positiony.splice(elemento,1);
    positionx.splice(elemento,1);
    earthmesh8.position.z = -10;
    earthmesh8.name = 'earthmesh8';
    scene.add(earthmesh8);

    color_aleatorio = "#";
    for (i=0;i<6;i++){
        posarray = numero_al_azar(0,hexadecimal.length - 1);
        color_aleatorio += hexadecimal[posarray]
     }
    var earthmesh9 = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({ color: color_aleatorio }));

    var elemento = numero_al_azar(0,positiony.length -1);
    earthmesh9.position.y = positiony[elemento];
    earthmesh9.position.x = positionx[elemento];
    positiony.splice(elemento,1);
    positionx.splice(elemento,1);
    earthmesh9.position.z = -10;
    earthmesh9.name = 'earthmesh9';
    scene.add(earthmesh9);

    color_aleatorio = "#";
    for (i=0;i<6;i++){
        posarray = numero_al_azar(0,hexadecimal.length - 1);
        color_aleatorio += hexadecimal[posarray]
     }
    var earthmesh10 = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({ color: color_aleatorio }));

    var elemento = numero_al_azar(0,positiony.length -1);
    earthmesh10.position.y = positiony[elemento];
    earthmesh10.position.x = positionx[elemento];
    positiony.splice(elemento,1);
    positionx.splice(elemento,1);
    earthmesh10.position.z = -10;
    earthmesh10.name = 'earthmesh10';
    scene.add(earthmesh10);
    

    var ambient = new THREE.AmbientLight( 0x999999 );
    scene.add( ambient );
    var light = new THREE.PointLight(0xffffff);
    light.position.set(20, 50, 10);
    scene.add(light);

    var box = document.querySelector('#event-box');

    cube.on('click', function(ev) {

      seleccioncubo1 = true;
      Comprobacion(2);
    });

    cube2.on('click', function(ev) {

      seleccioncubo2 = true;
      Comprobacion(1);
    });

    cube3.on('click', function(ev) {
  
        Comprobacion(5);
    });

    cube4.on('click', function(ev) {
  
        Comprobacion(4);
    });

    piramide5.on('click', function(ev) {
  
        Comprobacion(3);
    });

    piramide6.on('click', function(ev) {
  
        Comprobacion(6);
    });

    piramide7.on('click', function(ev) {
  
        Comprobacion(6);
    });

    earthmesh8.on('click', function(ev) {
  
        Comprobacion(7);
    });

    earthmesh9.on('click', function(ev) {
  
        Comprobacion(7);
    });

    earthmesh10.on('click', function(ev) {
  
        Comprobacion(7);
    });

    if(nivel != 1)
    {
      color_aleatorio = "#";
      for (i=0;i<6;i++){
          posarray = numero_al_azar(0,hexadecimal.length - 1);
          color_aleatorio += hexadecimal[posarray]
       }
       
        var cube11 = new THREE.Mesh(
          new THREE.CylinderGeometry( 1, 1, 3),
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

        scene.add(cube11);
     
        cube11.on('click', function(ev) {
    
          seleccioncubo1 = true;
          Comprobacion(2);
        });

        color_aleatorio = "#";
        for (i=0;i<6;i++){
            posarray = numero_al_azar(0,hexadecimal.length - 1);
            color_aleatorio += hexadecimal[posarray]
         }
        var earthmesh13 = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({ color: color_aleatorio }));
    
        var elemento = numero_al_azar(0,positiony.length -1);
        earthmesh13.position.y = positiony[elemento];
        earthmesh13.position.x = positionx[elemento];
        positiony.splice(elemento,1);
        positionx.splice(elemento,1);
        earthmesh13.position.z = -10;
        earthmesh13.name = 'earthmesh13';
        scene.add(earthmesh13);

        earthmesh13.on('click', function(ev) {
      
            seleccioncubo1 = true;
            Comprobacion(7);
        });

          color_aleatorio = "#";
          for (i=0;i<6;i++){
              posarray = numero_al_azar(0,hexadecimal.length - 1);
              color_aleatorio += hexadecimal[posarray]
           }
      
          piramide15 = new THREE.Mesh(piramideGeometria, new THREE.MeshPhongMaterial({ color: color_aleatorio }));
          var elemento = numero_al_azar(0,positiony.length -1);
          piramide15.position.y = positiony[elemento];
          piramide15.position.x = positionx[elemento];
          positiony.splice(elemento,1);
          positionx.splice(elemento,1);
          piramide15.position.z = -10;
          piramide15.name = 'piramide15';
          scene.add(piramide15);

          piramide15.on('click', function(ev) {
      
            seleccioncubo1 = true;
            Comprobacion(6);
        });
    

        if(nivel == 3)
        {
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
          cube12.name = 'cube12';

          color_aleatorio = "#";
          for (i=0;i<6;i++){
              posarray = numero_al_azar(0,hexadecimal.length - 1);
              color_aleatorio += hexadecimal[posarray]
           }

          scene.add(cube12);

          cube12.on('click', function(ev) {
      
            seleccioncubo1 = true;
            Comprobacion(4);
        });

          var earthmesh14 = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({ color: color_aleatorio }));
    
          var elemento = numero_al_azar(0,positiony.length -1);
          earthmesh14.position.y = positiony[elemento];
          earthmesh14.position.x = positionx[elemento];
          positiony.splice(elemento,1);
          positionx.splice(elemento,1);
          earthmesh14.position.z = -10;
          earthmesh14.name = 'earthmesh14';
          scene.add(earthmesh14);
  
          earthmesh14.on('click', function(ev) {
        
              seleccioncubo1 = true;
              Comprobacion(7);
            });


            piramide16 = new THREE.Mesh(piramideGeometria, new THREE.MeshPhongMaterial({ color: color_aleatorio }));
            var elemento = numero_al_azar(0,positiony.length -1);
            piramide16.position.y = positiony[elemento];
            piramide16.position.x = positionx[elemento];
            positiony.splice(elemento,1);
            positionx.splice(elemento,1);
            piramide16.position.z = -10;
            piramide16.name = 'piramide16';
            scene.add(piramide16);

            piramide16.on('click', function(ev) {
          
                seleccioncubo1 = true;
                Comprobacion(3);
            });
    
        }
    }
    
    var elementosSeleccionados = 0;
    
    function Comprobacion(elemento){
      if(elemento == figuras[elementoAleatorio])
      {
        elementosSeleccionados++;
        if(elementosSeleccionados == numerofiguras[elementoAleatorio])
        {
            var tiempoPuntuacion = (tiempo - 10) * -1;
            var puntuacion = tiempoPuntuacion * 10 * nivel;
            puntuacionFinal = puntuacionFinal + puntuacion;
            document.getElementById("puntuacionFinal").innerHTML = puntuacionFinal;
            document.getElementById("puntuacion").innerHTML = puntuacion;
            $('#aciertoModal').modal('show');  
            resultadoFinal = true;
        }
      }
      else 
      {
        errores++;
        document.getElementById("errores").innerHTML = errores;
        $('#falloModal').modal('show'); 
        document.getElementById("puntuacionFinalerror").innerHTML = puntuacionFinal;
        resultadoFinal = true;
      }

      document.getElementById("puntuacionFinalBueno").innerHTML = puntuacionFinal;
      document.getElementById("puntuacionFinalMalo").innerHTML = puntuacionFinal;
    }

    function revisar(){

        document.getElementById("Siguiente").style.display = "block";
        document.getElementById("Inicio").style.display = "block";

        var tiempo = 200;
        
        tiempo = eliminarCubo(tiempo);
        tiempo = eliminarpiramide(tiempo);
        if(elementoAleatorio != 6){
            tiempo = eliminaresfera(tiempo);
        }
      }

    function eliminarCubo(tiempo){

        if(elementoAleatorio != 1){
            timout=setTimeout(function(){
                scene.remove(cube); 
              },tiempo,"JavaScript");
    
              tiempo += 200;    
        }
        
        if(elementoAleatorio != 0){
            timout=setTimeout(function(){
            scene.remove(cube2); 
            },tiempo,"JavaScript");

            tiempo += 200;
        }
  
        if(elementoAleatorio != 4){
            timout=setTimeout(function(){
            scene.remove(cube3); 
            },tiempo,"JavaScript");

            tiempo += 200;
        }

        if(elementoAleatorio != 3){
            timout=setTimeout(function(){
            scene.remove(cube3); 
            },tiempo,"JavaScript");

            tiempo += 200;

            timout=setTimeout(function(){
            scene.remove(cube4); 
            },tiempo,"JavaScript");
            tiempo += 200;
        }

        if(nivel != 1)
        {
            
            if(elementoAleatorio != 1){

                timout=setTimeout(function(){
                    scene.remove(cube11); 
                },tiempo,"JavaScript");

                tiempo += 200;
            }

            if(nivel == 3){
                if(elementoAleatorio != 3){

                    timout=setTimeout(function(){
                    scene.remove(cube12); 
                    },tiempo,"JavaScript");

                    tiempo += 200;
                }
            }
        }

        return tiempo; 
    }

    function eliminarpiramide(tiempo){

        if(elementoAleatorio != 2){
            timout=setTimeout(function(){
                scene.remove(piramide5); 
              },tiempo,"JavaScript");
    
              tiempo += 200;
        }
        if(elementoAleatorio != 5){
            timout=setTimeout(function(){
            scene.remove(piramide6); 
            },tiempo,"JavaScript");

            tiempo += 200;

            timout=setTimeout(function(){
                scene.remove(piramide7); 
            },tiempo,"JavaScript");

            tiempo += 200;
        }

        if(nivel != 1)
        {
            if(elementoAleatorio != 5){

                timout=setTimeout(function(){
                    scene.remove(piramide15); 
                },tiempo,"JavaScript");

                tiempo += 200;
            }

            if(nivel == 3){
                if(elementoAleatorio != 2){

                    timout=setTimeout(function(){
                    scene.remove(piramide16); 
                    },tiempo,"JavaScript");

                    tiempo += 200;
                }
            }
        }

        return tiempo; 
    }

    function eliminaresfera(tiempo){

        timout=setTimeout(function(){
            scene.remove(earthmesh8); 
          },tiempo,"JavaScript");

          tiempo += 200;
  
        timout=setTimeout(function(){
          scene.remove(earthmesh9); 
        },tiempo,"JavaScript");

        tiempo += 200;

        timout=setTimeout(function(){
            scene.remove(earthmesh10); 
          },tiempo,"JavaScript");

        tiempo += 200;

        if(nivel != 1)
        {

            timout=setTimeout(function(){
                scene.remove(earthmesh13); 
              },tiempo,"JavaScript");

              tiempo += 200;

            if(nivel == 3){

                timout=setTimeout(function(){
                scene.remove(earthmesh14); 
                },tiempo,"JavaScript");

                tiempo += 200;
            }
        }

        return tiempo; 
    }


    function render() {
        renderer.render(scene, camera);

        cube.rotation.x += 0.02;
        cube.rotation.y += 0.02;
        cube.rotation.z += 0.02;

        cube2.rotation.x += 0.02;
        cube2.rotation.y += 0.02;
        cube2.rotation.z += 0.02;

        piramide5.rotation.y += 0.02;
        piramide5.rotation.z += 0.02;

        if(nivel != 1){

            cube11.rotation.x -= 0.02;
            cube11.rotation.y -= 0.02;
            cube11.rotation.z -= 0.02;

            if(nivel ==3){
                piramide16.rotation.y -= 0.02;
                piramide16.rotation.z -= 0.02;
            }
        }

        
        requestAnimationFrame(render);
      }
      render();
}
