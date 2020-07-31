const express = require('express')
const routes = express.Router() // responsável pela criação das rotas
const instructors = require('./instructors')

routes.get('/', ( req, res ) => {
    return res.redirect('/instructors')
})

routes.get('/instructors', ( req, res ) => {
    return res.render('instructors/index')
})

routes.post('/instructors', instructors.post) 

routes.get('/instructors/create', ( req, res ) => {
    return res.render('instructors/create')
})

routes.get('/members', ( req, res ) => {
    return res.send('members')
})

module.exports = routes