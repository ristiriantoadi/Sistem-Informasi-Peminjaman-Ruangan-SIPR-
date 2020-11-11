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
const Permohonan = require('./models/Permohonan')

//middleware
app.use(bodyParser.json())
app.use(cors())


//middleware function
function verifyToken(req,res,next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token ==null){
        return res.sendStatus(401)//unauthorized or unauthenticated
    }

    jwt.verify(token,SECRET_KEY,(err,user)=>{
        if(err){
            return res.sendStatus(403)//forbidden
        }
        req.user = user
        next()
    })
}

//routing
app.get('/', function (req, res) {
    res.send('Hello World!')
  })
app.get('/ruangan',verifyToken,async function(req,res){
    try{
        const rooms = await Room.find()
        res.json(rooms)
    }catch(err){
        res.json({message:err})
    }
})
app.get('/permohonan',verifyToken,async function(req,res){
    console.log(req.user)
    try{
        const permohonans = await Permohonan.find({nimPeminjam:req.user.nim})
        let recordPermohonan=[]
        for(let i=0;i<permohonans.length;i++){
            try{
                const ruangan = await Room.findById(permohonans[i].idRuangan)
                recordPermohonan.push({
                    nimPeminjam:permohonans[i].nimPeminjam,
                    tanggalPeminjaman:permohonans[i].tanggal,
                    waktuPeminjaman:permohonans[i].waktu,
                    perihalPeminjaman:permohonans[i].perihal,
                    namaRuangan:ruangan.namaRuangan,
                    statusPermohonan:permohonans[i].status
                })
            }catch(err){
                console.log(err)
            }
        }
        res.json(recordPermohonan)
    }catch(err){
        console.log(err)
    }
})
app.post('/permohonan',verifyToken,async function(req,res){
    let ruangan
    try{
        ruangan = await Room.findOne({namaRuangan:req.body.namaRuangan.toUpperCase()})
    }catch(err){
        console.log(err)
    }

    const permohonan = new Permohonan({
        idRuangan:ruangan._id,
        tanggal:req.body.tanggalPeminjaman,
        waktu:req.body.waktuPeminjaman,
        perihal:req.body.perihalPeminjaman,
        nimPeminjam:req.user.nim,
        status:"menunggu"
    })
    try{
        const savedPermohonan = await permohonan.save()
        console.log(savedPermohonan)
        res.json(savedPermohonan)
    }catch(error){
        res.json({message:error})
    }
})
app.get('/ruangan/:namaRuangan',verifyToken,async function (req,res){
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