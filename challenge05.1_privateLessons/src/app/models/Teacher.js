const { date } = require("../../lib/utils")
const db = require('../../config/db')

module.exports = {

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
    },

    paginate(params){

        const { limit, offset, filter, callback } = params

        let filterQuery = ""

        if( filter ) {
            filterQuery = `WHERE teachers.fullname ILIKE '%${filter}%'
                           OR teachers.occupation_area ILIKE '%${filter}%'`            
        } 

        let subQuery = `(SELECT COUNT(*) FROM teachers ${filterQuery}) AS total_teachers`
        
        const query = `SELECT teachers.*, ${subQuery}
                       FROM teachers
                       ${filterQuery}                        
                       ORDER BY teachers.fullname ASC
                       LIMIT $1 OFFSET $2
                       `
        db.query(query, [limit, offset], (err, results) => {
            if(err)
                throw `Database error! ${err}`
            
                callback(results.rows)
        })
    }
}