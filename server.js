const express = require('express')
const mongoose = require('mongoose')

// Conexão com banco de dados mongodb
mongoose.connect('mongodb+srv://tractian-user:W54PYDDgAJzEpHOC@tractian.cwuvi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(db => console.log('db connected'))
    .catch(err => console.log(err))

// Configuração do express
const app = express()
app.use(express.json())
const routes = require("./app/routes")
app.use('/', routes)
app.listen(3000, function () {
    console.log('listening on 3000')
})