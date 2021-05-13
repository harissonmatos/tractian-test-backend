const express = require('express');
/*const multer = require('multer');
const uploadConfig = require('./config/upload');

const SessionController = require('./controllers/SessionController');
const SpotController = require('./controllers/SpotController');
const DashboardController = require('./controllers/DashboardController');
const BookingController = require('./controllers/BookingController');
const ApprovalController = require('./controllers/ApprovalController');
const RejectionController = require('./controllers/RejectionController');*/
const AtivoController = require('./controllers/AtivoController');
const UsuarioController = require('./controllers/UsuarioController');
const EmpresaController = require('./controllers/EmpresaController');
const UnidadeController = require('./controllers/UnidadeController');

const routes = express.Router();
/*const upload = multer(uploadConfig);

routes.post('/sessions', SessionController.store);

routes.get('/spots', SpotController.index);
routes.post('/spots', upload.single('thumbnail'), SpotController.store);

routes.get('/dashboard', DashboardController.show);

routes.post('/spots/:spot_id/bookings', BookingController.store);

routes.post('/bookings/:booking_id/approvals', ApprovalController.store);
routes.post('/bookings/:booking_id/rejections', RejectionController.store);*/

routes.get('/empresas', EmpresaController.index);
routes.get('/empresas/:empresa_id', EmpresaController.show);
routes.post('/empresas/store', EmpresaController.store);
routes.post('/empresas/update/:empresa_id', EmpresaController.update);
routes.get('/empresas/delete/:empresa_id', EmpresaController.delete);

routes.get('/unidades', UnidadeController.index);
routes.get('/unidades/:unidade_id', UnidadeController.show);
routes.post('/unidades/store', UnidadeController.store);
routes.post('/unidades/update/:unidade_id', UnidadeController.update);
routes.get('/unidades/delete/:unidade_id', UnidadeController.delete);

routes.get('/usuarios', UsuarioController.index);
routes.get('/usuarios/:usuario_id', UsuarioController.show);
routes.post('/usuarios/store', UsuarioController.store);
routes.post('/usuarios/update/:usuario_id', UsuarioController.update);
routes.get('/usuarios/delete/:usuario_id', UsuarioController.delete);

routes.get('/ativos', AtivoController.index);
routes.get('/ativos/:ativo_id', AtivoController.show);
routes.post('/ativos/store', AtivoController.store);
routes.post('/ativos/update/:ativo_id', AtivoController.update);
routes.get('/ativos/delete/:ativo_id', AtivoController.delete);

module.exports = routes;
