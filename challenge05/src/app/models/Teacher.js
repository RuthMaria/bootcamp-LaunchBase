const { date } = require("../../lib/utils")
const db = require('../../config/db')

module.exports = {

    all(callback) {

        const query = 'SELECT * FROM teachers ORDER BY fullname ASC'

        db.query(query, (err, results) => {
            if (err) 
                throw `Database error! ${err}`

            callback(results.rows)
        })
    },

    create(data, callback) {

        const { avatar_url, fullname, birth, education_level, classes, occupation_area } = data
        const todayDate = Date.now()

        const query = `
            INSERT INTO teachers (
                avatar_url, 
                fullname, 
                birth, 
                education_level, 
                classes, 
                occupation_area, 
                created_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)
        `

        const values = [
            avatar_url, 
            fullname, 
            date(birth).iso, 
            education_level, 
            classes, 
            occupation_area, 
            date(todayDate).iso
        ]

        db.query(query, values, (err, results) => {
            if (err) 
                throw `Database error! ${err}`

            callback(results.rows[0])
        })
    },

    find(id, callback) {
        const query = 'SELECT * FROM teachers WHERE id = $1'

        db.query(query, [id], (err, results) => {
            if(err) 
                throw `Database Error! ${err}`

            return callback(results.rows[0])
        })
    },

    
    findBy(filter, callback){

        const query = `
            SELECT *
            FROM teachers
            WHERE teachers.fullname ILIKE '%${filter}%'
            OR teachers.occupation_area ILIKE '%${filter}%'
        `

        db.query(query, function (err, results) {
            if(err) throw `Database Error! ${err}` 

            callback(results.rows)
        })
    },

    update(data, callback){
        const { avatar_url, fullname, birth, education_level, classes, occupation_area, id } = data

        const query = `
            UPDATE teachers SET 
                avatar_url = ($1), 
                fullname = ($2), 
                birth = ($3),
                education_level = ($4), 
                classes = ($5), 
                occupation_area = ($6)
            WHERE id = ($7)
            RETURNING id
        `

        const values = [
            avatar_url, 
            fullname, 
            date(birth).iso, 
            education_level, 
            classes,
            occupation_area, 
            id 
        ]

        db.query(query, values, (err, results) => {
            if(err)
                throw `Database error! ${err}`

            callback(results.rows[0])
        })        
    },

    _delete(id, callback){

        const query = 'DELETE FROM teachers WHERE id = $1'

        db.query(query, [id], (err, results) => {
            if(err)
                throw `Database error! ${err}`

            return callback()
        })
    }
}