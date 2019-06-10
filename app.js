//

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser')

//iniciaizar variables

var app = express();


/// ody parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//importar rutas

var appRoutes = require('./routes/app');
var usuarioRoutes = require('./routes/usuario');

//coneccón la la bd

mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', (err, res) => {

    if (err) throw err;

    console.log(`La base de datos \x1b[32m%s\x1b[0m`, ` online`);
});



//rutas

app.use('/usuario', usuarioRoutes);
app.use('/', appRoutes);

// Escuchar peticiones
app.listen(3000, () => {
    console.log(`Expres server puerto 3000:\x1b[32m%s\x1b[0m`, ` online`);
});