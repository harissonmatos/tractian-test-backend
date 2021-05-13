const express = require('express')
const router = express.Router()

const Ativo = require('./models/Ativo')


// Configuração do multer para upload de arquivos
const multer = require("multer")
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname)
    },
})
const upload = multer({storage})

// defindo rota estatica para diretorio de uploads
router.use('/uploads', express.static('./uploads'))


// Rotas

router.get('/ativo', async (req, res) => {
    const ativos = await Ativo.find()
    res.send(ativos)
})
router.post('/ativo/adicionar', async (req, res) => {
    const ativo = new Ativo(req.body)
    const resultado = await ativo.save()

    res.send(resultado)
})


router.post("/img", upload.single("img"), (req, res) => {
    console.log(req.body, req.file)
    res.send("ok")
})


module.exports = router