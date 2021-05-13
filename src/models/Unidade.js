const mongoose = require('mongoose');

const UnidadeSchema = new mongoose.Schema({
  nome: {
    type: String,
    minlength: 3,
    maxlength: 50,
    required: true,
    index: true,
    unique: true
  },
  empresa: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Empresa',
    required: true
  }
});

module.exports = mongoose.model('Unidade', UnidadeSchema);