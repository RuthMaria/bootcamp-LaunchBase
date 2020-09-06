const express = require('express')
const routes = express.Router()
const admin = require("./controllers/admin")
const user = require("./controllers/user")

routes.get('/', user.home)
routes.get('/about', user.about)
routes.get('/recipes', user.index)
routes.get('/recipes/:index', user.show)

routes.get("/admin/recipes", admin.index); 
routes.get("/admin/recipes/create", admin.create); 
routes.get("/admin/recipes/:id", admin.show); 
routes.get("/admin/recipes/:id/edit", admin.edit); // Mostrar formulário de edição de receita

routes.post("/admin/recipes", admin.post); // Cadastrar nova receita
routes.put("/admin/recipes", admin.put); // Editar uma receita
routes.delete("/admin/recipes", admin.delete); // Deletar uma receita

module.exports = routes
