/* const fs = require('fs'); */
/* const path = require('path'); */
const moment = require('moment');
const { Console } = require('console');
const { validationResult } = require('express-validator');
const db = require('../../database/models');
const { Op, json } = require("sequelize");

const controller = {

	// Listado de todos los productos
	productList: async (req, res) => {
		let category = []

		category = await db.categories.findAll(
			{ include: [{ association: 'products', where: { status: 'Habilitado' }, include: ['product_image'] }] })

            let respuesta = {
                meta : {
                    status: 200,
                    total: category.length
                },
                category: category
            }    

            res.json (respuesta)
/* 		res.render("products/productList", { category: category }) */
    },
    
    // Alta de producto
	store: (req, res, next) => {

		let errors = validationResult(req);

		if (errors.isEmpty()) {

			db.products.create({
				name: req.body.name,
				description: req.body.description,
				category_id: req.body.category,
				supplier_id: req.body.supplier,
				created_at: moment(new Date()).format('YYYY-MM-DD'),
				expiration_days: req.body.expiration_days,
				share: req.body.share,
				price: req.body.price,
				discount: req.body.discount,
				life_date_from: req.body.life_date_from,
				life_date_to: req.body.life_date_to,
				stock: req.body.stock,
				status: req.body.status,
				user_id: req.session.user.id
			})
				.then(product => {
					for (let i = 0; i < req.files.length; i++) {
						db.product_image.create({
							product_id: product.id,
							image: req.files[i].filename,
							number: i
						})
                    }
                    res.status(201).json({})
/* 					res.redirect('/productos/' + product.id + '/detalle'); */
					// res.render("products/productCreateForm", { categories: categories, suppliers: suppliers, product: {}, errors: {}, store_success: '¡Tu producto fue dado de alta exitosamente!' })
				})
				.catch(error => {
/* 					return res.render('products/productCreateForm', { categories: categories, suppliers: suppliers, product: req.body, errors: errors }) */
                    res.json(error)
				})
		}
	}

}

module.exports = controller;