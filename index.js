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

function verifyTokenAdmin(req,res,next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token ==null){
        return res.sendStatus(401)//unauthorized or unauthenticated
    }

    jwt.verify(token,SECRET_KEY,(err,user)=>{
        
        if(err || user.nim != "admin"){
            return res.sendStatus(403)//forbidden
        }
        req.user = user
        next()
    })
}

app.use(express.static(__dirname+"/dist/"))

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
app.post("/permohonan/tolak",verifyTokenAdmin,async function(req,res){
    let idPermohonan = req.body.idPermohonan
    await Permohonan.findOneAndUpdate({_id:idPermohonan},{'status':"ditolak"},async (err,doc)=>{
        if(err){
            res.json({
                err
            })
        }else{
            console.log("success")
            try{
                const removedPeminjaman = await Peminjaman.remove({idPermohonan:doc._id})
                console.log(removedPeminjaman)
                res.json(removedPeminjaman)
            }catch(err){
                res.json({message:err})
            }
            // res.sendStatus(200)
        }
    })
})
app.post("/ruangan/edit",verifyTokenAdmin,async function(req,res){

    await Room.findOneAndUpdate({_id:req.body.idRuangan},{'namaRuangan':req.body.namaRuanganEdited},(err,doc)=>{
        if(err){
            res.json({
                err
            })
        }else{
            console.log("success")
            res.sendStatus(200)
        }
    })
})
app.post("/ruangan/tambah",verifyTokenAdmin,async function(req,res){
    const room = new Room({
        namaRuangan:req.body.namaRuangan
    })
  
    try{
        const savedRoom = await room.save()
        res.json(savedRoom)
    }catch(error){
        res.json({message:error})
    }
})
app.post("/permohonan/terima",verifyTokenAdmin,async function(req,res){
    let idPermohonan = req.body.idPermohonan
    await Permohonan.findOneAndUpdate({_id:idPermohonan},{'status':"diterima"},async (err,doc)=>{
        if(err){
            res.json({
                err
            })
        }else{
            console.log(doc)
            const peminjaman = new Peminjaman({
                _idRuangan:doc.idRuangan,
                nimPeminjam:doc.nimPeminjam,
                tanggal:doc.tanggal,
                waktu:doc.waktu,
                perihal:doc.perihal,
                idPermohonan:doc._id
            })
          
            try{
                const savedPeminjaman = await peminjaman.save()
                res.json(savedPeminjaman)
            }catch(error){
                res.json({message:error})
            }
        }
    })
})
app.get('/permohonan',verifyToken,async function(req,res){
    console.log(req.user)

    try{
        let permohonans=null
        if(req.user.nim != "admin")
            permohonans = await Permohonan.find({nimPeminjam:req.user.nim})
        else 
            permohonans = await Permohonan.find()
        let recordPermohonan=[]
        for(let i=0;i<permohonans.length;i++){
            try{
                const ruangan = await Room.findById(permohonans[i].idRuangan)
                const user = await User.findOne({nim:permohonans[i].nimPeminjam})
                recordPermohonan.push({
                    idPermohonan:permohonans[i]._id,
                    nimPeminjam:permohonans[i].nimPeminjam,
                    namaLengkapPeminjam:user.namaLengkap,
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
    let ruangan=null
    try{
        ruangan = await Room.findOne({namaRuangan:req.body.namaRuangan})
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
    let user=null
    try{
        user = await User.findOne({nim:req.body.nim,password:req.body.password})
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
app.get(/.*/,function(req,res){
    res.sendFile(__dirname+"/dist/index.html")
})

//connect to mongodb
mongoose.connect('mongodb+srv://ristiriantoadi:globalwarming@cluster0.dn2im.mongodb.net/sipr?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once("open", function() {
    console.log("MongoDB database connection established successfully");
  });

//start server
app.listen(PORT,()=>{console.log(`Server listen at port ${PORT}`)})