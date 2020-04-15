//modelo datos usuario
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un role valido'
}

let Schema = mongoose.Schema

let usuarioSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario']
    },
    password: {
        type: String,
        required: [true, 'La contrasenna es necesaria']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
})

//Aqui cambiamos el echo de que el retorno despues de gardar el obj el bd datos retorne el campo password, para que no se pueda ver desde frontend
//tiene que ser con una function normal para poder usar el this osea el objeto actual o en este momento
//Esto sera cuando se retorne o muestre en forma json
usuarioSchema.methods.toJSON = function() {
    let user = this
    let userObject = user.toObject()
    delete userObject.password
    return userObject
}

usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser unico' })

//Aqui exporto el modelo, le pongo un nombre 'Usuario' y le digo que la config es la de usuarioSchema
module.exports = mongoose.model('Usuario', usuarioSchema)