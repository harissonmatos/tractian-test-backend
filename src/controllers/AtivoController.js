const Ativo = require('../models/Ativo');
const Empresa = require('../models/Empresa');
const Unidade = require('../models/Unidade');

module.exports = {
    async index(req, res) {
        try {
            let filtro_ativo = {};

            if (req.method === 'POST') {
                const nome = req.body.nome ? req.body.nome.trim() : null;
                nome ? filtro_ativo.nome = { $regex: '.*' + nome + '.*', $options : 'i' } : null;

                const unidade = req.body.unidade && req.body.unidade.length > 0 ? req.body.unidade : null;
                unidade ? filtro_ativo.unidade = unidade : null;

                const modelo = req.body.modelo ? req.body.modelo.trim() : null;
                modelo ? filtro_ativo.modelo = { $regex: '.*' + modelo + '.*', $options : 'i' } : null;

                const responsavel = req.body.responsavel ? req.body.responsavel.trim() : null;
                responsavel ? filtro_ativo.responsavel = { $regex: '.*' + responsavel + '.*', $options : 'i' } : null;

                const status = req.body.status && req.body.status.length > 0 ? req.body.status : null;
                status ? filtro_ativo.status = status : null;
            };

            const ativos = await Ativo.find({...filtro_ativo})
                .populate({
                    path: 'unidade',
                    select: '_id nome',
                    populate: {
                        path: 'empresa',
                        model: 'Empresa',
                        select: '_id nome',
                    }
                });

            return res.json(ativos);
        } catch (err) {
            return res.json({err});
        }
    },

    async show(req, res) {
        try {
            const {ativo_id} = req.params;

            const ativo = await Ativo.findById(ativo_id);

            return res.json(ativo);
        } catch (err) {
            return res.json({err});
        }
    },

    async save(req, res) {
        try {
            const unidade = await Unidade.findById(req.body.unidade);

            if (!unidade) {
                return res.status(400).json({err: 'Unidade não existe'});
            }

            const data = {
                nome: req.body.nome.trim(),
                descricao: req.body.descricao.trim(),
                modelo: req.body.modelo.trim(),
                responsavel: req.body.responsavel.trim(),
                status: req.body.status,
                nivel_saude: req.body.nivel_saude,
                unidade: req.body.unidade
            };

            if (typeof req.file !== 'undefined') {
                data.imagem = req.file.filename;
            }

            let ativo;

            if (typeof req.body._id === 'undefined') {
                ativo = await Ativo.create(data);
            } else {
                ativo = await Ativo.findByIdAndUpdate(req.body._id, data, {new: true});
            }

            return res.json(ativo);
        } catch (err) {
            return res.json({err: err.message});
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