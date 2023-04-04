const express = require('express')
const app = express()
const mongoose = require('mongoose')
const user = require('./models/User')
const bcrypt = require('bcrypt')



app.use(express.urlencoded({extended: false}))
app.use(express.json())




mongoose.connect("mongodb://127.0.0.1:27017/testpics").then(() => {
    //console.log("Conectado ao banco de Dados!")
}).catch(error => {
    console.log(error)
})


let User = mongoose.model("User", user)



app.get('/', (req, res) => {
    res.json({})
})

app.post("/user", async(req, res) => {
    
    if(req.body.name == '' || req.body.email == "" || req.body.password == "") {
        res.sendStatus(400)
        return
    }


    try{

        let user = await User.findOne({"email": req.body.email})

        if(user !=  undefined) {
            res.statusCode = 400
            res.json({error: "E-mail já cadastrado"})
            return
        }

        let password = req.body.password
        let hash = await bcrypt.hash(password, 10)
        
        let newUser = new User({name: req.body.name, email: req.body.email, password: hash})
        await newUser.save()
        res.json({email: req.body.email})

    }catch(error) {
        res.sendStatus(500)
    }

})

module.exports = app