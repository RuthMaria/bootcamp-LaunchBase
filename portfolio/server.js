const express = require('express')
const nunjucks = require('nunjucks')
const videos = require('./data')

const server = express()
const PORT = 5000

server.use(express.static(`${__dirname}/public`))

server.set('view engine', 'njk')

nunjucks.configure('portfolio/views', {
    express: server,
    autoescape: false,   /* serve para o nunjuck aceitar tags HTML*/
    noCache: true
})

server.get('/', (req, res) => {

    const data = {
        avatar_url: 'https://avatars1.githubusercontent.com/u/18095161?s=400&u=d5b33e364d59a7de87e0245bd81a453be3050b9b&v=4',
        name: 'Ruth Maria',
        role1: 'Bacharel em Ciência da Computação - UFAL',
        role2: 'Técnica em informática - IFAL ',
        role3: 'Junior web developer',
        description: 'Entusiasta das melhores tecnologias de desenvolvimento back-end e front-end <br> Apaixonada por livros, boas séries e escrever sobre as tecnologias que aprende <br>',
        links: [
            {name: 'Linkedin', url: 'https://www.linkedin.com/in/ruth-maria-9b256071/'},
            {name: 'GitHub', url: 'https://github.com/RuthMaria'},
            {name: ' Facebook ', url: 'https://www.facebook.com/ruth.maria.1829'}
        ]
    }
    return res.render('about', { data })
})

server.get('/portfolio', (req, res) => {
    return res.render('portfolio', { items: videos })
})

server.get('/video', (req, res) => {
    const id = req.query.id  /* Pega o id do front-end */

    const video = videos.find( video => {
        return  (video.id == id)
    })

    if (!video) {
        return res.send('Video not found!')
    }
   
    return res.render('video', { video })
})

server.listen(PORT, function () {
    console.log('Server is running on localhost:'+PORT)
})