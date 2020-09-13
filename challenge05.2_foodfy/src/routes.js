const express = require('express')
const routes = express.Router()
const admin = require("./app/controllers/admin")
const user = require("./app/controllers/user")

routes.get('/', user.home)
routes.get('/about', user.about)
routes.get('/recipes', user.allRecipes)
routes.get('/recipes/search', user.searchRecipes)
routes.get('/chefs', user.allChefs)
routes.get('/chefs/:id', user.detailsChef)
routes.get('/recipes/:id', user.detailsRecipe)

routes.get("/admin/recipes", admin.allRecipes); 
routes.get("/admin/recipes/create", admin.createRecipe); 
routes.get("/admin/recipes/:id", admin.detailsRecipe); 
routes.get("/admin/recipes/:id/edit", admin.editRecipe); 
routes.post("/admin/recipes", admin.postRecipe); 
routes.put("/admin/recipes", admin.putRecipe); 
routes.delete("/admin/recipes", admin.deleteRecipe); 

routes.get('/admin/chefs', admin.allChefs)
routes.get('/admin/chefs/create', admin.createChef)
routes.get('/admin/chefs/:id', admin.detailsChef)
routes.get('/admin/chefs/:id/edit', admin.editChef)
routes.post('/admin/chefs', admin.postChef)
routes.put('/admin/chefs', admin.putChef)
routes.delete('/admin/chefs', admin.deleteChef)

module.exports = routes
