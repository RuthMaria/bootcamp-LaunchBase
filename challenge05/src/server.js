const express = require('express')
const nunjucks = require('nunjucks')
const routes = require('./routes')
const methodOverride = require('method-override')

const server = express()
const PORT = 5000
server.use(express.urlencoded ( { extended: true }))
server.use(express.static(__dirname + '/public'))
server.use(methodOverride('_method'))
server.use(routes)

server.set('view engine', 'njk')

nunjucks.configure('challenge05/src/app/views', {
    express: server,
    autoescape: false,
    noCache: true
})

server.listen(PORT, function () {
    console.log('Server is running on localhost:'+PORT)
})
