const { checkEmptyFields } = require("../../lib/utils")
//const admin = require('../models/admin')

module.exports = {

    index(req, res){
        return res.render('admin/index')
    },

    create (req, res){
        return res.render('admin/create')
    },

    show (req, res){
    
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

    }
}