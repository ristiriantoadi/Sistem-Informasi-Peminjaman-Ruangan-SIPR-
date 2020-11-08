//import
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

//initialization
const app = express()
const PORT = process.env.port || 5000


//import models

const User = require('./models/User')


//middleware
app.use(bodyParser.json())
app.use(cors())

//routing
app.get('/', function (req, res) {
    res.send('Hello World!')
  })
app.post('/login', async function (req, res) {
    // res.json({
    //     username:req.body.username,
    //     password:req.body.password
    // })
    let user=null
    try{
        console.log(req.body.nim)
        console.log(req.body.password)
        user = await User.findOne({nim:req.body.nim,password:req.body.password})
        // const users = await User.find()
        // res.json(user)
    }catch(err){
        console.log(err)
    }

    if(user != null){
        res.json(user)
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