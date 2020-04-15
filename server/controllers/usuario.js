//Debemos atrapar el paiload, la informacion que viene desde la app web(interfaz), a el backend
const express = require('express')
const bcrypt = require('bcrypt')
const _ = require('underscore')

//Importamos el modelo de usuario que creamos
const Usuario = require('../models/usuario')

const app = express()


app.get('/usuario', function(req, res) {
    let desde = req.query.desde || 0
    desde = Number(desde)

    let limite = req.query.limite || 5
    limite = Number(limite)


    //Puedo filtarr el retorno poniendo el string de lo que quiero que retorne el get
    Usuario.find({ state: true }, 'name email role state google img')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }

            Usuario.count({ state: true }, (err, conteo) => {

                res.json({
                    ok: true,
                    cuantos: conteo,
                    usuarios
                })
            })

        })

})

//Esto lo haremos con body-parser, es un npm, que convierte la informacion recibida en un obj json
app.post('/usuario', function(req, res) {

    let body = req.body

    let usuario = new Usuario({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    })

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        })
    })
})

//Al pasar parametros por url se hace asi y se agarra el valor como en la variable let id, con el req.params.varibale
app.put('/usuario/:id', function(req, res) {
    let id = req.params.id
    let body = _.pick(req.body, ['name', 'email', 'img', 'role', 'estado']) //estoy filtrando el obj solo a las caracterisiticas que quiero que sean validas actualizar

    //primeri param id budqueda, segundo obj cambios, tercero configuracion mongoose, 4 callback
    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        })
    })


})

//Ahora no se acostumbra a borrar registros, sino que tengan estado activo y se cambia a inactivo
//Aqui borramos el registro fisicamente, osea lo eiminamos de la bd(Ya casi no se hace, solo de ser necesario)
// app.delete('/usuario/:id', function(req, res) {
//     let id = req.params.id

//     Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
//         if (err) {
//             return res.status(400).json({
//                 ok: false,
//                 err
//             })
//         }

//         if (!usuarioBorrado) {
//             return res.status(400).json({
//                 ok: false,
//                 err: {
//                     message: 'usuario no encontrado'
//                 }
//             })
//         }

//         res.json({
//             ok: true,
//             usuario: usuarioBorrado
//         })
//     })


// })

//Esta forma de eliminar es con un estado de activo
//Sin borrar fidsicamente
app.delete('/usuario/:id', function(req, res) {
    let id = req.params.id

    let usuarioState = {
        state: false
    }

    Usuario.findByIdAndUpdate(id, usuarioState, { new: true }, (err, usuarioBorrado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'usuario no encontrado'
                }
            })
        }

        res.json({
            ok: true,
            usuario: usuarioBorrado
        })
    })
})

module.exports = app