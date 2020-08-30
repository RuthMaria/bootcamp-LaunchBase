const db = require('../../config/db')
const { date } = require("../../lib/util")
const { query } = require('../../config/db')

module.exports = {

    all(callback) {
        
        db.query('SELECT * FROM members ORDER BY name ASC', function (err, results) {
            if(err) throw `Database Error! ${err}` // captura o erro e para a aplicação

            callback(results.rows)
        })
    },

    create(data, callback) {
        const { name, avatar_url, gender, email, birth, blood, weight, height, instructor } = data
        const todayDate = Date.now()

        const query = `
            INSERT INTO members (
                name,
                avatar_url,
                gender,
                email,
                birth,
                blood,
                weight,
                height,
                instructor_id
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING id
        `

        const values = [
            name,
            avatar_url,
            gender,
            email,
            date(birth).iso,
            blood,
            weight,
            height,
            instructor
        ]

        db.query(query, values, function(err, results){       
            if(err) throw `Database Error! ${err}`
            
            callback(results.rows[0])
        })
    },

    find(id, callback) {

        const query = `SELECT members.*, instructors.name AS instructor_name 
                       FROM members 
                       LEFT JOIN instructors ON (members.instructor_id = instructors.id)
                       WHERE members.id = $1`

        db.query(query, [id], function (err, results) {
            if(err) throw `Database Error! ${err}`

            return callback(results.rows[0])
        })
    },

    update(data, callback) {
        const { name, avatar_url, gender, email, birth, blood, weight, height, id, instructor } = data

        const query = `
            UPDATE members SET 
                avatar_url = ($1),
                name = ($2),
                birth = ($3),
                gender = ($4),
                email = ($5),
                blood = ($6),
                weight = ($7),
                height = ($8),
                instructor_id = ($9)
            WHERE id = ($10)
            `

        const values = [
            avatar_url, 
            name, 
            date(birth).iso, 
            gender, 
            email,
            blood,
            weight,
            height,
            instructor,
            id
        ]

        db.query(query, values, function (err, results) {
            if(err) throw `Database Error! ${err}`

            callback()
        })
    },

    delete(id, callback) {

        db.query(`DELETE FROM members WHERE id = $1`, [id], function (err, results) {
            if(err) throw `Database Error! ${err}`

            return callback()
        })
    },

    instructorsSelectOptions(callback) {
        
        db.query(`SELECT name, id FROM instructors`, function(err, results) {
            if(err) throw `Database Error! ${err}`

            return callback(results.rows)
        })
    }
}