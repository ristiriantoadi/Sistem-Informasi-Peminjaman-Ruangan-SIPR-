const mongoose = require('mongoose')

const PeminjamanSchema = mongoose.Schema({
    _idRuangan:{
        type:String,
        required:true
    },
    nimPeminjam:String,
    tanggal:Date,
    waktu:String,
    perihal:String
})

module.exports = mongoose.model('peminjamans',PeminjamanSchema)