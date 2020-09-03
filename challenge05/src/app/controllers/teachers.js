const { age, graduation, date, checkEmptyFields, ArraysTeachers } = require("../../lib/utils")
const { create, find, update, _delete, paginate } = require('../models/Teacher')

module.exports = {

    index( req, res ) {

        let { filter, page, limit } = req.query

        page = page || 1
        limit = limit || 2
        let offset = limit * (page - 1)

        const params = {
            limit,
            offset,
            filter,

            callback(_teachers){
                
                const teachers = ArraysTeachers(_teachers)

                const pagination = {
                    totalPages: Math.ceil(_teachers[0].total_teachers / limit),
                    page
                }
                             
                return res.render('teachers/index', { teachers, pagination, filter })

            }
        }

        paginate(params)
    },

    create( req, res ) {        
        return res.render('teachers/create')
    },

    post( req, res ) {
        
        if(checkEmptyFields(req.body))
            return res.send("Please, fill all fields!")

        create(req.body, () => {
            return res.redirect(`/teachers`)
        })
    },
    
    show( req, res ) {

        find(req.params.id, teacher => {
            if ( !teacher ) 
                return res.send("Teacher not found!") 
                  
            teacher.age = age(teacher.birth),
            teacher.occupation_area = teacher.occupation_area.split(","),
            teacher.created_at = date(teacher.created_at).format,
            teacher.education_level = graduation(teacher.education_level)

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

        if(checkEmptyFields(req.body))
            return res.send("Please, fill all fields!")
        
        update(req.body, teacher => {
            return res.redirect(`/teachers/find/${teacher.id}`)
        })
    },
    
    delete( req, res ) {
        
        _delete(req.body.id, () => {
            return res.redirect("/teachers")
        })
    },
}


