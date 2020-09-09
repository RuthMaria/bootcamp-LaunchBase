const db = require('../../config/db')

module.exports = {
    
    paginate(params, callback){

        const { limit, offset, filter } = params

        let filterQuery = ""

        if( filter ) {
            filterQuery = `WHERE recipes.title ILIKE '%${filter}%'`            
        } 

        let totalRecipes = `(SELECT COUNT(*) FROM recipes ${filterQuery}) AS total_recipes`
        
        const query = `SELECT recipes.*, ${totalRecipes}
                       FROM recipes
                       ${filterQuery}
                       LIMIT $1 OFFSET $2
                       `
        db.query(query, [limit, offset], (err, results) => {
            if(err)
                throw `Database error! ${err}`
            
                callback(results.rows)
        })
    },

    foundChef(callback){

        let query = `SELECT chefs.name AS author
                    FROM chefs 
                    LEFT JOIN recipes ON (chefs.id = recipes.chef_id)`
                    
        db.query(query, (err,results) => {
            if(err)
                throw `Database error! ${err}`
            
                callback(results.rows)
        })
    },
    
    find(id, callback){

        const query = `SELECT * FROM recipes WHERE recipes.id = $1`

        db.query(query, [id], (err,results) => {
            if(err)
                throw `Database error! ${err}`
            
                callback(results.rows[0])
        })
    },
}