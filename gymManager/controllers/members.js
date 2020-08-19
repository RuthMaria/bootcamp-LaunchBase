const fs = require('fs') //trabalha com arquivos do sistema
const data = require("../data.json")
const { date } = require("../util")

exports.index = function( req, res) {
    return res.render('members/index', { members: data.members })
}

exports.create = function ( req, res ) {
    return res.render('members/create')
}

exports.post = function( req, res ) {
    
    const keys = Object.keys(req.body)    

    for (let key of keys) {
        if (req.body[key] == "") { 
            return res.send('Please, fill all fields')
        }
    }
    
    let { avatar_url, birth, name, email, gender, blood, weight, height } = req.body 

    birth = Date.parse(birth) 
    
    const lastMember = data.members[data.members.length - 1]
    let id = 1

    if ( lastMember ) {
        id = lastMember.id + 1    
    } 

    data.members.push( {
        id,
        avatar_url,         
        birth, 
        name, 
        email, 
        gender, 
        blood, 
        weight, 
        height
    }) 

    fs.writeFile("gymManager/data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) {
            return res.send("Write file error!")
        }

        return res.redirect("/members")
    }) 
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
        birth: date(foundmember.birth).birthDay
    }

    return res.render("members/show", { member })
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
        birth: date(foundmember.birth).iso
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

