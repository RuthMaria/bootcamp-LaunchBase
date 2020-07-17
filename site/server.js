const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const PORT = 5000

server.use(express.static(`${__dirname}/public`))

server.set('view engine', 'njk')

nunjucks.configure('site/views', {
    express: server,
})

server.get('/', (req, res) => {
    return res.render('about')
})

server.get('/portfolio', (req, res) => {
    return res.render('portfolio')
})

server.listen(PORT, function () {
    console.log('Server is running on localhost:'+PORT)
})