//const user = require('../models/user')

module.exports = {

    home( req, res ) {
         return res.render('user/home')
    },

    about( req, res ) {
        return res.render('user/about')
    },

    index ( req, res ) {
        return res.render('user/recipes')
    },

    show ( req, res ){

    }
}