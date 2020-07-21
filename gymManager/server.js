const express = require('express')
const nunjucks = require('nunjucks')
const routes = require('./routes')

const server = express()
const PORT = 5000

server.use(express.static(`${__dirname}/public`))
server.use(routes)  /* middleware que está configurado para usar o arquivo de rotas */

server.set('view engine', 'njk')

nunjucks.configure('gymManager/views', {
    express: server,
    autoescape: false,   /* serve para o nunjuck aceitar tags HTML */
    noCache: true
})

server.listen(PORT, function () {
    console.log('Server is running on localhost:'+PORT)
})