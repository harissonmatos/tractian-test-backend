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

    async save(req, res) {
        try {

            let empresa;

            if (typeof req.body._id === 'undefined') {
                empresa = await Empresa.create({
                    nome: req.body.nome.trim()
                })
            } else {
                empresa = await Empresa.findByIdAndUpdate(req.body._id, {
                    nome: req.body.nome.trim()
                }, {new: true});
            }


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