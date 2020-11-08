const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    nim:{
        type:String,
        required:true
    },
    namaLengkap:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('users',UserSchema)