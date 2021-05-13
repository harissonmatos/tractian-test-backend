const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AtivoSchema = Schema({
    imagem: String,
    nome: String,
    descricao: String,
    modelo: String,
    responsavel: String,
    status: String,
    nivelSaude: String
})

module.exports = mongoose.model('ativos', AtivoSchema)
