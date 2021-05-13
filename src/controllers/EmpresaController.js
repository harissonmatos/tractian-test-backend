const Empresa = require('../models/Empresa');

module.exports = {
    async index(req, res) {
        try {
            const empresas = await Empresa.find();

            return res.json(empresas);
        } catch (err) {
            return res.json({err});
        }
    },

    async show(req, res) {
        try {
            const {empresa_id} = req.params;

            const empresa = await Empresa.findById(empresa_id);

            return res.json(empresa);
        } catch (err) {
            return res.json({err});
        }
    },

    async store(req, res) {
        try {
            const empresa = await Empresa.create({
                nome: req.body.nome.trim()
            })

            return res.json(empresa);
        } catch (err) {
            return res.json({err});
        }
    },

    async update(req, res) {
        try {
            const {empresa_id} = req.params;

            let empresa = await Empresa.findByIdAndUpdate(empresa_id, {
                nome: req.body.nome.trim(),
            }, {new: true});

            return res.json(empresa);
        } catch (err) {
            return res.json({err});
        }
    },

    async delete(req, res) {
        try {
            const {empresa_id} = req.params;

            const empresa = await Empresa.findByIdAndDelete(empresa_id);

            return res.json(empresa);
        } catch (err) {
            return res.json({err});
        }
    }
};