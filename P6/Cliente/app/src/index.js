require('rootpath')()
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const jwt = require('./authentication/backend/_services/jwt')
const errorHandler = require('./authentication/backend/_services/error-handler')
const path = require('path');
const multer = require('multer');
let fs = require('fs');
var request = require('request');
const axios = require('axios')
const userService = require('./authentication/backend/users/user-service.js')


const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
app.use('/users', require('./authentication/backend/users/users-controller'))
app.use(errorHandler)
app.use(express.static('public'));

// Permite Subir Imagenes
let storage = multer.diskStorage({
	destination:(req, file, cb) => {
		cb(null, './app/src/Servidor/Archivos')
	},
	filename: (req, file, cb) => {
		cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
	}
});

const upload = multer({storage});

// Permite Subir Hojas de Cálculo
storage = multer.diskStorage({
	destination:(req, file, cb) => {
		cb(null, './app/src/Servidor/EstructuraMetodos')
	},
	filename: (req, file, cb) => {
		cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
	}
});

const uploadMethod = multer({storage});

// app.use(express.json());
// app.use(express.urlencoded({extended: true}));

function executeUnzip(filename, site){
	require('child_process').execSync('sudo unzip ' + filename + " -d " + site);
}

function executeMake(nameMethod){
	require('child_process').execSync("sudo make -C ./app/src/Servidor/Metodos/" + nameMethod) + " all";
}

//Conexión con la base de datos, cuando se despliegue en servidor  se tendrá que cambiar la dirección
mongoose.connect('mongodb://omar:antonio1997@cluster0-shard-00-00-svm5b.mongodb.net:27017,cluster0-shard-00-01-svm5b.mongodb.net:27017,cluster0-shard-00-02-svm5b.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true')
  .then(db => console.log('DB conectada')) //Imprimir DB conectada en caso de que todo vaya bien
  .catch(err => console.error(err)); //Imprime error si no se puedo conectar

//Ajustes
  //Si el servidor tiene puerto lo coge sino pone el puerto 3000
  app.set('port', process.env.PORT || 80  );

  //Middlewares
  //Sirve para imprimir las peticiones Get de la consola
  app.use(morgan('dev'));
  //Body-parser viene integrado con express (sirve para trabajar con los json)
  app.use(express.json());

  //Routes
    //Ruta donde se encuentran las funciones de la base de datos TODAS (insertar/eliminar/modificar)
    app.use('/api/CosasDeClase/Producto',require('./routes/Producto'));

  //Ficheros estáticos, coge el index.html dentro de public
  app.use(express.static(__dirname + '/public'));

  // Permite devolver El archivo con todos los Métodos
  app.get('/api/Get/Methods', function(req, res) {
    res.sendFile('./Servidor/Metodos.json', { root: __dirname });
  });

  // Permite recoger Imágenes Originales (sin modificar)
  app.get('/api/Get/file/:name',(req,res) =>
  {
    res.sendFile('./Servidor/Archivos/' + req.params.name, { root: __dirname });
  });

  //Sever escucha en el puerto x te lo muestra por pantalla
  app.listen(app.get('port'), () =>{
      console.log('Server on port', app.get('port'));
  });

  // Permite devolver El archivo HTML de explicación
  app.get('/Get/Example', function(req, res) {
    res.sendFile('./Servidor/index.html', { root: __dirname });
  });

  function SubirMetodo(req){
    fs.readFile("./app/src/Servidor/EstructuraMetodos/" + req.files[0].filename, 'utf-8', (err, data) => {
      fs.readFile("./app/src/Servidor/Metodos.json", 'utf-8', (err2, data2) => {
        var obj = JSON.parse(data2);
        obj['Methods'].push(JSON.parse(data));
        jsonStr = JSON.stringify(obj);
        fs.writeFileSync('./app/src/Servidor/Metodos.json', jsonStr, { mode: 0o755 });
        var NewMethod = JSON.parse(data);
        executeUnzip('./app/src/Servidor/EstructuraMetodos/'+ req.files[1].filename, './app/src/Servidor/Metodos/' + NewMethod["Name"]);	
        executeMake(NewMethod["Name"]);	
      });		
    });
  }

  // Permite Autentificarte
  app.post('/api/authenticate/:email/:passwd', (req, res) => {
    axios.post('/users/authenticate', {
      "email": req.params.email, 
      "password": req.params.passwd
    })
    .then((res2) => {
      var json = '{"Token":"' + res2.data.token + '"}';
      fs.readFile("./app/src/Servidor/Token.json", 'utf-8', (err2, data) => {
        var obj = JSON.parse(data);
        obj['Tokens'].push(JSON.parse(json));
        jsonStr = JSON.stringify(obj);
        fs.writeFileSync('./app/src/Servidor/Token.json', jsonStr, { mode: 0o755 });
      });	
      res.send(res2.data.token);
    })
    .catch((error) => {
      res.send(false);
    })
  });

  // Permite Crear Métodos 
  app.post('/api/Upload/Method/:token', uploadMethod.array('file', 2), (req, res) => {
    fs.readFile("./app/src/Servidor/Token.json", 'utf-8', (err, data) => {
      var obj = JSON.parse(data);
      var position = obj["Tokens"].findIndex(element => element.Token === req.params.token);

      if(position == -1){
        res.send(false);
      }
      else{
        fs.readFile("./app/src/Servidor/EstructuraMetodos/" + req.files[0].filename, 'utf-8', (err, data) => {
          fs.readFile("./app/src/Servidor/Metodos.json", 'utf-8', (err2, data2) => {
            var obj = JSON.parse(data2);
            obj['Methods'].push(JSON.parse(data));
            jsonStr = JSON.stringify(obj);
            fs.writeFileSync('./app/src/Servidor/Metodos.json', jsonStr, { mode: 0o755 });
            var NewMethod = JSON.parse(data);
            executeUnzip('./app/src/Servidor/EstructuraMetodos/'+ req.files[1].filename, './app/src/Servidor/Metodos/' + NewMethod["Name"]);	
            executeMake(NewMethod["Name"]);	
          });		
        });
        res.send(true);
      }
    });
  });

  // Permite Ejecutar Métodos 
  app.post('/api/Execute/Method/:name/:Elements', upload.single('file'), (req, res) => {
    
    var elementsUrl = req.params.Elements.split("-");
    var fileExit = req.file.filename.split(".");

    fs.readFile("./app/src/Servidor/Metodos.json", 'utf-8', (err2, data) => {
      var methods = JSON.parse(data);
      var element = methods['Methods'].findIndex(method => method.Name === req.params.name);
      var method = methods['Methods'][element];
      executeMake(method["Name"]);	
      var elements = method["Elements"];
      var stringFinal = "";

      if (elementsUrl.length != 1){
        for(x =0; x < elementsUrl.length; x++){
          stringFinal += " " + elements[x]["Name"] + "=" + elementsUrl[x];
        }	
      }

      const exec = require('child_process').exec;
      exec("make -C ./app/src/Servidor/Metodos/" + req.params.name + " file=../../Archivos/"+ req.file.filename + " fileExit=../../Archivos/" + fileExit[0] + ".png " + stringFinal + " run", (err, stdout, stderr) => {
        res.send(req.file.filename);
      });
    });	
  });