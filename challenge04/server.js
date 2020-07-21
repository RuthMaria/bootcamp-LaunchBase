const express = require('express')
const nunjucks = require('nunjucks')
const routes = require('./routes')

const server = express()
const PORT = 5000

server.use(express.static(__dirname + '/public'))

server.set('view engine', 'njk')
server.use(routes)

nunjucks.configure('challenge04/views', {
    express: server,
    autoescape: false,
    noCache: true
})

server.listen(PORT, function () {
    console.log('Server is running on localhost:'+PORT)
})
