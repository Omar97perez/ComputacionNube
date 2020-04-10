
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

app.post('/SubirImg', upload.single('file'), (req, res) => {
	return res.send(req.file);
})


app.get('/', function(req, res) {
    res.send('Hola Mundo!');
});

app.get('/api/Secuencial',(req,res) =>
{

	const exec = require('child_process').exec;
	exec('make runSecuencial', (err, stdout, stderr) => {
	if (err) {
		console.error(`exec error: ${err}`);
		return;
	}
		// console.log(`stdout: ${stdout}`);
		// console.log(`stderr: ${stderr}`);
        res.sendFile('./img/Final/FinalImageSecuencial.png', { root: __dirname });
	});
});

app.get('/api/OpenMP',(req,res) =>
{

	const exec = require('child_process').exec;
	exec('make runOpenMP', (err, stdout, stderr) => {
	if (err) {
		console.error(`exec error: ${err}`);
		return;
	}
		// console.log(`stdout: ${stdout}`);
		// console.log(`stderr: ${stderr}`);
        res.sendFile('./img/Final/FinalImageOpenMP.png', { root: __dirname });
	});
});

app.get('/api/MPI',(req,res) =>
{

	const exec = require('child_process').exec;
	exec('make runMPI', (err, stdout, stderr) => {
	if (err) {
		console.error(`exec error: ${err}`);
		return;
	}
		// console.log(`stdout: ${stdout}`);
		// console.log(`stderr: ${stderr}`);
        res.sendFile('./img/Final/FinalImageMPI.png', { root: __dirname });
	});
});

app.listen(8000, function() {
    console.log('API Aplicar Filtros a Imágenes, escuchando el puerto 8000!\n');
});