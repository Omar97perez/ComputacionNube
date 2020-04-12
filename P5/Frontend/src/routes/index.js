const admin = require('firebase-admin')

var serviceAccount = require("../../practicasytwc-firebase-adminsdk-f8ly1-46d21f762c.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://practicasytwc.firebaseio.com"
});

const db = admin.database();

const { Router}= require('express');
const router = Router();

var json = null;

router.get('/', (req, res) => {
    db.ref('Usuarios').once('value', (snapshot) => {
       data = snapshot.val();
       json = data;
       res.render('index', {contacts: data})
    });
})

router.post('/new-contact', (req, res) => {
    const newContact = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password
    }
    var id = "usuario" + Math.floor(Math.random() * (99 - 0 + 1) + 0) + Math.floor(Math.random() * (99 - 0 + 1) + 0) + Math.floor(Math.random() * (99 - 0 + 1) + 0);
    db.ref('Usuarios').child(id).set(newContact);
    res.redirect('/index.html?Nombre=' + req.body.firstname + '?Apellidos=' + req.body.lastname + '?Email=' + req.body.email );
});

router.get('/delete-contact/:id', (req, res) => {
    db.ref('Usuarios/' + req.params.id).remove();
    res.redirect('/');
});

router.post('/IniciarSesion', (req, res) => {
    
    db.ref('Usuarios').once('value', (snapshot) => {
        data = snapshot.val();
        json = data;
    });
    console.log(json);

    console.log("11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111");

    var objErrList = JSON.stringify(json);

    console.log(json);


        var jsonreal = JSON.parse(objErrList);

        console.log(jsonreal);

        var redirreccion = 0;

        for(var key in jsonreal)
        {
            console.log("22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222");
            console.log(jsonreal[key].email);
            console.log(req.body.email);
            console.log(jsonreal[key].password);
            console.log(req.body.password);
            if(jsonreal[key].email == req.body.email && jsonreal[key].password == req.body.password){
                res.redirect('/index.html?Nombre=' + jsonreal[key].firstname + '?Apellidos=' + jsonreal[key].lastname + '?Email=' + jsonreal[key].email);
                redirreccion = 1;
            }
        }

        if(redirreccion == 0) 
        {
            res.redirect('/');
        }
    });

module.exports = router;