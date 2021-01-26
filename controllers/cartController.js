const db = require('../database/models');


const controller = {

    // Carrito de compra
    productCart: (req, res) => {

        products = db.products.findAll(
            {
            where: { status: "Habilitado" },
            include: [{ association: "product_image" }]
            }
          )
      
          categories = db.categories.findAll()
      
              Promise.all([products,categories])
                  .then(function ([products, categories]) {
              res.render('cart/productCart', {categories:categories, products:products});
                  })
                  .catch(error => {
                      res.render('error', { error: error });
                  })
       
    }

};

module.exports = controller;