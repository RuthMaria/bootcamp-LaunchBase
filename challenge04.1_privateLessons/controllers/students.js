const fs = require("fs")
const { age, graduation, date, grade } = require("../util")
const data = require("../data.json")

exports.index = ( req, res ) => {

    const students = []

    for( student of data.students ){
        students.push(
            {
                id: student.id,
                avatar_url: student.avatar_url, 
                fullname: student.fullname, 
                email: student.email, 
                birth: student.birth,
                school_year: grade(student.school_year), 
                weekly_workload: student.weekly_workload
            })        
    }

    return res.render('students/index', { students })
}

exports.create = ( req, res ) => {
    return res.render('students/create')
}

exports.show = ( req, res ) => {
    
    const { id } =  req.params

    const foundstudent = data.students.find( student => student.id == id )

    if ( !foundstudent ) {
        return res.send (" student not found! ")
    }

    const student = {
        ...foundstudent,
        birth: date(foundstudent.birth).birthDay,
        school_year: grade(foundstudent.school_year)
    }

    return res.render("students/show", { student })
}

exports.post = ( req, res ) => {    
    
    const keys = Object.keys(req.body)

    for (let key of keys) {
        if (req.body[key] == "") {
            return res.send("Please, fill all fields!")
        }
    }

    let { avatar_url, fullname, email, birth, school_year, weekly_workload } = req.body

    birth = Date.parse(birth)
    let id = 1
    const lastIndex = data.students.length - 1
    const lastStudent = data.students[lastIndex]

    if ( lastStudent ) {
        id = lastStudent.id + 1
    }
    
    data.students.push ( {
        id, 
        avatar_url, 
        fullname, 
        email, 
        birth, 
        school_year, 
        weekly_workload
    })

    fs.writeFile("challenge04/data.json", JSON.stringify(data, null, 2), err => {
        if (err) {
            return res.send("Write file error!")
        }

        return res.redirect("/students")
    })

}

exports.edit = ( req, res ) => {

    const { id } = req.params

    const foundstudent = data.students.find( student => student.id == id )

    if ( !foundstudent ) {
        return res.send(" student not found! ")
    }

    const student = {
        ...foundstudent,
        birth: date(foundstudent.birth).iso
    }

    return res.render("students/edit", { student })

}

exports.update = ( req, res ) => {   

    const { id, birth } = req.body
    let index = 0

    const foundstudent = data.students.find(( student, foundIndex ) => {
        if ( student.id == id ) {
            index = foundIndex
            return true
        }
    })

    if( !foundstudent ){
        return res.send("student not found!")
    }

    const student = {
        ...foundstudent,
        ...req.body,
        id: Number(id),
        birth: Date.parse(birth)
    }

    data.students[index] = student

    fs.writeFile("challenge04/data.json", JSON.stringify(data, null, 2), err => {
        if (err) {
            return res.send("Write file error!")
        }
        return res.redirect(`/students/${id}`)
    })
}

exports.delete = ( req, res) => {
    const { id } = req.body
    
    const filteredstudent = data.students.filter( student => student.id != id )

    data.students = filteredstudent    
    
    fs.writeFile("challenge04/data.json", JSON.stringify(data, null, 2), err => {
        if (err) {
            return res.send("Write file error!")
        }
        return res.redirect("/students")
    })

}

