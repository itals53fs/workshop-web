const express = require('express')
const app = express()
const porta = 3000

const fs = require('fs')

app.use(express.json({extends:true}))

const lerArquivo = () =>{
    const produtos = fs.readFileSync('./src/data/items.json', 'utf8');
    return JSON.parse(produtos);
}

const escreverArquivo = (conteudo) =>{
    const produto = JSON.stringify(conteudo, null, 2);
    const produtos = fs.writeFileSync('./src/data/items.json', produto ,'utf8')
}


app.get('/', (req, res)=>{
    res.send(produto)
})

app.get('/listar', (req, res) => {
    const produtos = lerArquivo();

    res.send(produtos)
})

app.get('/listar/:id', (req, res) =>{
    const {id} = req.params;

    const produtos = lerArquivo();
    const itemSelecionado = produtos.find( item => item.id == id );

    if(!itemSelecionado){
        return res.status(404).send({mensagem: "Tênis não encontrado"})
    }

    return res.send(itemSelecionado);
})

app.post('/cadastrar', (req, res)=>{

    const {name, desc, cor, numero, preco, img} = req.body;

    const id = Math.random().toString(32).substr(2, 9)
   
    const produtos = lerArquivo();
    produtos.push({id, name, desc, cor, numero, preco, img})

    escreverArquivo(produtos)
   
    res.send({id, name, desc, cor, numero, preco, img})

})



app.listen(porta, function(){
    console.log(`Rodando na ${porta}`)
})