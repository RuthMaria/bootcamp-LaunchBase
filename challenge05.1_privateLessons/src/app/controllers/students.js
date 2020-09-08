const { date, grade, checkEmptyFields, ArraysStudents } = require("../../lib/utils")
const { create, find, update, _delete, teachersSelectOptions, paginate } = require('../models/Student')

module.exports = {

    index( req, res ) {        
            
        let { filter, page, limit } = req.query

        page = page || 1
        limit = limit || 3
        let offset = limit * (page - 1)

        const params = {
            limit,
            offset,
            filter,

            callback(_students){
                
                let total
                const students = ArraysStudents(_students)

                if(_students != null && _students.length != 0)
                    total = Math.ceil(_students[0].total_students / limit)

                const pagination = {
                    totalPages: total,
                    page
                }
                        
                return res.render('students/index', { students, pagination, filter })

            }
        }

        paginate(params)
    },

    create( req, res ) {

        teachersSelectOptions( options => {
            return res.render('students/create', { teacherOptions: options })
        })
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

            teachersSelectOptions( options => {
                student.birth = date(student.birth).iso

                return res.render('students/edit',  { student,  teacherOptions: options })
            })
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


