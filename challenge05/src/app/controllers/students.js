const { age, graduation, date, grade } = require("../../lib/utils")

module.exports = {

    index( req, res ) {
        return res.render('students/index')
    },

    create( req, res ) {
        return res.render('students/create')
    },

    post( req, res ) {
        const keys = Object.keys(req.body)

        for (let key of keys) {
            if (req.body[key] == "") {
                return res.send("Please, fill all fields!")
            }
        }

        let { avatar_url, fullname, email, birth, school_year, weekly_workload } = req.body
        return 
    },
    
    show( req, res ) {
        return
    },

    edit( req, res ) {
        return
    },

    update( req, res ) {
        const keys = Object.keys(req.body)

        for (let key of keys) {
            if (req.body[key] == "") {
                return res.send("Please, fill all fields!")
            }
        }

        let { avatar_url, fullname, email, birth, school_year, weekly_workload } = req.body

        return
    },
    
    delete( req, res ) {
        return
    },
}


