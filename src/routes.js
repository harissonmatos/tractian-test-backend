const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');

const AtivoController = require('./controllers/AtivoController');
const UsuarioController = require('./controllers/UsuarioController');
const EmpresaController = require('./controllers/EmpresaController');
const UnidadeController = require('./controllers/UnidadeController');

const routes = express.Router();
const upload = multer(uploadConfig);

routes.get('/empresas', EmpresaController.index);
routes.get('/empresas/:empresa_id', EmpresaController.show);
routes.post('/empresas/save', EmpresaController.save);
routes.get('/empresas/delete/:empresa_id', EmpresaController.delete);

routes.get('/unidades', UnidadeController.index);
routes.get('/unidades/:unidade_id', UnidadeController.show);
routes.post('/unidades/save', UnidadeController.save);
routes.get('/unidades/delete/:unidade_id', UnidadeController.delete);

routes.get('/usuarios', UsuarioController.index);
routes.get('/usuarios/:usuario_id', UsuarioController.show);
routes.post('/usuarios/save', UsuarioController.save);
routes.get('/usuarios/delete/:usuario_id', UsuarioController.delete);

routes.get('/ativos', AtivoController.index);
routes.post('/ativos', AtivoController.index);
routes.get('/ativos/:ativo_id', AtivoController.show);
routes.post('/ativos/save', upload.single('imagem'), AtivoController.save);
routes.get('/ativos/delete/:ativo_id', AtivoController.delete);

module.exports = routes;
