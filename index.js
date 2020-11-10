//import
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

//initialization
const app = express()
const PORT = process.env.port || 5000


//const
const SECRET_KEY="secret"

//import models
const User = require('./models/User')
const Room = require('./models/Room')
const Peminjaman = require('./models/Peminjaman')

//middleware
app.use(bodyParser.json())
app.use(cors())

//routing
app.get('/', function (req, res) {
    res.send('Hello World!')
  })
app.get('/ruangan',async function(req,res){
    try{
        const rooms = await Room.find()
        res.json(rooms)
    }catch(err){
        res.json({message:err})
    }
})
app.get('/ruangan/:namaRuangan',async function (req,res){
    try{
        //get room data
        const room = await Room.findOne({namaRuangan:req.params.namaRuangan.toUpperCase()})
        
        //get peminjaman data
        const peminjaman = await Peminjaman.find({_idRuangan:room._id})
        
        //for each peminjaman, get user data
        let recordPeminjaman=[]
        for(let i=0;i<peminjaman.length;i++){
            try{
                const user = await User.findOne({nim:peminjaman[i].nimPeminjam})
                recordPeminjaman.push({
                    nimPeminjam:peminjaman[i].nimPeminjam,
                    namaLengkapPeminjam:user.namaLengkap,
                    tanggalPeminjaman:peminjaman[i].tanggal,
                    waktuPeminjaman:peminjaman[i].waktu,
                    perihalPeminjaman:peminjaman[i].perihal,
                    namaRuangan:req.params.namaRuangan
                })
            }catch(err){
                console.log(err)
            }
        }
        res.json(recordPeminjaman)
    }catch(err){
        res.json(err)
    }
})
app.post('/login', async function (req, res) {
    // res.json({
    //     username:req.body.username,
    //     password:req.body.password
    // })
    let user=null
    try{
        user = await User.findOne({nim:req.body.nim,password:req.body.password})
        // const users = await User.find()
        // res.json(user)
    }catch(err){
        console.log(err)
    }

    if(user != null){
        const token = jwt.sign({
            _id:user._id,
            nim:user.nim,
            password:user.password
        },SECRET_KEY)
        res.json({
            token,
            namaLengkap:user.namaLengkap,
            nim:user.nim
        })

    }else{
        res.sendStatus(401)
    }
    
})

//connect to mongodb
mongoose.connect('mongodb+srv://ristiriantoadi:globalwarming@cluster0.dn2im.mongodb.net/sipr?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once("open", function() {
    console.log("MongoDB database connection established successfully");
  });

//start server
app.listen(PORT,()=>{console.log(`Server listen at port ${PORT}`)})