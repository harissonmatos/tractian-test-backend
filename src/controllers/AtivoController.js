const Ativo = require('../models/Ativo');
const Empresa = require('../models/Empresa');
const Unidade = require('../models/Unidade');

module.exports = {
    async index(req, res) {
        try {
            let filtro_empresa = {};
            let filtro_unidade = {};
            let fitro_ativo = {};

            const unidades_empresa = [];
            const ativos_empresa = [];

            const empresas = await Empresa.find(filtro_empresa);

            await Promise.all(empresas.map(async empresa => {
                const unidades = await Unidade.find({empresa: empresa._id, ...filtro_unidade});
                unidades.map(async unidade => unidades_empresa.push(unidade));
            }));

            await Promise.all(unidades_empresa.map(async unidade => {
                const ativos = await Ativo.find({unidade: unidade._id, ...fitro_ativo}).populate({
                    path: 'unidade',
                    populate: {
                        path: 'empresa',
                        model: 'Empresa'
                    }
                });
                ativos.map(async unidade => ativos_empresa.push(ativos));
            }));

            return res.json(ativos_empresa);
        } catch (err) {
            return res.json({err});
        }
    },

    async show(req, res) {
        try {
            const {ativo_id} = req.params;

            const ativo = await Ativo.findById(ativo_id)
                .populate({
                    path: 'unidade',
                    populate: {
                        path: 'empresa',
                        model: 'Empresa'
                    }
                });

            return res.json(ativo);
        } catch (err) {
            return res.json({err});
        }
    },

    async store(req, res) {
        try {
            const unidade = await Unidade.findById(req.body.unidade);

            if (!unidade) {
                return res.status(400).json({err: 'Unidade não existe'});
            }

            const ativo = await Ativo.create({
                imagem: req.body.imagem,
                nome: req.body.nome.trim(),
                descricao: req.body.descricao.trim(),
                modelo: req.body.modelo.trim(),
                responsavel: req.body.responsavel.trim(),
                status: req.body.status,
                nivel_saude: req.body.nivel_saude,
                unidade: req.body.unidade
            })

            await ativo.populate({
                path: 'unidade',
                populate: {
                    path: 'empresa',
                    model: 'Empresa'
                }
            }).execPopulate();

            return res.json(ativo);
        } catch (err) {
            console.log(err);
            return res.json({err});
        }
    },

    async update(req, res) {
        try {
            const unidade = await Unidade.findById(req.body.unidade);

            if (!unidade) {
                return res.status(400).json({err: 'Unidade não existe'});
            }

            const {ativo_id} = req.params;

            let ativo = await Ativo.findByIdAndUpdate(ativo_id, {
                imagem: req.body.imagem,
                nome: req.body.nome.trim(),
                descricao: req.body.descricao.trim(),
                modelo: req.body.modelo.trim(),
                responsavel: req.body.responsavel.trim(),
                status: req.body.status,
                nivel_saude: req.body.nivel_saude,
                unidade: req.body.unidade
            }, {new: true});

            await ativo.populate({
                path: 'unidade',
                populate: {
                    path: 'empresa',
                    model: 'Empresa'
                }
            }).execPopulate();

            return res.json(ativo);
        } catch (err) {
            return res.json({err});
        }
    },

    async delete(req, res) {
        try {
            const {ativo_id} = req.params;

            const ativo = await Ativo.findByIdAndDelete(ativo_id);

            return res.json(ativo);
        } catch (err) {
            return res.json({err});
        }
    }
};