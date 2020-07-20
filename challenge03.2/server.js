const express = require('express')
const nunjucks = require('nunjucks')
const recipes = require('./data')

const server = express()
const PORT = 5000

server.use(express.static(__dirname + '/public'))

server.set('view engine', 'njk')

nunjucks.configure('challenge03.2/views', {
    express: server,
    autoescape: false,
    noCache: true
})

server.get('/', ( req, res ) => {
    return res.render('home', { recipes })
})

server.get('/about', ( req, res ) => {
    return res.render('about')
})

server.get('/recipes', ( req, res ) => {
    return res.render('recipes', { recipes })
})

server.get('/recipes/:index', ( req, res ) => {

    const recipeIndex = req.params.index;

    const recipe = recipes[recipeIndex]

return res.render('recipe_description', {recipe})
})

server.listen(PORT, function () {
    console.log('server is running on localhost:'+PORT)
})

