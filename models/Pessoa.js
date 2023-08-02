const mongoose = require('mongoose')

const Pessoa = mongoose.model('Pessoa', {
    nome: String,
    salario: Number,
    aprovado: Boolean,
}) //Vai criar uma tabela chamada pessoas com esses campos

module.exports = Pessoa

