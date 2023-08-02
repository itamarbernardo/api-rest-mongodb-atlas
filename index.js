//Config inicial
require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
//forma de ler JSON /middlewares
app.use( //Quando declaro o .use(), tô declarando um middleware
    express.urlencoded({
        extended: true,
    })
)

app.use(express.json())

//rotas da API
const pessoaRoutes = require('./routes/pessoaRoutes')

app.use('/pessoa', pessoaRoutes) //Define quais rotas serão acessadas por meio do pessoaRoutes ->

//rota inicial / endpoint
app.get('/', (req, res) => {
    res.json({message: 'Oi Express!'})
})

const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

//O .connect e .then e .catch fazem parte do mongoose, só demos um enter pra ficar mais facil de ver
mongoose
    .connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.vzpl4oz.mongodb.net/bancodaapi?retryWrites=true&w=majority`)
    .then(() => {
        //Quando a conexao dá certo
        console.log('Conectamos ao MongoDB Atlas!')
        //Entrega uma porta para escutar
        app.listen(3000)

    })
    .catch((err) => {
        console.log('Erro ao conectar')
        console.log(err)
    })

