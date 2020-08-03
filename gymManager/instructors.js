const fs = require('fs') //trabalha com arquivos do sistema
const data = require(__dirname+"/data.json")
const { age, date } = require(__dirname+"/util")

// show
exports.show = function ( req, res ) {
    
    const { id } = req.params

    const foundInstructor = data.instructors.find(function ( instructor ) {
        return instructor.id == id
    })

    if ( !foundInstructor ) {
        return res.send(" Instructos not found! ")
    }

    const instructor = {
        ...foundInstructor, // coloca todos os campos, exceto os que foram corrigidos abaixo
        age: age(foundInstructor.birth),
        services: foundInstructor.services.split(","), // quebra a string quando encontra uma virgula, colocando em uma posição do array
        created_at: new Intl.DateTimeFormat('en-US').format(foundInstructor.created_at)
    }

    return res.render("instructors/show", { instructor })
}

// create
exports.post = function( req, res ) {
    
    const keys = Object.keys(req.body) // cria um array com os names dos inputs    

    for (let key of keys) {
        if (req.body[key] == "") { // equivale a req.body.key
            return res.send('Please, fill all fields')
        }
    }
    

    let { avatar_url, birth, name, services, gender } = req.body // desestruturação do objeto, pegando só o que será utilizado

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

    /* salva os dados no arquivo data | transforma data em JSON e faz a formatação de exibição com recuo de 2 espaços */
    fs.writeFile("gymManager/data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) {
            return res.send("Write file error!")
        }

        return res.redirect("/instructors")
    }) 

} 

// edit
exports.edit = function ( req, res ) {

    const { id } = req.params

    const foundInstructor = data.instructors.find(function ( instructor ) {
        return instructor.id == id
    })

    if ( !foundInstructor ) {
        return res.send(" Instructos not found! ")
    }

    const instructor = {
        ...foundInstructor,
        birth: date(foundInstructor.birth)
    }
    return res.render('instructors/edit', { instructor })

}
