const db = require('../../config/db')
const { date } = require("../../lib/util")

module.exports = {

    all(callback) {
        
        db.query('SELECT * FROM members ORDER BY name ASC', function (err, results) {
            if(err) throw `Database Error! ${err}` // captura o erro e para a aplicação

            callback(results.rows)
        })
    },

    create(data, callback) {
        const { name, avatar_url, gender, email, birth, blood, weight, height } = data
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
                height
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
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
            height
        ]

        db.query(query, values, function(err, results){       
            if(err) throw `Database Error! ${err}`
            
            callback(results.rows[0])
        })
    },

    find(id, callback) {

        db.query('SELECT * FROM members WHERE id = $1', [id], function (err, results) {
            if(err) throw `Database Error! ${err}`

            return callback(results.rows[0])
        })
    },

    update(data, callback) {
        const { name, avatar_url, gender, email, birth, blood, weight, height, id } = data

        const query = `
            UPDATE members SET 
                avatar_url = ($1),
                name = ($2),
                birth = ($3),
                gender = ($4),
                email = ($5),
                blood = ($6),
                weight = ($7),
                height = ($8)
            WHERE id = ($9)
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
}