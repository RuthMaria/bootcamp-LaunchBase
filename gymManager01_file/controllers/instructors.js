const fs = require('fs') //trabalha com arquivos do sistema
const data = require("../data.json")
const { age, date } = require("../util")

exports.index = function( req, res) {
    return res.render('instructors/index', { instructors: data.instructors })
}

exports.create = function ( req, res ) {
    return res.render('instructors/create')
}

exports.post = function( req, res ) {
    
    // req.body pega os dados do formulário
    const keys = Object.keys(req.body) // cria um array com os names dos inputs    

    for (let key of keys) {
        if (req.body[key] == "") { // equivale a req.body.key
            return res.send('Please, fill all fields')
        }
    }
    

    let { avatar_url, birth, name, services, gender } = req.body // desestruturação do objeto, pegando só o que será utilizado
    birth = Date.parse(birth)
     // transforma a data em milissegundos, para ficar igual a created_at
    const created_at = Date.now() /* cria um atributo com a data de hoje */
    
    const lastInstructor = data.instructors[data.instructors.length - 1]
    let id = 1

    if ( lastInstructor ) {
        id = lastInstructor.id + 1    
    }   

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

exports.show = function ( req, res ) {
     
    /* req.params pega os dados da URL */
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
        birth: date(foundInstructor.birth).iso
    }

    return res.render('instructors/edit', { instructor })

}

// alterar
exports.put = function ( req, res) {

    const { id, birth } = req.body

    let index = 0

    const foundInstructor = data.instructors.find(function ( instructor, foundIndex ) {
        if ( instructor.id == id ) {
            index = foundIndex
            return true
        }
    })

    if ( !foundInstructor ) {
        return res.send(" Instructos not found! ")
    }

    const instructor = {
        ...foundInstructor,
        ...req.body,
        birth: Date.parse(birth),
        id: Number(id)
    }

    data.instructors[index] = instructor

    fs.writeFile("gymManager/data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) {
            return res.send("Write file error!")
        }

        return res.redirect(`/instructors/${id}`)
    })
}

exports.delete = function ( req, res) {
    const { id } = req.body

    /*  filter() cria um novo array com todos os elementos que passaram no teste implementado pela função fornecida */
    const filteredInstructors = data.instructors.filter(function (instructor) {
        return instructor.id != id
    })

    data.instructors = filteredInstructors 

    fs.writeFile("gymManager/data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) {
            return res.send("Write file error!")
        }

        return res.redirect("/instructors")
    })
}

