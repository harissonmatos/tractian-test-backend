const mongoose = require('mongoose');

const EmpresaSchema = new mongoose.Schema({
    nome: {
        type: String,
        minlength: [3, "O nome da empresa precisa de no mínimo 3 caracteres"],
        maxlength: [50, "O nome da empresa pode ter no máximo 50 caracteres"],
        required: true,
        index: true,
        unique: true
    }
});

module.exports = mongoose.model('Empresa', EmpresaSchema);