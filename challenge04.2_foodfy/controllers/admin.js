const fs = require("fs")
const data = require("../data.json")

exports.index = (req, res) => {
    return res.render('admin/index', { data })
}

exports.create = (req, res) => {
    
}

exports.show = (req, res) => {
    const recipeIndex = req.params.id;

    const recipe = data.recipes[recipeIndex]

    return res.render('admin/recipe_description', { recipe })
}

exports.edit = (req, res) => {
    
}

exports.post = (req, res) => {
    
}

exports.put = (req, res) => {
    
}

exports.delete = (req, res) => {
    
}