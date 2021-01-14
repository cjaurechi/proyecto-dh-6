const fs = require('fs');
const path = require('path');
const moment = require('moment');
const { Console } = require('console');
const { validationResult } = require('express-validator');
const db = require('../../database/models');
const { Op, json } = require("sequelize");

/* const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
var products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const productsImagesFilePath = path.join(__dirname, '../data/productsImagesDataBase.json');
var products_images = JSON.parse(fs.readFileSync(productsImagesFilePath, 'utf-8'));

const categoriesFilePath = path.join(__dirname, '../data/categoriesDataBase.json');
var categories = JSON.parse(fs.readFileSync(categoriesFilePath, 'utf-8'));

const suppliersFilePath = path.join(__dirname, '../data/suppliersDataBase.json');
var suppliers = JSON.parse(fs.readFileSync(suppliersFilePath, 'utf-8'));

const commentsFilePath = path.join(__dirname, '../data/commentsDataBase.json');
var comments = JSON.parse(fs.readFileSync(commentsFilePath, 'utf-8'));

const usersFilePath = path.join(__dirname, '../data/users.json');
var users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8')); */


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
		console.log(req,1)
		let errors = validationResult(req);
/* 		console.log(req.files.length,2) */
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
/* 					console.log(req.files,3) */
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
				}).catch(error => {
/* 					return res.render('products/productCreateForm', { categories: categories, suppliers: suppliers, product: req.body, errors: errors }) */
                    res.json(error)
				})
		}
	}

}

module.exports = controller;