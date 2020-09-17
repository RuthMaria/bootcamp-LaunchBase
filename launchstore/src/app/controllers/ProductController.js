const Category = require('../models/Category')
const Product = require('../models/Product')

module.exports = {

    create ( req, res ){

        Category.all()
        .then(function (results) {

            const categories = results.rows
            return res.render('products/create.njk', { categories })
            
        }).catch(function (err) {
            throw new Error(err)
        })
        
    },

    async post( req, res ){

        const keys = Object.keys(req.body) // cria um array com os names dos inputs    

        for (let key of keys) {
            if (req.body[key] == "") { // equivale a req.body.key
                return res.send('Please, fill all fields')
            }
        }        
        try{
            let results = await Product.create(req.body)
            const productId = results.rows[0].id            

            results = await Category.all()
            const categories = results.rows

            return res.render("products/create.njk", { productId, categories })
            
        } catch (err) {
            console.error(err);
        }
    }
}