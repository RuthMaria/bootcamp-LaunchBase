const fs = require('fs') //trabalha com arquivos do sistema

// create
exports.post = function( req, res ) {
    
    const keys = Object.keys(req.body) // cria um array com os nomes dos inputs

    for (let key of keys) {
        if (req.body[key] == "") { // equivale a req.body.key
            return res.send('Please, fill all fields')
        }
    }
    return res.send(req.body)
} 