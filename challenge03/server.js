const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const PORT = 5000

server.use(express.static(__dirname + '/public'))

server.set('view engine', 'njk')

nunjucks.configure('challenge03/views', {
    express: server,
})

server.get('/', (req, res) => {
    return res.render('courses')
})

server.get('/about', (req, res) => {
    return res.render('about')
})

server.use(function(req, res) {
    res.status(404).render("not-found");
});

server.listen(PORT, function () {
    console.log('Server is running on localhost:'+PORT)
})
