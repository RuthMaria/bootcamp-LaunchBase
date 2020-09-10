const db = require('../../config/db')

module.exports = {
    
    paginate(params, callback){

        const { limit, offset, filter } = params

        let filterQuery = ""

        if( filter ) {
            filterQuery = `WHERE recipes.title ILIKE '%${filter}%'`            
        } 
        
        const query = `SELECT recipes.*, chefs.name AS author
                       FROM recipes
                       LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
                       ${filterQuery}
                       LIMIT $1 OFFSET $2
                       `
        db.query(query, [limit, offset], (err, results) => {
            if(err)
                throw `Database error! ${err}`
            
                callback(results.rows)
        })
    },
    
    foundRecipe(id, callback){

        const query = `SELECT * FROM recipes WHERE recipes.id = $1`

        db.query(query, [id], (err,results) => {
            if(err)
                throw `Database error! ${err}`
            
                callback(results.rows[0])
        })
    },

    foundChefs(callback){

        const query = `SELECT chefs.*, COUNT(recipes) AS total_recipes
                       FROM chefs
                       LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
                       GROUP BY chefs.id
                       ORDER BY chefs.name`

        db.query(query, (err, results) => {
            if(err)
                throw `Database error! ${err}`
            
            callback(results.rows)
        })
    },
}