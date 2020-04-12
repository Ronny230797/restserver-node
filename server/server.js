require('./config/config') //Al ser el primer import la app la actva primero, haciendo las configuracion antes de todo

const express = require('express')
const app = express()
const bodyParser = require('body-parser')

//Siempre que vea un app.use(...) es un middlawere que se va adisparar siempre que el codigo pase por ahi

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.get('/usuario', function(req, res) {
    res.json('get usuario')
})

//Debemos atrapar el paiload, la informacion que viene desde la app web(interfaz), a el backend
//Esto lo haremos con body-parser, es un npm, que convierte la informacion recibida en un obj json
app.post('/usuario', function(req, res) {

    let body = req.body

    if (body.nombre === undefined) {
        res.status(400).json({
            ok: false,
            mensaje: 'El nombre es necesario, no se recibio "undefined"'
        })
    } else {
        res.json({
            persona: body
        })
    }

})

//Al pasar parametros por url se hace asi y se agarra el valor como en la variable let id, con el req.params.varibale
app.put('/usuario/:id', function(req, res) {
    let id = req.params.id;
    res.json({
        id
    })
})

//Ahora no se acostumbra a borrar registros, sino que tengan estado activo y se cambia a inactivo
app.delete('/usuario', function(req, res) {
    res.json('delete usuario')
})

//procees..... es una var global, que fue modificada en la config
app.listen(process.env.PORT, () => {
    console.log(`Escuchando PORT ${process.env.PORT}`);
})