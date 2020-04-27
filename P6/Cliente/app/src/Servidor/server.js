const express = require('express');
const app = express();
const path = require('path');
const multer = require('multer');
let fs = require('fs');

app.use(express.static('public'));

// Permite Subir Imagenes
let storage = multer.diskStorage({
	destination:(req, file, cb) => {
		cb(null, './Archivos')
	},
	filename: (req, file, cb) => {
		cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
	}
});

const upload = multer({storage});

// Permite Subir Hojas de Cálculo
storage = multer.diskStorage({
	destination:(req, file, cb) => {
		cb(null, './EstructuraMetodos')
	},
	filename: (req, file, cb) => {
		cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
	}
});

const uploadMethod = multer({storage});

app.use(express.json());
app.use(express.urlencoded({extended: true}));

function executeUnzip(filename, site){
	require('child_process').execSync('sudo unzip ' + filename + " -d " + site);
}


function executeMake(nameMethod){
	require('child_process').execSync("sudo make -C ./Metodos/" + nameMethod) + " all";
}

// Permite devolver El archivo HTML de explicación
app.get('/', function(req, res) {
	res.sendFile('./index.html', { root: __dirname });
});

// Permite Crear Métodos 
// app.post('/api/Upload/Method/:email/:passwd', uploadMethod.array('file', 2), (req, res) => {
	console.log(req.params.email);
	console.log(req.params.passwd);
	// fs.readFile("./EstructuraMetodos/" + req.files[0].filename, 'utf-8', (err, data) => {
	// 	fs.readFile("./Metodos.json", 'utf-8', (err2, data2) => {
	// 		var obj = JSON.parse(data2);
	// 		obj['Methods'].push(JSON.parse(data));
	// 		jsonStr = JSON.stringify(obj);
	// 		fs.writeFileSync('./Metodos.json', jsonStr, { mode: 0o755 });
	// 		var NewMethod = JSON.parse(data);
	// 		executeUnzip('./EstructuraMetodos/'+ req.files[1].filename, './Metodos/' + NewMethod["Name"]);	
	// 		executeMake(NewMethod["Name"]);	
	// 	});		
	// });
	res.send(req.params.email);
});

// Permite Ejecutar Métodos 
app.post('/api/Execute/Method/:name/:Elements', upload.single('file'), (req, res) => {
	
	var elementsUrl = req.params.Elements.split("-");
	var fileExit = req.file.filename.split(".");

	fs.readFile("./Metodos.json", 'utf-8', (err2, data) => {
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
		exec("make -C ./Metodos/" + req.params.name + " file=../../Archivos/"+ req.file.filename + 
		+ " fileExit=../../Archivos/" + fileExit[0] + ".png " + stringFinal + " run", (err, stdout, stderr) => {
		if (err) {
			console.error(`exec error: ${err}`);
			return;
		}
			res.send(req.file.filename);
		});
	});	
});

// Permite devolver El archivo con todos los Métodos
app.get('/api/Get/Methods', function(req, res) {
	res.sendFile('./Metodos.json', { root: __dirname });
});

// Permite recoger Imágenes Originales (sin modificar)
app.get('/api/Get/file/:name',(req,res) =>
{
	res.sendFile('./Archivos/' + req.params.name, { root: __dirname });
});

// Emite el servidor por el Puerto 80
app.listen(80, function() {
    console.log('API Computación en la Nube, escuchando el puerto 80!\n');
});