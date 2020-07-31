const fs = require('fs') //trabalha com arquivos do sistema
const data = require(__dirname+"/data.json")

// create
exports.post = function( req, res ) {
    
    const keys = Object.keys(req.body) // cria um array com os nomes dos inputs
    let { avatar_url, birth, name, services, gender } = req.body

    for (let key of keys) {
        if (req.body[key] == "") { // equivale a req.body.key
            return res.send('Please, fill all fields')
        }
    }

    birth = Date.parse(birth) // transforma a data em milissegundos, para ficar igual a created_at
    const created_at = Date.now() /* cria um atributo com a data de hoje */
    const id = Number(data.instructors.length + 1)  

    data.instructors.push( {
        id, 
        avatar_url, 
        name, 
        birth, 
        gender,
        services, 
        created_at
    }) 

    /* salva os dados no arquivo data | transforma req.body em JSON e faz a formatação de exibição com recuo de 2 espaços|  */
    fs.writeFile("gymManager/data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) {
            return res.send("Write file error!")
        }

        return res.redirect("/instructors")
    }) 

} 