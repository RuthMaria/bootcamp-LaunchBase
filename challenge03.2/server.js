const express = require('express')
const nunjucks = require('nunjucks')
//const courses = require('./data')

const server = express()
const PORT = 5000

server.use(express.static(__dirname + '/public'))

server.set('view engine', 'html')

nunjucks.configure('challenge03.2/views', {
    express: server,
    autoescape: false,
    noCache: true
})

server.get('/', ( req, res ) => {
    return res.render('home')
})

server.get('/about', ( req, res ) => {
    return res.render('about')
})

server.get('/recipes', ( req, res ) => {
    return res.render('recipes')
})

server.listen(PORT, function () {
    console.log('server is running on localhost:'+PORT)
})

