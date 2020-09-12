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

    }
}

