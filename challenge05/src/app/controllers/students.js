const { date, grade, checkEmptyFields } = require("../../lib/utils")
const { all, create, find, update, _delete } = require('../models/Student')

module.exports = {

    index( req, res ) {

        all( _students => {
            const students = []

            for(let student of _students){
                students.push({
                    ...student,
                    school_year: grade(student.school_year)
                })
            }
            return res.render('students/index', { students })
        })
    },

    create( req, res ) {
        return res.render('students/create')
    },

    post( req, res ) {

        if(checkEmptyFields(req.body))
            return res.send("Please, fill all fields!")

        create(req.body, () => {
            return res.redirect('/students')
        })
        
    },
    
    show( req, res ) {
        
        find(req.params.id, student => {

            if( !student )
                return res.send('Student not found!')

            student.school_year = grade(student.school_year)
            student.birth = date(student.birth).birthDay

            return res.render('students/show',  { student })
        })
    },

    edit( req, res ) {
       
        find(req.params.id, student => {

            if( !student )
                return res.send('Student not found!')

            student.birth = date(student.birth).iso

            return res.render('students/edit',  { student })
        })
    },

    update( req, res ) {

        if(checkEmptyFields(req.body))
            return res.send("Please, fill all fields!")

        update(req.body, student => {
            return res.redirect(`/students/find/${student.id}`)
        })
    },
    
    delete( req, res ) {
        
        _delete(req.body.id, () => {
            return res.redirect("/students")
        })
    },
}


