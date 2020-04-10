
const express = require('express');
const router = express.Router();
const app = express();

app.use(express.static('public'));

const path = require('path');
const multer = require('multer');

let storage = multer.diskStorage({
	destination:(req, file, cb) => {
		cb(null, './img/Original')
	},
	filename: (req, file, cb) => {
		cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
	}
});

const upload = multer({storage});

let storageHC = multer.diskStorage({
	destination:(req, file, cb) => {
		cb(null, './HojaCalculo/Original')
	},
	filename: (req, file, cb) => {
		cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
	}
});

const uploadHC = multer({storageHC});

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.post('/api/Upload/Img', upload.single('file'), (req, res) => {
	return res.send(req.file);
})

app.post('/api/Upload/HojaCalculo', uploadHC.single('file'), (req, res) => {
	return res.send(req.file);
})
 
app.get('/api/Get/Img/Original/:name',(req,res) =>
{
	res.sendFile('./img/Original/' + req.params.name, { root: __dirname });
});

app.get('/api/Get/Img/Final/:name',(req,res) =>
{
	res.sendFile('./img/Final/' + req.params.name, { root: __dirname });
});

app.get('/', function(req, res) {
    res.send('Hola Mundo!');
});

app.get('/api/Secuencial/:name',(req,res) =>
{
	const exec = require('child_process').exec;
	exec('make img=' + req.params.name + ' runSecuencial', (err, stdout, stderr) => {
	if (err) {
		console.error(`exec error: ${err}`);
		return;
	}
		// console.log(`stdout: ${stdout}`);
		// console.log(`stderr: ${stderr}`);
        res.sendFile('./img/Final/Secuencial-'+ req.params.name, { root: __dirname });
	});
});

app.get('/api/OpenMP/:name',(req,res) =>
{

	const exec = require('child_process').exec;
	exec('make img=' + req.params.name + ' runOpenMP', (err, stdout, stderr) => {
	if (err) {
		console.error(`exec error: ${err}`);
		return;
	}
		// console.log(`stdout: ${stdout}`);
		// console.log(`stderr: ${stderr}`);
        res.sendFile('./img/Final/OpenMP-'+ req.params.name, { root: __dirname });
	});
});

app.get('/api/MPI/:name/:height/:width',(req,res) =>
{
	const exec = require('child_process').exec;
	exec('make img=' + req.params.name + ' height=' + req.params.height + ' width=' + req.params.width + ' runMPI', (err, stdout, stderr) => {
	if (err) {
		console.error(`exec error: ${err}`);
		return;
	}
		// console.log(`stdout: ${stdout}`);
		// console.log(`stderr: ${stderr}`);
        res.sendFile('./img/Final/MPI-'+ req.params.name, { root: __dirname });
	});
});

app.get('/api/Grafica/:dataEntry/:elementoX/:elementoY/:tipoRepresentacion/:tipoGrafica',(req,res) =>
{
	const exec = require('child_process').exec;
	var  parte = req.params.dataEntry.split('.');
	var dataExit = parte[0];

	switch(parseInt(req.params.tipoGrafica)) {
		case 1:
			dataExit = "Lineas-" + dataExit + ".png"
			break;

		case 2:
			dataExit = "Barras-" + dataExit + ".png"
		  	break;

		case 3:
			dataExit = "Puntos-" + dataExit + ".png"
			break;

		case 4:
			dataExit = "Resumen-" + dataExit + ".png"
			break;
	  } 

	exec('make dataEntry=' + req.params.dataEntry + ' elementoX=' + req.params.elementoX  
		+ ' elementoY=' + req.params.elementoY  + ' tipoRepresentacion=' + req.params.tipoRepresentacion  
		+ ' tipoGrafica=' + req.params.tipoGrafica  + ' dataExit=./HojaCalculo/Final/'+ dataExit + ' runGraficas', 
	(err, stdout, stderr) => {
	if (err) {
		console.error(`exec error: ${err}`);
		return;
	}
		// console.log(`stdout: ${stdout}`);
		// console.log(`stderr: ${stderr}`);
        res.sendFile('./HojaCalculo/Final/' + dataExit, { root: __dirname });
	});
});

app.listen(8000, function() {
    console.log('API Aplicar Filtros a Imágenes, escuchando el puerto 8000!\n');
});