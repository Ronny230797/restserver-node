require('./config/config') //Al ser el primer import la app la actva primero, haciendo las configuracion antes de todo


const express = require('express')
const mongoose = require('mongoose')


const app = express()
const bodyParser = require('body-parser')

//Siempre que vea un app.use(...) es un middlawere que se va adisparar siempre que el codigo pase por ahi

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//Aqui estoy importando los controllers de usuario para que tengan acceso a ser consultados
app.use(require('./controllers/usuario'))

//Conexion bd mongo(port 27017 y collection(db) cafe)
mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, (err, res) => {
    if (err) throw err;
    console.log('Base Datos online');
})


//procees..... es una var global, que fue modificada en la config
app.listen(process.env.PORT, () => {
    console.log(`Escuchando PORT ${process.env.PORT}`);
})