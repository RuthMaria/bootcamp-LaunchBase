const express = require('express')
const nunjucks = require('nunjucks')
const routes = require('./routes')
const methodOverride = require('method-override')

const server = express()
const PORT = 5000

server.use(express.urlencoded ( { extended: true }))
server.use(express.static('challenge05.2_foodfy/public'))
server.use(methodOverride('_method'))
server.use(routes)

server.set('view engine', 'njk')

nunjucks.configure('challenge05.2_foodfy/src/app/views', {
    express: server,
    autoescape: false,
    noCache: true
})

server.listen(PORT, function () {
    console.log('server is running on localhost:'+PORT)
})

