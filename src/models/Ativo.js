const mongoose = require('mongoose');

const AticoSchema = new mongoose.Schema({
  imagem: String,
  nome: {
    type: String,
    minlength: 2,
    maxlength: 50,
    required: true
  },
  descricao: String,
  modelo: String,
  responsavel: String,
  status: {
    type: String,
    enum: ["Em operação", "Em Alerta", "Em Parada"],
    required: true
  },
  nivel_saude: {
    type: Number,
    min: 0,
    max: 100,
    required: true
  },
  unidade: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Unidade',
    required: true
  }
});

module.exports = mongoose.model('Ativo', AticoSchema);