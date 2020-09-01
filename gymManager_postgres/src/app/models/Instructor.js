const db = require('../../config/db')
const { date } = require("../../lib/util")

module.exports = {

    all(callback) {
        const query = `
            SELECT instructors.*, count(members) AS total_students
            FROM instructors
            LEFT JOIN members ON (instructors.id = members.instructor_id)
            GROUP BY instructors.id
            ORDER BY total_students DESC
        `
        db.query(query, function (err, results) {
            if(err) throw `Database Error! ${err}` // captura o erro e para a aplicação

            callback(results.rows)
        })
    },

    create(data, callback) {
        const { name, avatar_url, gender, services, birth } = data
        const todayDate = Date.now()

        const query = `
            INSERT INTO instructors (
                name,
                avatar_url,
                gender,
                services,
                birth,
                created_at
            ) VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id
        `

        const values = [
            name,
            avatar_url,
            gender,
            services,
            date(birth).iso,
            date(todayDate).iso
        ]

        db.query(query, values, function(err, results){       
            if(err) throw `Database Error! ${err}`
            
            callback(results.rows[0])
        })
    },

    find(id, callback) {

        db.query('SELECT * FROM instructors WHERE id = $1', [id], function (err, results) {
            if(err) throw `Database Error! ${err}`

            return callback(results.rows[0])
        })
    },

    findBy(filter, callback){

        const query = `
            SELECT instructors.*, count(members) AS total_students
            FROM instructors
            LEFT JOIN members ON (instructors.id = members.instructor_id)
            WHERE instructors.name ILIKE '%${filter}%'
            OR instructors.services ILIKE '%${filter}%'
            GROUP BY instructors.id
            ORDER BY total_students DESC
        `

        db.query(query, function (err, results) {
            if(err) throw `Database Error! ${err}` 

            callback(results.rows)
        })
    },

    update(data, callback) {
        const { avatar_url, name, birth, gender, services, id } = data

        const query = `
            UPDATE instructors SET 
                avatar_url = ($1),
                name = ($2),
                birth = ($3),
                gender = ($4),
                services = ($5)
            WHERE id = ($6)
            `

        const values = [
            avatar_url, 
            name, 
            date(birth).iso, 
            gender, 
            services,
            id 
        ]

        db.query(query, values,function (err, results) {
            if(err) throw `Database Error! ${err}`

            callback()
        })
    },

    delete(id, callback) {

        db.query(`DELETE FROM instructors WHERE id = $1`, [id], function (err, results) {
            if(err) throw `Database Error! ${err}`

            return callback()
        })
    },

    paginate(params){

        const { filter, limit, offset, callback } = params

        let query = ""
        let filterQuery = ""
        let totalQuery = `( SELECT COUNT(*) FROM instructors ) AS total`

        if( filter ) {

            filterQuery = `
                WHERE instructors.name ILIKE '%${filter}%'
                OR instructors.services ILIKE '%${filter}%'
            `

            totalQuery = `( 
                SELECT COUNT(*) FROM instructors
                ${filterQuery}
            ) AS total`
        }
        
        query = `SELECT instructors.*, ${totalQuery}, COUNT(members) AS total_students 
                 FROM instructors
                 LEFT JOIN members ON (instructors.id = members.instructor_id)
                 ${filterQuery} 
                 GROUP BY instructors.id LIMIT $1 OFFSET $2`

        db.query(query, [limit, offset], function(err, results) {
            if(err)
                throw `Database error! ${err}`

            callback(results.rows)
        })
    }
}