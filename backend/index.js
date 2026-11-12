const express = require('express')
const app = express()
const cors = require('cors')

const funcionarioController = require('./controller/funcionario.controller')
const clienteController = require('./controller/cliente.controller')
const equipamentoController = require('./controller/equipamento.controller')
const inspecaoController = require('./controller/inspecao.controller')

const conn = require('./db/conn')
const hostname = 'localhost'
const PORT = 3000
//----------- Middleware -------------
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())
//------- Rotes ------------
app.post('/funcionario', funcionarioController.cadastrar)

app.post('/cliente', clienteController.cadastrar)
app.get('/cliente/:id', clienteController.consultar)
app.delete('/cliente/:id', clienteController.apagar)
app.put('/cliente/:id', clienteController.atualizar)

app.post('/equipamento', equipamentoController.cadastrar)
app.post('/inspecao', inspecaoController.cadastrar)

app.get('/',(req,res)=>{
    res.status(200).json({message: 'Aplicação rodando!!'})
})

//----------- Server --------------
conn.sync()
.then(()=>{
    app.listen(PORT, hostname, ()=>{
        console.log(`Servidor rodando em http://${hostname}:${PORT}`)
    })
})
.catch((err)=>{
    console.error('Erro ao tentar conectar com o banco de dados!!')
})