const db = require('../database/models');

const controller = {

    getCart: (req, res) => {

        db.items.findAll({
                include: [{
                    association: 'products',
                    where: {
                        status: 'Habilitado'
                    },
                    include: [{
                        association: 'product_image'
                    }]
                }],
                where: {
                    user_id: req.session.user.id,
                    state: 1,
                }
            })
            .then(items => {

                let sale_prices = items.map(function (item) {
                    return parseInt(item.sale_price);
                })

                const reducer = (accumulator, currentValue) => accumulator + currentValue;

                res.render('cart/productCart', {
                    items: items,
                    total_price: sale_prices.reduce(reducer)
                });
            })
            .catch(err => {
                res.render(err.message)
            })
    },

    // Carrito de compra
    productCart: (req, res) => {

        products = db.products.findAll({
            where: {
                status: "Habilitado"
            },
            include: [{
                association: "product_image"
            }]
        })

        categories = db.categories.findAll()

        Promise.all([products, categories])
            .then(function ([products, categories]) {
                res.render('cart/productCart', {
                    categories: categories,
                    products: products
                });
            })
            .catch(error => {
                res.render('error', {
                    error: error
                });
            })

    }

};

module.exports = controller;