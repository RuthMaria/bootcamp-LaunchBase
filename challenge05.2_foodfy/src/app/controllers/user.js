const { paginate, foundChef, find } = require('../models/User')
const { ArraysRecipes } = require("../../lib/utils")

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

        paginate(params,  _recipes => {
                
            let total

            if(_recipes != null && _recipes.length != 0)
                total = Math.ceil(_recipes[0].totalrecipes / limit)

            const pagination = {
                totalPages: total,
                page
            }
            
            foundChef(author => {
                
                const recipes = ArraysRecipes(_recipes, author)

                //console.log(recipes)

                return res.render('user/home', { recipes, pagination, filter})
            })           
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

        paginate(params,  _recipes => {
                
            let total

            if(_recipes != null && _recipes.length != 0)
                total = Math.ceil(_recipes[0].totalrecipes / limit)

            const pagination = {
                totalPages: total,
                page
            }
            
            foundChef(author => {
                
                const recipes = ArraysRecipes(_recipes, author)

                return res.render('user/recipes', { recipes, pagination, filter})
            })           
        })
    },

    show ( req, res ){

        find(req.params.id, recipe => {

            if( !recipe )
                return res.send('Recipe not found!')

            return res.render('user/recipe_description',  { recipe })
        })
    }
}