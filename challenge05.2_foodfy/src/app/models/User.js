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

        const query = `SELECT recipes.*, chefs.name AS author 
                       FROM recipes 
                       JOIN chefs ON (chefs.id = recipes.chef_id)  
                       WHERE recipes.id = $1`

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

    searchChef(id, callback) {

        const query = `SELECT chefs.*, COUNT(recipes) AS total_recipes
                       FROM chefs
                       JOIN recipes ON (chefs.id = recipes.chef_id)                       
                       WHERE chefs.id = $1
                       GROUP BY chefs.id`

        db.query(query, [id], (err,results) => {
            if(err)
                throw `Database error! ${err}`
            
                callback(results.rows[0])
        })
    },

    searchRecipes(id, callback) {

        const query = `SELECT recipes.*
                       FROM recipes
                       JOIN chefs ON (chefs.id = recipes.chef_id)                       
                       WHERE chefs.id = $1`

        db.query(query, [id], (err,results) => {
            if(err)
                throw `Database error! ${err}`
            
                callback(results.rows)
        })

    }
}