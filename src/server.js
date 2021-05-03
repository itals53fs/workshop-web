const express = require('express')
const app = express()
const porta = 3000
app.use(express.json({extends:true}))
let produto = []
app.get('/', (req, res)=>{
    res.send(produto)
})

app.post('/cadastrar', (req, res)=>{
    const {name, preco} = req.body;
    produto.push({name, preco})
    res.send({name, preco})
})

app.listen(porta, function(){
    console.log(`Rodando na ${porta}`)
})