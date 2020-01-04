const mongoose = require('mongoose')
const validator = require('validator')


const User =  mongoose.model('User', {
    name: {
        type:String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email inválido')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6,
        validate(value){
            if(value.toLowerCase().includes('senha')){
                throw new Error('Senha não pode ter a palavra "senha"')
            }
        }
    },
    age: {
        type: Number,
        required: true,
        default: 0,
        validate(value){
            if(value < 0){
                throw new Error('Idade não pode ser menor que 0')
            }
        }
    }
})


module.exports = User