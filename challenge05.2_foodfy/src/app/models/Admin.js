const db = require('../../config/db')


module.exports = {

    create(data, callback){

        const { avatar_url, name, created_at} = data

        const query = `
            INSERT INTO chefs (
                name,                
                avatar_url, 
                created_at
            ) VALUES ( $1, $2, $3)
        `
        
        const values = [
            name,
            avatar_url, 
            created_at
        ]

        db.query(query, values, (err, results) => {
            if(err)
                throw `Database error! ${err}`
            
            callback()
        })

    },

    update(data, callback){

        const { avatar_url, name, created_at, id } = data

        const query = `
            UPDATE chefs SET 
                name = ($1), 
                avatar_url = ($2),                
                created_at = ($3)
            WHERE id = ($4)
            RETURNING id
        `     

        const values = [
            name, 
            avatar_url,
            created_at, 
            id
        ]
        
        console.log("query "+query+"values"+values)
        db.query(query, values, (err, results) => {
            if(err)
                throw `Database error! ${err}`

            callback(results.rows[0])
        })
    },
}

