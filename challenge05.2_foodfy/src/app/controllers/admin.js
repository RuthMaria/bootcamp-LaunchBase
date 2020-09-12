const { checkEmptyFields, date } = require("../../lib/utils")
const { paginate, foundRecipe, foundChefs, searchChef, searchRecipes, searchChefAndCountRecipes } = require('../models/User')
const { create } = require('../models/admin')

module.exports = {

    index(req, res){
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
            
            return res.render('admin/index', { recipes, pagination, filter})           
        })
    },

    create (req, res){
        return res.render('admin/create')
    },


    show (req, res){

        foundRecipe(req.params.id, recipe => {

            if( !recipe )
                return res.send('Recipe not found!')

            return res.render('admin/recipe_description',  { recipe })
        })
    },

    edit(req, res){
   
    },

    post(req, res){

    if(checkEmptyFields(req.body))
        return res.send("Please, fill all fields!")
    },

    put(req, res){    

        if(checkEmptyFields(req.body))
            return res.send("Please, fill all fields!")
    },

    delete(req, res){   

    },

    allChefs( req, res) {

        foundChefs( chefs => {
            return res.render('admin/allChefs', { chefs })
        })
    },

    detailsChef( req, res) {

       searchChefAndCountRecipes(req.params.id, chef => {

            if( !chef ){
                searchChef(req.params.id, chef => {
                    if( !chef ){
                        return res.send('Chef not found!')
                    }

                    return res.render('admin/chef_description',  { chef })
                })
            } else {
                searchRecipes(req.params.id, recipes => {
                    return res.render('admin/chef_description',  { chef, recipes })
                })
            }           
        })
    },

    createChef( req, res ) {
        return res.render('admin/createChef')
    },

    post( req, res ) {

        if(checkEmptyFields(req.body))
            return res.send("Please, fill all fields!")

        req.body.created_at = date().iso

        console.log(req.body)

        create(req.body, () => {
            return res.redirect('/admin/chefs')
        })
        
    },
}