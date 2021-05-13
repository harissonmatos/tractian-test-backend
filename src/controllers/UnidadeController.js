const Unidade = require('../models/Unidade');
const Empresa = require('../models/Empresa');

module.exports = {
    async index(req, res) {
        try {
            const unidades = await Unidade.find().populate('empresa');

            return res.json(unidades);
        } catch (err) {
            return res.json({err});
        }
    },

    async show(req, res) {
        try {
            const {unidade_id} = req.params;

            const unidade = await Unidade.findById(unidade_id).populate('empresa');

            return res.json(unidade);
        } catch (err) {
            return res.json({err});
        }
    },

    async store(req, res) {
        try {
            const empresa = await Empresa.findById(req.body.empresa);

            if (!empresa) {
                return res.status(400).json({err: 'Empresa não existe'});
            }

            const unidade = await Unidade.create({
                nome: req.body.nome.trim(),
                empresa: req.body.empresa
            });

            await unidade.populate('empresa').execPopulate();

            return res.json(unidade);
        } catch (err) {
            return res.json({err});
        }
    },

    async update(req, res) {
        try {
            const empresa = await Empresa.findById(req.body.empresa);

            if (!empresa) {
                return res.status(400).json({err: 'Empresa não existe'});
            }

            const {unidade_id} = req.params;

            const unidade = await Unidade.findByIdAndUpdate(unidade_id, {
                nome: req.body.nome.trim(),
                empresa: req.body.empresa
            }, {new: true});

            await unidade.populate('empresa').execPopulate();

            return res.json(unidade);
        } catch (err) {
            return res.json({err});
        }
    },

    async delete(req, res) {
        try {
            const {unidade_id} = req.params;

            const unidade = await Unidade.findByIdAndDelete(unidade_id);

            return res.json(unidade);
        } catch (err) {
            return res.json({err});
        }
    }
};