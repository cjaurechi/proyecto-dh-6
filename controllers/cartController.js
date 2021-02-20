const {
    validationResult
} = require('express-validator');
const db = require('../database/models');
const moment = require('moment');

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
                res.render('cart/productCart', {
                    items: items
                });
            })
            .catch(err => {
                res.render(err.message)
            })
    },

    addToCart: (req, res) => {
        const errors = validationResult(req);

        if (errors.isEmpty()) {
            db.items.findOne({
                where: {
                    user_id: req.session.user.id,
                    product_id: req.body.product_id
                }
            }).then(response => {
                if (response != undefined) {
                    let order_quantity = response.quantity;
                    db.items.destroy({
                        where: {
                            user_id: req.session.user.id,
                            product_id: req.body.product_id
                        }
                    }).then(response => {
                        db.products.findByPk(req.body.product_id)
                            .then((product) => {
                                // Saco el valor del producto, teniendo en cuenta el descuento.
                                let price =
                                    Math.ceil(Number(product.discount) > 0 ?
                                    product.price - (product.price * product.discount) / 100 :
                                    product.price);

                                // Creo el Item de compra
                                return db.items.create({
                                    sale_price: price,
                                    quantity: parseInt(req.body.quantity) + parseInt(order_quantity),
                                    subtotal: price * (parseInt(req.body.quantity) + parseInt(order_quantity)),
                                    state: 1,
                                    user_id: req.session.user.id,
                                    seller_id: product.supplier_id,
                                    product_id: product.id,
                                    created_at: moment(new Date()).format('YYYY-MM-DD')
                                });
                            })
                            .then((item) => res.redirect('/carrito'))
                            .catch((err) => console.log(err.message));
                    })
                } else {
                    db.products.findByPk(req.body.product_id)
                        .then((product) => {
                            // Saco el valor del producto, teniendo en cuenta el descuento.
                            let price =
                                Number(product.discount) > 0 ?
                                product.price - (product.price * product.discount) / 100 :
                                product.price;

                            // Creo el Item de compra
                            return db.items.create({
                                sale_price: price,
                                quantity: req.body.quantity,
                                subtotal: price * req.body.quantity,
                                state: 1,
                                user_id: req.session.user.id,
                                seller_id: product.supplier_id,
                                product_id: product.id,
                                created_at: moment(new Date()).format('YYYY-MM-DD')
                            });
                        })
                        .then((item) => res.redirect('/carrito'))
                        .catch((err) => console.log(err.message));
                }
            })


            // Busco el producto que voy a agregar como Item

        } else {
            db.products.findByPk(req.body.product_id)
                .then(product => {
                    return res.render('/productos/' + req.body.product_id + '/detalle', {
                        product,
                        errors: errors.mapped()
                    })
                })
        }
    },

    removeFromCart: (req, res) => {
        db.items.destroy({
                where: {
                    id: req.body.item_id,
                },
                force: true,
            })
            .then((response) => res.redirect('/carrito'))
            .catch((e) => console.log(e));
    }
};

module.exports = controller;