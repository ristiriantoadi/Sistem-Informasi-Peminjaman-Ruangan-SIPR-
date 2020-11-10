const mongoose = require('mongoose')

const PermohonanSchema = mongoose.Schema({
    nimPeminjam:String,
    tanggal:Date,
    waktu:String,
    perihal:String,
    idRuangan:String,
    status:String
})

module.exports = mongoose.model('permohonans',PermohonanSchema)