const db = require('../../config/db')
const { date } = require("../../lib/utils")


module.exports = {

    all(callback){

        const query = 'SELECT * FROM students'

        db.query(query, (err, results) => {
            if(err)
                throw `Database error! ${err}`

            callback(results.rows)
        })
    },

    create(data, callback){
        const { avatar_url, fullname, email, birth, school_year, weekly_workload, teacher } = data

        const query = `
            INSERT INTO students (
                avatar_url, 
                fullname, 
                email, 
                birth, 
                school_year, 
                weekly_workload,
                teacher_id
            ) VALUES ( $1, $2, $3, $4, $5, $6, $7 )
        `
        
        const values = [
            avatar_url, 
            fullname, 
            email, 
            birth, 
            school_year, 
            weekly_workload,
            teacher
        ]

        db.query(query, values, (err, results) => {
            if(err)
                throw `Database error! ${err}`
            
            callback()
        })

    },

    find(id, callback){
        const query = `SELECT students.*, teachers.fullname AS teacher_name
                        FROM students
                        LEFT JOIN teachers ON (students.teacher_id = teachers.id) 
                        WHERE students.id = $1`

        db.query(query, [id], (err,results) => {
            if(err)
                throw `Database error! ${err}`
            
                callback(results.rows[0])
        })
    },

    update(data, callback){

        const { avatar_url, fullname, email, birth, school_year, weekly_workload, id } = data

        const query = `
            UPDATE students SET 
                avatar_url = ($1), 
                fullname = ($2), 
                email = ($3), 
                birth = ($4), 
                school_year = ($5), 
                weekly_workload = ($6)
            WHERE id = ($7)
            RETURNING id
        `

        const values = [
            avatar_url, 
            fullname, 
            email, 
            date(birth).iso, 
            school_year, 
            weekly_workload, 
            id
        ]

        db.query(query, values, (err, results) => {
            if(err)
                throw `Database error! ${err}`

            callback(results.rows[0])
        })
    },

    _delete(id, callback){

        const query = 'DELETE FROM students WHERE  id = $1'

        db.query(query, [id], (err,results) => {
            if(err)
                throw `Database error! ${err}`

            callback()
        })
    },

    teachersSelectOptions(callback){

        const query = `SELECT fullname, id FROM teachers`

        db.query(query, (err, results) => {
            if(err)
                throw `Database error! ${err}`

            callback(results.rows)
        })
    }
}