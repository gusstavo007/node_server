//rutas

var express = require('express');
const bcrypt = require('bcryptjs');

var app = express();

var Usuario = require('../models/usuario');

//============================
// Obtener todos los usurios
//============================

app.get('/', (req, res, next) => {

    Usuario.find({}, 'nombre usuario img email role')
        .exec((err, usuarios) => {

            if (err) {
                return res.status(500)
                    .json({
                        ok: false,
                        mensaje: 'Error cargando usuario',
                        errors: err
                    });
            }

            res.status(200).json({
                ok: true,
                usuario: usuarios
            });


        });

});

//============================
// crear un nuevo usurios
//============================

app.post('/', (req, res) => {

    let body = req.body;

    var usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        img: body.img,
        role: body.role

    });


    usuario.save((err, usuarioGuardado) => {

        if (err) {

            return res.status(500)
                .json({
                    ok: false,
                    mensaje: 'Error creando  usuarios',
                    errors: err
                });
        }

        res.status(201).json({
            ok: true,
            usuario: usuarioGuardado
        });




    });

});


//============================
// crear un nuevo usurios
//============================

app.put('/:id', (req, res) => {

    var id = req.params.id;

    let body = req.body;

    Usuario.findById(id, (err, usuarioBd) => {



        if (err) {

            return res.status(500)
                .json({
                    ok: false,
                    mensaje: 'Error usuario no encontrado',
                    errors: err
                });
        }

        if (!usuarioBd) {
            return res.status(400)
                .json({
                    ok: false,
                    mensaje: 'el usuario con el id' + id + ' no exite.',
                    errors: { message: 'No existe un usuario con ese ID' }
                });
        }



        usuarioBd.nombre = body.nombre;
        usuarioBd.email = body.email;
        usuarioBd.password = bcrypt.hashSync(body.password, 10);
        usuarioBd.img = body.img;
        usuarioBd.role = body.role;

        usuarioBd.save((err, usuarioGuardado) => {

            if (err) {

                return res.status(400)
                    .json({
                        ok: false,
                        mensaje: 'Error al actualizar al usaario',
                        errors: err
                    });
            }


            usuarioGuardado.password = ':)';

            res.status(200).json({
                ok: true,
                usuario: usuarioGuardado
            });


        });

    });




});


module.exports = app;