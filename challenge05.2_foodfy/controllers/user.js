const fs = require("fs")
const data = require("../data.json")

module.exports = {

    home( req, res ) {
         return res.render('user/home', { data })
    },

    about( req, res ) {
        return res.render('user/about')
    },

    index ( req, res ) {
        return res.render('user/recipes', { data })
    },

    show ( req, res ){

        const recipeIndex = req.params.index;

        const recipe = data.recipes[recipeIndex]

        return res.render('user/recipe_description', { recipe })
    }
}