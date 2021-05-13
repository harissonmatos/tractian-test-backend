const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
  nome: {
    type: String,
    minlength: 3,
    maxlength: 50,
    required: true
  },
  empresa: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Empresa',
    required: true
  }
});

module.exports = mongoose.model('Usuario', UsuarioSchema);