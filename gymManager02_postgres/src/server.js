const express = require('express')
const nunjucks = require('nunjucks')
const routes = require('./routes')
const methodOverride = require('method-override')

const server = express()
const PORT = 5000

server.use(express.urlencoded({ extented: true })) /* para usar o req.body */
server.use(express.static("gymManager02_postgres/public")) 
server.use(methodOverride('_method')) /* serve para o FORM aceitar o PUT e DELETE */
server.use(routes)  /* middleware que está configurado para usar o arquivo de rotas */

server.set('view engine', 'njk')

nunjucks.configure('gymManager02_postgres/src/app/views', {
    express: server,
    autoescape: false,   /* serve para o nunjuck aceitar tags HTML */
    noCache: true
})

server.listen(PORT, function () {
    console.log('Server is running on localhost:'+PORT)
})