//

var express = require('express');
var mongoose = require('mongoose');

//iniciaizar variables

var app = express();



//coneccón la la bd

mongoose.connection.openUri('mongodb://localhost:27017/hospitaldb', (err, res) => {

    if (err) throw err;

    console.log(`La base de datos \x1b[32m%s\x1b[0m`, ` online`);
});


//rutas

app.get('/', (req, res, next) => {

    res.status(200).json({
        ok: true,
        mensaje: 'petición realiada correctamente'
    });

});


// Escuchar peticiones
app.listen(3000, () => {
    console.log(`Expres server puerto 3000:\x1b[32m%s\x1b[0m`, ` online`);
});