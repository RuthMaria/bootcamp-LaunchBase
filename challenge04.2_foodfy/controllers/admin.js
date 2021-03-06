const fs = require("fs")
const data = require("../data.json")

exports.index = (req, res) => {
    return res.render('admin/index', { data })
}

exports.create = (req, res) => {
    return res.render('admin/create')
}

exports.show = (req, res) => {
    const id = req.params.id;

    const recipe = data.recipes[id]

    return res.render('admin/recipe_description', { recipe, id })
}

exports.edit = (req, res) => {
    const id = req.params.id;

    const recipe = data.recipes[id]

    return res.render('admin/edit', { recipe, id })
}

exports.post = (req, res) => {

    const keys = Object.keys(req.body)

    for (let key of keys) {
        if (req.body[key] == "") {
            return res.send("Please, fill all fields!")
        }
    }

    let { image, title, author, ingredients, preparation, information } = req.body 

    data.recipes.push( {
        image, 
        title, 
        author, 
        ingredients, 
        preparation, 
        information 
    })

    fs.writeFile("challenge04.2_foodfy/data.json", JSON.stringify(data, null, 2), err => {
        if (err) {
            return res.send("Write file error!")
        }

        return res.redirect("/admin/recipes")
    })
}

exports.put = (req, res) => {    

    const keys = Object.keys(req.body)

    for (let key of keys) {
        if (req.body[key] == "") {
            return res.send("Please, fill all fields!")
        }
    }

    let { image, title, author, ingredients, preparation, information, id } = req.body 

    /* se tiver espaço vazio o trim() retorna false, com o valor false o filter() remove do array o espaço vazio*/
    const filteredIngredientsWithoutSpaces = ingredients.filter( ingredient => ingredient.trim()) 
    const filteredPreparationWithoutSpaces = preparation.filter( preparation => preparation.trim())

    data.recipes[id] = {
        image, 
        title, 
        author, 
        ingredients: filteredIngredientsWithoutSpaces, 
        preparation: filteredPreparationWithoutSpaces, 
        information 
    }

    fs.writeFile("challenge04.2_foodfy/data.json", JSON.stringify(data, null, 2), err => {
        if (err) {
            return res.send("Write file error!")
        }

        return res.redirect("/admin/recipes")
    })
}

exports.delete = (req, res) => {

    const { id } = req.body
    
    const  removedRecipe = data.recipes.splice(id, 1) 
    
    fs.writeFile("challenge04.2_foodfy/data.json", JSON.stringify(data, null, 2), err => {
        if (err) {
            return res.send(`Write file error! ${err}`)
        }
        return res.redirect("/admin/recipes")
    })
}