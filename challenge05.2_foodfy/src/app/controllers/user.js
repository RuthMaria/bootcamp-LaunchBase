const { allRecipesWithLimit, allRecipesAndChef, foundRecipe, foundChefs, searchChef, searchChefAndCountRecipes, searchRecipes } = require('../models/User')

module.exports = {

    
    home ( req, res ) {

        let { filter, page, limit } = req.query

        page = page || 1
        limit = limit || 3
        let offset = limit * (page - 1)

        const params = {
            limit,
            offset,
            filter
        }

        allRecipesWithLimit(params,  recipes => {
                
            let total

            if(recipes != null && recipes.length != 0)
                total = Math.ceil(recipes[0].totalrecipes / limit)

            const pagination = {
                totalPages: total,
                page
            }
            return res.render('user/home', { recipes, filter})            
        })
    },
    
    about( req, res ) {
        return res.render('user/about')
    },

    allRecipes( req, res ) {

        const {filter} = req.query
        
        allRecipesAndChef(filter, recipes => {            
            return res.render('user/recipes', { recipes, filter})           
        })
    },

    searchRecipes( req, res) {
        const {filter} = req.query
        
        allRecipesAndChef(filter, recipes => {            
            return res.render('user/searchRecipes', { recipes, filter})           
        })        
    },

    allChefs( req, res) {

        foundChefs( chefs => {
            return res.render('user/allChefs', { chefs })
        })
    },

    detailsChef( req, res) {

        searchChefAndCountRecipes(req.params.id, chef => {

            if( !chef ){
                searchChef(req.params.id, chef => {
                    if( !chef ){
                        return res.send('Chef not found!')
                    }

                    return res.render('user/chef_description',  { chef })
                })
            } else {
                searchRecipes(req.params.id, recipes => {
                    return res.render('user/chef_description',  { chef, recipes })
                })
            }           
        })
    },   

    detailsRecipe ( req, res ){

        foundRecipe(req.params.id, recipe => {

            if( !recipe )
                return res.send('Recipe not found!')

            return res.render('user/recipe_description',  { recipe })
        })
    },
}