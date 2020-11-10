const mongoose = require('mongoose')

const RoomSchema = mongoose.Schema({
    namaRuangan:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('rooms',RoomSchema)