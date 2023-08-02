const router = require('express').Router()
const Pessoa = require('../models/Pessoa')

//salvar pessoa
router.post('/', async (req, res) => { 
    //A ROTA PARA ACESSAR SERÁ /pessoas/ -> o "pessoas" está no index.js
    //Criamos uma funcao assincrona pra garantir que a aplicacao vai passar um determinado
    // tempo tentando se conectar ao banco de dados para inserir o dado no banco
    //Lembando: Vou cadastrar, pra isso, preciso receber os dados pela req (requisicao)

    const {nome, salario, aprovado} = req.body //atribui a essas variaveis os parametros que vierem da requisição pelo body

    if(!nome){
        //Se a requisicao nao tiver um nome
        res.status(422).json({error: 'O nome é obrigatório'})
        return //Dando o return, nao executa mais nada abaixo

    }
    //Crio a entidade
    const pessoa = {
        nome,
        salario,
        aprovado
    }

    try{
        //await = esperar a requisicao terminar
        await Pessoa.create(pessoa) //salvar o registro "pessoa" no banco
        
        res.status(201).json({message: 'Pessoa inserida com sucesso!'})
    }catch(error){
        //Envia uma resposta com status 500 - Erro do servidor
        res.status(500).json({error: error})
    }
})

//ready - leitura de todos os dados
router.get('/', async (req, res) => { 
    //a rota fica /pessoa/ -> Method GET
    try{
        const pessoas = await Pessoa.find()

        res.status(200).json(pessoas)
    }catch(error){
        res.status(500).json({error: error})
    }
})


router.get('/:id', async (req, res) => {

    //Mostra tudo que vem da requisicao
    //console.log(req)

    //extrair o dado da requisição, pela url -> req.params
    const id = req.params.id

    try{
        const pessoa = await Pessoa.findOne({ _id: id })

        if(!pessoa){
            res.status(422).json({message: 'A pessoa não foi encontrada'})
            return //Dando o return, nao executa mais nada abaixo
        }
        res.status(200).json(pessoa)
    }catch(error){
        res.status(500).json({error: error})
    }
})

//Update - atualização dos dados - PUT (atualiza tudo) e PATCH (atualiza alguns dados)
router.patch('/:id', async (req, res) => {
    //extrair o dado da requisição, pela url -> req.params
    const id = req.params.id

    const {nome, salario, aprovado} = req.body //atribui a essas variaveis os parametros que vierem da requisição pelo body

    const pessoa = {
        nome,
        salario,
        aprovado
    }

    try{
        const updatePessoa = await Pessoa.updateOne({_id: id}, pessoa)

        if (updatePessoa.matchedCount === 0){
            //matchedcount = quantas linhas foram alteradas
            res.status(422).json({message: 'A pessoa não foi encontrada para atualizar'})
            return //Dando o return, nao executa mais nada abaixo
        }
        res.status(200).json(pessoa)

    }catch(error){
        res.status(500).json({error: error})
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id

    try{
        const pessoa = await Pessoa.findOne({ _id: id })

        if(!pessoa){
            res.status(422).json({message: 'A pessoa não foi encontrada para ser deletada'})
            return //Dando o return, nao executa mais nada abaixo
        }

        await Pessoa.deleteOne({_id: id})
        res.status(200).json({message: 'Usuario removido com sucesso!'})
    }catch(error){
        res.status(500).json({error: error})
    }    
})
module.exports = router
