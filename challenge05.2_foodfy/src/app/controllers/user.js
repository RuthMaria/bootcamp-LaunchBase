const { paginate, foundRecipe, foundChefs, searchChef, searchChefAndCountRecipes, searchRecipes } = require('../models/User')

module.exports = {

    home( req, res ) {

        let { filter, page, limit } = req.query

        page = page || 1
        limit = limit || 6
        let offset = limit * (page - 1)

        const params = {
            limit,
            offset,
            filter
        }

        paginate(params, recipes => {
                
            let total

            if(recipes != null && recipes.length != 0)
                total = Math.ceil(recipes[0].totalrecipes / limit)

            const pagination = {
                totalPages: total,
                page
            }
            
            return res.render('user/home', { recipes, pagination, filter})           
        })
    },

    about( req, res ) {
        return res.render('user/about')
    },

    index ( req, res ) {

        let { filter, page, limit } = req.query

        page = page || 1
        limit = limit || 9
        let offset = limit * (page - 1)

        const params = {
            limit,
            offset,
            filter
        }

        paginate(params,  recipes => {
                
            let total

            if(recipes != null && recipes.length != 0)
                total = Math.ceil(recipes[0].totalrecipes / limit)

            const pagination = {
                totalPages: total,
                page
            }

            return res.render('user/recipes', { recipes, pagination, filter})           
        })
    },

    show ( req, res ){

        foundRecipe(req.params.id, recipe => {

            if( !recipe )
                return res.send('Recipe not found!')

            return res.render('user/recipe_description',  { recipe })
        })
    },

    searchRecipes( req, res) {
        let { filter, page, limit } = req.query

        page = page || 1
        limit = limit || 9
        let offset = limit * (page - 1)

        const params = {
            limit,
            offset,
            filter
        }

        paginate(params,  recipes => {
                
            let total

            if(recipes != null && recipes.length != 0)
                total = Math.ceil(recipes[0].totalrecipes / limit)

            const pagination = {
                totalPages: total,
                page
            }

            return res.render('user/searchRecipes', { recipes, pagination, filter})          
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
    }
}