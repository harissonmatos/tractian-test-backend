const mongoose = require('mongoose');

const AticoSchema = new mongoose.Schema({
    imagem: String,
    nome: {
        type: String,
        minlength: 2,
        maxlength: 50,
        required: true
    },
    descricao: {
        type: String,
        maxlength: 50
    },
    modelo: {
        type: String,
        maxlength: 50
    },
    responsavel: {
        type: String,
        maxlength: 50
    },
    status: {
        type: String,
        enum: ["Em Operação", "Em Alerta", "Em Parada"],
        required: true,
    },
    nivel_saude: {
        type: Number,
        min: 0,
        max: 100,
        required: true,
    },
    unidade: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Unidade',
        required: true
    }
});

module.exports = mongoose.model('Ativo', AticoSchema);