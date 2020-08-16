const express = require('express')
const routes = express.Router() // responsável pela criação das rotas
const instructors = require('./instructors')

routes.get('/', ( req, res ) => {
    return res.redirect('/instructors')
})

routes.get('/instructors', ( req, res ) => {
    return res.render('instructors/index')
})

routes.get('/instructors/create', ( req, res ) => {
    return res.render('instructors/create')
})

routes.post('/instructors', instructors.post) 

routes.get("/instructors/:id", instructors.show)

routes.get("/instructors/:id/edit", instructors.edit)

routes.put("/instructors", instructors.put)

routes.delete("/instructors", instructors.delete)

routes.get('/members', ( req, res ) => {
    return res.send('members')
})

module.exports = routes

/*
HTTP VERBS

GET: Receber RESOURCE
POST: Criar um novo RESOURCE com dados enviados
PUT: Atualizar RESOURCE
DELETE: Deletar RESOURCE
*/