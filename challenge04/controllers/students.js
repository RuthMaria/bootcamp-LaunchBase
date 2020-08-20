const fs = require("fs")
const { age, graduation, date } = require("../util")
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
                school_year: student.school_year, 
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
        age: age(foundstudent.birth),
        occupation_area: foundstudent.occupation_area.split(","),
        created_at: new Intl.DateTimeFormat('en-US').format(foundstudent.created_at),
        education_level: graduation(foundstudent.education_level)
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
    const number_of_students = data.students.length - 1
    const lastStudent = data.students[number_of_students]

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
        birth: date(foundstudent.birth)
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

