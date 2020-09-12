const express = require('express')
const routes = express.Router()
const admin = require("./app/controllers/admin")
const user = require("./app/controllers/user")

routes.get('/', user.home)
routes.get('/about', user.about)
routes.get('/recipes', user.index)
routes.get('/recipes/search', user.searchRecipes)
routes.get('/chefs', user.allChefs)
routes.get('/chefs/:id', user.detailsChef)
routes.get('/recipes/:id', user.show)


routes.get("/admin/recipes", admin.index); 
routes.get("/admin/recipes/create", admin.create); 
routes.get("/admin/recipes/:id", admin.show); 
routes.get("/admin/recipes/:id/edit", admin.edit); 

routes.post("/admin/recipes", admin.post); 
routes.put("/admin/recipes", admin.put); // Editar uma receita
routes.delete("/admin/recipes", admin.delete); // Deletar uma receita
routes.get('/admin/chefs', admin.allChefs)
routes.post('/admin/chefs', admin.post)
routes.get('/admin/chefs/create', admin.createChef)
routes.get('/admin/chefs/:id', admin.detailsChef)

module.exports = routes
