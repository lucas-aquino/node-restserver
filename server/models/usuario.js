

// ======================================
//          USER MODEL
// ======================================

//REQUIRES
const mongo = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongo.Schema;


let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El email es necesario']
    },
    password: {
        type: String,
        required: [true, 'El password es necesario']
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        required: false,
        enum: {
            values: ['ADMIN_ROLE', 'USER_ROLE'],
            message: '{VALUE} no es un rol valido'
        }
    },
    img: {
        type: String,
        required: false
    },
    estado: {
        type: Boolean,
        default: true,
        required: false
    },
    google: {
        type: Boolean,
        default: false,
        required: false
    }
});


usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
}

usuarioSchema.plugin(uniqueValidator, {
    message: '{PATH} debe de ser unico'
});

module.exports = mongo.model('Usuario', usuarioSchema);


