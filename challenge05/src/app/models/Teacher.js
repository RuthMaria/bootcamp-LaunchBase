const { date } = require("../../lib/utils")
const db = require('../../config/db')
const { find } = require("../../../../gymManager_postgres/src/app/models/Instructor")

module.exports = {

    all(callback) {

        const query = 'SELECT * FROM teachers ORDER BY fullname ASC'

        db.query(query, (err, results) => {
            if (err) throw `Database error! ${err}`

            return callback(results.rows)
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
            if (err) {
                throw `Database error! ${err}`
            }

            callback()
        })
    },

    find(id, callback){

        const query = 'SELECT * FROM teachers WHERE id = $1'

        db.query(query, [id], (err, results) => {
            if(err) throw `Database error! ${err}`

            return callback(results.rows[0])
        })
    },

    update(data,callback){
        const { avatar_url, fullname, birth, education_level, classes, occupation_area } = data

        const query = `
            UPDATE 
        `
    },

    _delete(){}
}