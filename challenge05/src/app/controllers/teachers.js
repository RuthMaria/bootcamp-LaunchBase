const { age, graduation, date, grade } = require("../../lib/utils")
const { create, all, find, update, _delete } = require('../models/Teacher')
const Instructor = require("../../../../gymManager_postgres/src/app/models/Instructor")

module.exports = {

    index( req, res ) {

        all(_teachers => {            
            const teachers = []

            for( teacher of _teachers ){
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
        })
    },

    create( req, res ) {        
        return res.render('teachers/create')
    },

    post( req, res ) {

        const keys = Object.keys(req.body)

        for (let key of keys) {
            if (req.body[key] == "") {
                return res.send("Please, fill all fields!")
            }
        }

        create(req.body, () => {
            return res.redirect(`/teachers`)
        })
    },
    
    show( req, res ) {

        find(req.params.id, foundTeacher => {

            if ( !foundTeacher ) 
                return res.send("Teacher not found!") 

            const teacher = {
                ...foundTeacher,        
                age: age(foundTeacher.birth),
                occupation_area: foundTeacher.occupation_area.split(","),
                created_at:date(foundTeacher.created_at).format,
                education_level: graduation(foundTeacher.education_level)
            }

            return res.render("teachers/show", { teacher })
        })        
    },

    edit( req, res ) {

        find(req.params.id, teacher => {
            
            if ( !teacher ) 
                return res.send("Teacher not found!") 

            teacher.birth = date(teacher.birth).iso

            return res.render("teachers/edit", { teacher })
        })
    },

    update( req, res ) {
        const keys = Object.keys(req.body)

        for (let key of keys) {
            if (req.body[key] == "") {
                return res.send("Please, fill all fields!")
            }
        }

        return
    },
    
    delete( req, res ) {
        return
    },
}


