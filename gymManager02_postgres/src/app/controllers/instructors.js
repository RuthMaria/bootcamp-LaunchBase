const { age, date } = require("../../lib/util")

module.exports = {

    index ( req, res) {
        return res.render('instructors/index')
    },

    create ( req, res ) {
        return res.render('members/create')
    },

    post ( req, res ) {
    
        // req.body pega os dados do formulário
        const keys = Object.keys(req.body) // cria um array com os names dos inputs    

        for (let key of keys) {
            if (req.body[key] == "") { // equivale a req.body.key
                return res.send('Please, fill all fields')
            }
        }        
        
        return
    }, 

    show ( req, res ) {
     
        return
    },

    edit ( req, res ) {

        return
    },

// alterar
    put ( req, res) {
        
        const keys = Object.keys(req.body)     

        for (let key of keys) {
            if (req.body[key] == "") { 
                return res.send('Please, fill all fields')
            }
        }        

        let { avatar_url, birth, name, services, gender } = req.body 

        return
    },

    delete ( req, res) {
        return   
    }
}