
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

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.post('/api/Upload/Img', upload.single('file'), (req, res) => {
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

app.listen(8000, function() {
    console.log('API Aplicar Filtros a Imágenes, escuchando el puerto 8000!\n');
});