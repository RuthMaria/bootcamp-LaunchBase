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
        
        db.query(query, values, (err, results) => {
            if(err)
                throw `Database error! ${err}`

            callback(results.rows[0])
        })
    },

    updateRecipe(data, callback){

        const { chef, image, title, ingredients, preparation, information, created_at, id } = data

        const query = `
            UPDATE recipes SET                
                    chef_id = ($1),
                    image = ($2),
                    title = ($3),
                    ingredients = ($4),
                    preparation = ($5),
                    information = ($6),
                    created_at = ($7)
            WHERE id = ($8)
            RETURNING id
        `     

        const values = [
            chef,
            image,
            title,
            ingredients,
            preparation,
            information,
            created_at, 
            id
        ]
        
        db.query(query, values, (err, results) => {
            if(err)
                throw `Database error! ${err}`

            callback(results.rows[0])
        })
    },

    createRecipe(data, callback){

        const { chef, image, title, ingredients, preparation, information, created_at } = data

        const query = `
                INSERT INTO recipes
                (
                    chef_id,
                    image,
                    title,
                    ingredients,
                    preparation,
                    information,
                    created_at
                ) VALUES ( $1, $2, $3, $4, $5, $6, $7)
        `
        
        const values = [
            chef,
            image,
            title,
            ingredients,
            preparation,
            information,
            created_at
        ]

        db.query(query, values, (err, results) => {
            if(err)
                throw `Database error! ${err}`
            
            callback()
        })

    },

    _delete(id, callback){

        const query = 'DELETE FROM chefs WHERE  id = $1'

        db.query(query, [id], (err, results) => {
            if(err)
                throw `Database error! ${err}`

            callback()
        })
    },

    chefsSelectOptions(callback){

        const query = `SELECT name, id FROM chefs`

        db.query(query, (err, results) => {
            if(err)
                throw `Database error! ${err}`

            callback(results.rows)
        })
    },

    searchRecipe(id, callback) {

        const query = `SELECT recipes.*
                       FROM recipes                                     
                       WHERE recipes.id = $1`

        db.query(query, [id], (err,results) => {
            if(err)
                throw `Database error! ${err}`
            
                callback(results.rows[0])
        })
    },

}

