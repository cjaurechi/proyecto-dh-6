const fs = require('fs');
const path = require('path');
const moment = require('moment');
const { Console } = require('console');
const { validationResult } = require('express-validator');
const db = require('../database/models');
const { Op } = require("sequelize");

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
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
var users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));


const controller = {

	// Detalle de producto
	productDetail: (req, res) => {

		let product = db.products.findByPk(req.params.id, {
			include: [{ association: "categories" }]
		})

		let product_images = db.product_image.findAll({
			where: { product_id: req.params.id }
		});

		let product_comments = db.comments.findAll({
			where: { product_id: req.params.id }
		});

		Promise.all([product, product_images, product_comments])
			.then(function ([product, product_images, product_comments]) {

				let cantidad_comentarios = 0
				let suma_calificacion = 0

				for (let i = 0; i < product_comments.length; i++) {
					let user = users.find(function (item) {
						return (product_comments[i].user_id == item.id);
					})
					product_comments[i].user_description = user.first_name
					cantidad_comentarios += 1
					suma_calificacion = suma_calificacion + product_comments[i].calification
				}

				let promedio_calificacion = suma_calificacion / cantidad_comentarios

				if (isNaN(promedio_calificacion)) {
					promedio_calificacion = ""
				}

				res.render("products/productDetail", { product: product, product_images: product_images, product_comments: product_comments, cantidad_comentarios: cantidad_comentarios, promedio_calificacion: promedio_calificacion });

			})
			.catch(error => {
				res.render('error', { error: error });
			})

	},

	// Detalle de producto
	productList: (req, res) => {

		let products_category = []
		let category = []

		if (req.params.id !== undefined) {

			products_category = db.products.findAll(
				{
					where: {
						category_id: req.params.id,
						status: "Habilitado"
					},
					include: [{ association: "product_image" }]
				}
			);

			category = db.categories.findAll(
				{
					where: { id: req.params.id }
				}
			)

		} else {

			products_category = db.products.findAll(
				{
					where: { status: "Habilitado" },
					include: [{ association: "product_image" }]
				}
			)

			category = db.categories.findAll()

		}

		Promise.all([products_category, category])
			.then(function ([products_category, category]) {
				console.log(products_category, category)
				res.render("products/productList", { products_category: products_category, category: category })
			})
			.catch(error => {
				res.render('error', { error: error });
			})

	},

	// Detalle con busqueda de producto
	productSearch: (req, res) => {

		let products_category = []
		let category = []
		console.log(req.query.keywords, 1)
		if (req.params.id !== undefined) {
			if (req.query.keywords !== "") {
				console.log(req.query.keywords, 2)
				let key_search = "%" + req.query.keywords + "%"
				products_category = db.products.findAll(
					{
						where: {
							category_id: req.params.id,
							status: "Habilitado",
							name: { [Op.like]: key_search }
						}
					},
					{
						include: [{ association: "product_image" }]
					}
				);
			} else {
				console.log(req.query.keywords, 3)
				products_category = db.products.findAll(
					{
						where: {
							category_id: req.params.id,
							status: "Habilitado"
						}
					},
					{
						include: [{ association: "product_image" }]
					}
				);
			}

			category = db.categories.findByPk(req.params.id)

		} else {
			console.log(req.query.keywords, 4)
			let key_search = "%" + req.query.keywords + "%"
			console.log(key_search, 5)
			products_category = db.products.findAll(
				{
					where: {
						status: "Habilitado",
						name: { [Op.like]: key_search }
					},
					include: [{ association: "product_image" }]
				}
			)

			category = db.categories.findAll()

		}

		Promise.all([products_category, category])
			.then(function ([products_category, category]) {
				res.render("products/productList", { products_category: products_category, category: category })
			})
			.catch(error => {
				res.render('error', { error: error });
			})

	},

	// Listado de productos para edicion
	productListForm: (req, res) => {


		let products_category = []
		let category = []

		if (req.params.id !== undefined) {

			products_category = db.products.findAll({
				where: {
					category_id: req.params.id,
					status: "Habilitado"
				}
			});

			category = db.categories.findByPk(req.params.id)

		} else {

			products_category = db.products.findAll({
				where: { status: "Habilitado" }
			})

			category = db.categories.findAll()

		}

		Promise.all([products_category, category])
			.then(function ([products_category, category]) {
				res.render("products/productListForm", { products_category: products_category, category: category, update_success: undefined })
			})
			.catch(error => {
				res.render('error', { error: error });
			})

	},

	// Listado de productos con busqueda para edicion
	productSearchForm: (req, res) => {

		let products_category = []
		let category = []

		if (req.params.id !== undefined) {
			if (req.query.keywords !== "" && req.query.keywords !== undefined) {
				products_category = products.filter(function (item) {
					return (req.params.id == item.category & item.status == "Habilitado" && item.name.includes(req.query.keywords))
				})
			}
			else {
				products_category = products.filter(function (item) {
					return (req.params.id == item.category & item.status == "Habilitado")
				})
			}

			category = categories.filter(function (item) {
				return (req.params.id == item.id)
			})

		} else {
			if (req.query.keywords !== "" && req.query.keywords !== undefined) {
				products_category = products.filter(function (item) {
					return (item.status == "Habilitado" && item.name.includes(req.query.keywords))
				})
			}
			else {
				products_category = products.filter(function (item) {
					return (item.status == "Habilitado")
				})
			}
			category = categories
		}

		res.render("products/productAdmin", { products_category: products_category, category: category, update_success: undefined })

	},

	// Formulario de creacion
	create: (req, res) => {

		let producto_actualizado = undefined

		suppliers = suppliers.filter(function (item) {
			return (item.status == 'Habilitado')
		})

		res.render("products/productCreateForm", { producto_actualizado: producto_actualizado, categories: categories, suppliers: suppliers, product: {}, errors: {} });
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
					res.redirect('/productos/' + product.id + '/detalle');
					// res.render("products/productCreateForm", { categories: categories, suppliers: suppliers, product: {}, errors: {}, store_success: '¡Tu producto fue dado de alta exitosamente!' })
				}).catch(error => {
					return res.render('products/productCreateForm', { categories: categories, suppliers: suppliers, product: req.body, errors: errors })
				})
		}
	},

	// Formulario de modificacion
	edit: (req, res) => {
		console.log(req.params.id)
		let product = db.products.findByPk(req.params.id)
		let suppliers = db.suppliers.findAll({ where: { status: "habilitado" } })

		Promise.all([product, suppliers])
			.then(function ([product, suppliers]) {
				res.render("products/productEditForm", { product: product, categories: categories, suppliers: suppliers, errors: {} })
			})
			.catch(error => {
				res.render('error', { error: error });
			})
	},

	// Modificacion de producto
	update: (req, res, next) => {

		let errors = validationResult(req);
		console.log(errors)
		if (errors.isEmpty()) {
			let product = db.products.findByPk(req.params.id)
			db.products.update({
				name: req.body.name,
				description: req.body.description,
				category_id: req.body.category,
				supplier_id: req.body.supplier,
				expiration_days: req.body.expiration_days,
				share: req.body.share,
				price: req.body.price,
				discount: req.body.discount,
				life_date_from: req.body.life_date_from,
				life_date_to: req.body.life_date_to,
				stock: req.body.stock,
				status: req.body.status,

			}, { where: { id: req.params.id } })
				.then(product => {
					res.redirect('/productos/' + req.params.id + '/detalle');
					// res.render("products/productEditForm", { product: product, products_category: products_category, category: category, update_success: '¡Tu producto fue actualizado exitosamente!' })
				})
				.catch(error => {
					return res.render("products/productEditForm", { product: product, categories: categories, suppliers: suppliers, errors: errors })
				})
		}
	},

	delete: (req, res) => {

		// Soft delete: Solamente movemos el status a deshabilitado pero sigue vivo en la BD
		db.products.update({
			status: "Deshabilitado",
		}, { where: { id: req.params.id } })
			.then(() => res.redirect("/productos"))
			.catch(error => {
				console.log(error)
				res.render('error', { error: error })
			})

		// Hard delete: Este borra el producto de la BD
		// db.products.destroy({
		// 	where: {
		// 		id: req.params.id
		// 	}
		// })
		// 	.then(() => res.render("products/productListForm", { products_category: products_category, category: category, update_success: '¡Tu producto fue borrado exitosamente!' }))
		// 	.catch(error => {
		// 		console.log(error)
		// 		res.render('error', { error: error })
		// 	})
	}
};

module.exports = controller;