const express = require('express')
const routes = express.Router() // responsável pela criação das rotas

routes.get('/', ( req, res ) => {
    return res.render('layout.njk')
})

module.exports = routes

/*
HTTP VERBS

GET: Receber RESOURCE
POST: Criar um novo RESOURCE com dados enviados
PUT: Atualizar RESOURCE
DELETE: Deletar RESOURCE
*/