

// =====================================
//          USER ROUTES
// =====================================

// REQUIRES
const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/usuario');

const app = express();



app.get('/usuario', (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 0;
    limite = Number(limite);

    Usuario.find({estado: true}, 'nombre email role google estado')// de esta manera se pueden indicar los campos que se requieran unicamente
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Usuario.count({estado: true}, (err, conteo) => {

    
                res.json({
                    ok: true,
                    usuarios,
                    count: conteo
                });


            });
            
        }
    );

});

app.post('/usuario', (req, res) => {

    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save((err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
            
        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });

});

app.put('/usuario/:id', (req, res) => {

    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'role', 'img', 'estado']);

    Usuario.findByIdAndUpdate(id, body, {new: true, runValidators: true}, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        
        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });

});

app.delete('/usuario/:id', (req, res) => {

    let id = req.params.id;

    let changeState = {
        estado:  false
    };
    
    Usuario.findByIdAndUpdate(id, changeState, { new: true }, (err, changed) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!changed) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "No se ha podido encontrar el usuario"
                }
            });
        }

        res.json({
            ok: true,
            usuario: changed
        });

    });


    // Usuario.findByIdAndRemove(id, (err, userDeleted) => {

    //     if (err) {
    //         return res.status(400).json({
    //             ok: false,
    //             err
    //         });
    //     }

    //     if (!userDeleted) {
    //         return res.status(400).json({
    //             ok: false,
    //             err: {
    //                 message: "No se ha podido encontrar el usuario"
    //             }
    //         });
    //     }

    //     res.json({
    //         ok: true,
    //         usuario: userDeleted
    //     });


    // });


});

//EXPORT
module.exports = app;

