const Usuario = require('../models/Usuario');
const Empresa = require('../models/Empresa');

module.exports = {
    async index(req, res) {
        try {
            const usuarios = await Usuario.find().populate('empresa');

            return res.json(usuarios);
        } catch (err) {
            return res.json({err});
        }
    },

    async show(req, res) {
        try {
            const {usuario_id} = req.params;

            const usuario = await Usuario.findById(usuario_id);

            return res.json(usuario);
        } catch (err) {
            return res.json({err});
        }
    },

    async save(req, res) {
        try {

            const empresa = await Empresa.findById(req.body.empresa);

            if (!empresa) {
                return res.status(400).json({err: 'Empresa não existe'});
            }

            let usuario;

            if (typeof req.body._id === 'undefined') {
                usuario = await Usuario.create({
                    nome: req.body.nome.trim(),
                    empresa: req.body.empresa
                });
            } else {
                unidade = await Usuario.findByIdAndUpdate(req.body._id, {
                    nome: req.body.nome.trim(),
                    empresa: req.body.empresa
                }, {new: true});
            }

            await usuario;

            return res.json(usuario);
        } catch (err) {
            return res.json({err});
        }
    },

    async delete(req, res) {
        try {
            const {usuario_id} = req.params;

            const usuario = await Usuario.findByIdAndDelete(usuario_id);

            return res.json(usuario);
        } catch (err) {
            return res.json({err});
        }
    }
};