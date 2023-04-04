const express = require('express')
const app = express()
const mongoose = require('mongoose')


app.use(express.urlencoded({extended: false}))
app.use(express.json())




mongoose.connect("mongodb://127.0.0.1:27017/testpics").then(() => {
    //console.log("Conectado ao banco de Dados!")
}).catch(error => {
    console.log(error)
})



app.get('/', (req, res) => {
    res.json({})
})


module.exports = app