const fs = require('fs') //trabalha com arquivos do sistema
const data = require("../data.json")
const { age, date } = require("../util")

exports.index = function( req, res) {
    return res.render('members/index', { members: data.members })
}

exports.create = function ( req, res ) {
    return res.render('members/create')
}

exports.show = function ( req, res ) {
     
    const { id } = req.params 

    const foundmember = data.members.find(function ( member ) {
        return member.id == id
    })

    if ( !foundmember ) {
        return res.send(" Member not found! ")
    }

    const member = {
        ...foundmember, 
        age: age(foundmember.birth)
    }

    return res.render("members/show", { member })
}

exports.post = function( req, res ) {
    
    const keys = Object.keys(req.body)    

    for (let key of keys) {
        if (req.body[key] == "") { 
            return res.send('Please, fill all fields')
        }
    }
    
    let { avatar_url, birth, name, services, gender } = req.body 
    birth = Date.parse(birth)    
    const created_at = Date.now()
    const id = Number(data.members.length + 1)  

    data.members.push( {
        id, 
        avatar_url, 
        name, 
        birth, 
        gender,
        services, 
        created_at
    }) 

    fs.writeFile("gymManager/data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) {
            return res.send("Write file error!")
        }

        return res.redirect("/members")
    }) 
} 

exports.edit = function ( req, res ) {

    const { id } = req.params

    const foundmember = data.members.find(function ( member ) {
        return member.id == id
    })

    if ( !foundmember ) {
        return res.send(" Instructos not found! ")
    }

    const member = {
        ...foundmember,
        birth: date(foundmember.birth)
    }
    return res.render('members/edit', { member })

}

exports.put = function ( req, res) {

    const { id, birth } = req.body

    let index = 0

    const foundmember = data.members.find(function ( member, foundIndex ) {
        if ( member.id == id ) {
            index = foundIndex
            return true
        }
    })

    if ( !foundmember ) {
        return res.send(" Instructos not found! ")
    }

    const member = {
        ...foundmember,
        ...req.body,
        birth: Date.parse(birth),
        id: Number(id)
    }

    data.members[index] = member

    fs.writeFile("gymManager/data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) {
            return res.send("Write file error!")
        }

        return res.redirect(`/members/${id}`)
    })
}

exports.delete = function ( req, res) {
    const { id } = req.body

    /*  filter() cria um novo array com todos os elementos que passaram no teste implementado pela função fornecida */
    const filteredmembers = data.members.filter(function (member) {
        return member.id != id
    })

    data.members = filteredmembers 

    fs.writeFile("gymManager/data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) {
            return res.send("Write file error!")
        }

        return res.redirect("/members")
    })
}

