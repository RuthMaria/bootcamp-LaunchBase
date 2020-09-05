const express = require('express')
const nunjucks = require('nunjucks')
const courses = require('./data')

const server = express()
const PORT = 5000

server.use(express.static(__dirname + '/public'))

server.set('view engine', 'njk')

nunjucks.configure('challenge03.1_rocketseat/views', {
    express: server,
    autoescape: false,
    noCache: true
})

server.get('/', (req, res) => {
    return res.render('courses', { courses })
})

server.get('/about', (req, res) => {

    const data = {
        image_url: 'images/logo-rocketseat.jpg',
        title: 'Rocketseat',
        description: 'No meio de tanta informação e da quantidade de ferramentas que surgem todos os dias, você precisa de alguém que te leve na direção certa. A Rocketseat trabalha com as melhores tecnologias do momento.',
        title2: 'Principais tecnologias utilizadas em nossos cursos',
        technologies: [
            {name: 'javascript', url: 'https://rocketseat.com.br/static/images/update/curso-javascript.svg'},
            {name: 'NodeJs', url: 'https://rocketseat.com.br/static/images/update/curso-nodejs.svg'},
            {name: 'ReactJS', url: 'https://rocketseat.com.br/static/images/update/curso-reactjs.svg'},
            {name: 'React Native', url: 'https://rocketseat.com.br/static/images/update/curso-react-native.svg'}
        ]
    }
    return res.render('about', { data })
})

server.get("/courses/:id", (req, res) => {
    let id = req.params.id;
      
    const found_course = courses.find( course => {
        return (course.id_01 == id)
    })

    if (!found_course) {
        return res.status(404).render("not-found");
    }
     
    return res.render('course_description', { found_course })
});

server.use(function(req, res) {
    res.status(404).render("not-found");
});

server.listen(PORT, function () {
    console.log('Server is running on localhost:'+PORT)
})
