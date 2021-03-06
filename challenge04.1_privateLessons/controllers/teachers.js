const fs = require("fs")
const { age, graduation, date } = require("../util")
const data = require("../data.json")

exports.index = ( req, res ) => {

    const teachers = []

    for( teacher of data.teachers ){
        teachers.push(
            {
                id: teacher.id,
                avatar_url: teacher.avatar_url, 
                fullname: teacher.fullname, 
                birth: teacher.birth, 
                education_level: teacher.education_level, 
                classes: teacher.classes, 
                occupation_area: teacher.occupation_area,
                created_at: teacher.created_at,
                occupation_area: teacher.occupation_area.split(",")
            })        
    }

    return res.render('teachers/index', { teachers })
}

exports.create = ( req, res ) => {
    return res.render('teachers/create')
}

exports.post = ( req, res ) => {    
    
    const keys = Object.keys(req.body)

    for (let key of keys) {
        if (req.body[key] == "") {
            return res.send("Please, fill all fields!")
        }
    }

    let { avatar_url, fullname, birth, education_level, classes, occupation_area } = req.body

    birth = Date.parse(birth)
    const id = Number(data.teachers.length + 1)
    const created_at = Date.now()
    
    data.teachers.push ( {
        id,
        avatar_url, 
        fullname, 
        birth, 
        education_level, 
        classes, 
        occupation_area,
        created_at
    })

    fs.writeFile("challenge04/data.json", JSON.stringify(data, null, 2), err => {
        if (err) {
            return res.send("Write file error!")
        }

        return res.redirect("/teachers")
    })

}

exports.show = ( req, res ) => {
    
    const { id } =  req.params

    const foundTeacher = data.teachers.find( teacher => teacher.id == id )

    if ( !foundTeacher ) {
        return res.send (" Teacher not found! ")
    }

    const teacher = {
        ...foundTeacher,        
        age: age(foundTeacher.birth),
        occupation_area: foundTeacher.occupation_area.split(","),
        created_at: new Intl.DateTimeFormat('en-US').format(foundTeacher.created_at),
        education_level: graduation(foundTeacher.education_level)
    }

    return res.render("teachers/show", { teacher })
}

exports.edit = ( req, res ) => {

    const { id } = req.params

    const foundTeacher = data.teachers.find( teacher => teacher.id == id )

    if ( !foundTeacher ) {
        return res.send(" Teacher not found! ")
    }

    const teacher = {
        ...foundTeacher,
        birth: date(foundTeacher.birth).iso
    }

    return res.render("teachers/edit", { teacher })

}

exports.update = ( req, res ) => {   

    const { id, birth } = req.body
    let index = 0

    const foundTeacher = data.teachers.find(( teacher, foundIndex ) => {
        if ( teacher.id == id ) {
            index = foundIndex
            return true
        }
    })

    if( !foundTeacher ){
        return res.send("Teacher not found!")
    }

    const teacher = {
        ...foundTeacher,
        ...req.body,
        id: Number(id),
        birth: Date.parse(birth)
    }

    data.teachers[index] = teacher

    fs.writeFile("challenge04/data.json", JSON.stringify(data, null, 2), err => {
        if (err) {
            return res.send("Write file error!")
        }
        return res.redirect(`/teachers/${id}`)
    })
}

exports.delete = ( req, res) => {
    const { id } = req.body
    
    const filteredTeacher = data.teachers.filter( teacher => teacher.id != id )

    data.teachers = filteredTeacher    
    
    fs.writeFile("challenge04/data.json", JSON.stringify(data, null, 2), err => {
        if (err) {
            return res.send("Write file error!")
        }
        return res.redirect("/teachers")
    })

}

