
"use strict";

var restify = require('restify');
var fs = require('fs');
var server = restify.createServer();

server.get('/api/productos/all',(req,res,next) =>
{
	var conts = fs.readFileSync("data.json"); 
	var jsonCont = JSON.parse(conts);

	res.json(jsonCont);


	next();
});

server.get('/api/productos/add/:valor',(req,res,next) =>
{
	var conts = fs.readFileSync("data.json"); 
	var jsonCont = JSON.parse(conts);

	var maximo = jsonCont[0].nid;

	for(var x = 0; x < jsonCont.length;x++){
		if(maximo < jsonCont[x].nid){
			maximo = jsonCont[x].nid;
		}

	}

	maximo = maximo+1;
	jsonCont.push({"nid":maximo,"valor":req.params.valor});
	let data = JSON.stringify(jsonCont); 
	fs.writeFileSync('data.json', data);
	res.send("El valor vaalor " +req.params.valor+" ha sido 	a�adido!");

	next();
});

server.get('/api/productos/update/:nid/:value',(req,res,next) =>
{
	var id = req.params.nid;
	var valor = req.params.value;

	
	
	var conts = fs.readFileSync("data.json"); 
	var jsonCont = JSON.parse(conts);

	for(var i=0;i<jsonCont.length;i++){
		if(jsonCont[i].nid==id){
			jsonCont[i].valor=valor;
		 }
	}

	let data = JSON.stringify(jsonCont); 
	fs.writeFileSync('data.json', data);

	res.json(jsonCont);


	next();
});

server.get('/api/productos/delete/:nid',(req,res,next) =>
{
	var id = req.params.nid;
	var pos;

	
	var conts = fs.readFileSync("data.json"); 
	var jsonCont = JSON.parse(conts);

	for(var i=0;i<jsonCont.length;i++){
		if(jsonCont[i].nid==id){
			jsonCont.splice(i,1);
		 }
	}

	let data = JSON.stringify(jsonCont); 
	fs.writeFileSync('Delete.json', data);

	res.json(jsonCont);


	next();
});

server.listen(8888,function()
{
	console.log('%s escuchando en el puerto %s', server.name, server.url);
});

server.on('uncaughException',(req,res,route,err) => 
{
	err.body = 'He pillado una excepci�n : - (';
	res.send(404,err);
});