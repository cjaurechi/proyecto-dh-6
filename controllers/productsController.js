const fs = require('fs');
const path = require('path');
const moment = require('moment');
const { Console } = require('console');

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

const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
var users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const controller = {

    // Detalle de producto
    productDetail: (req, res) => {

		let product = products.find(function(item){
			return (req.params.id == item.id);
		})

		let category = categories.find(function (item) {
			return (product.category == item.id)
		})

		product_images = products_images.filter(function (item) {
			return (req.params.id == item.id)
		})

		product_comments = comments.filter(function (item) {
			return (req.params.id == item.product_id)
		})

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

		res.render("products/productDetail", { product: product, category: category, product_images: product_images, product_comments: product_comments, cantidad_comentarios: cantidad_comentarios, promedio_calificacion: promedio_calificacion });

	},

	// Detalle de producto
	productList: (req, res) => {

		let products_category = []
		let category = []

		if (req.params.id !== undefined) {
			products_category = products.filter(function (item) {
				return (req.params.id == item.category & item.status == "Habilitado")
			})

			category = categories.find(function (item) {
				return (req.params.id == item.id)
			})
		} else {
			products_category = products.filter(function (item) {
				return (item.status == "Habilitado")
			})

			category = categories
		} 

console.log (category.description)

		/* for (let i = 0; i < products_category.length; i++) {
			let product_image = products_images.find(function (item) {
				return (products_category[i].id == item.id && item.number == 0);
			})
			products_category[i].main_image = product_image.image
		} */

		res.render("products/productList", { products_category: products_category, category: category })

	},

	// Formulario de creacion
	create: (req, res) => {

		suppliers = suppliers.filter(function (item) {
			return (item.status == 'Habilitado')
		})

		res.render("products/productCreateForm", { categories: categories, suppliers: suppliers });
	},

	// Alta de producto
	store: (req, res, next) => {

		for (let i = 0; i < req.files.length; i++) {
			var product_image = ""
			if (req.files[i] !== undefined) {
				product_image = req.files[i].filename
			}
			products_images.push({
				id: products[products.length - 1].id + 1,
				image: product_image,
				number: i,
			})
		}

		let archivo = JSON.stringify(products_images);
		fs.writeFileSync(productsImagesFilePath, archivo);

		fecha_actual = new Date()

		var main_image = ""
		if (req.files[0] !== undefined) {
			main_image = req.files[0].filename
		}

		products.push ({
			id : products[products.length-1].id + 1,
			name : req.body.name,
			description : req.body.description,
			category : req.body.category,
			creation_user : req.body.user,
			creation_date : fecha_actual.getDate() + "/" + (fecha_actual.getMonth() +1) + "/" + fecha_actual.getFullYear(),
			expiration_days : req.body.expiration_days,
			share : req.body.share,
			supplier : req.body.supplier,
			price : req.body.price,
			discount : req.body.discount,
			life_date_from : moment(req.body.life_date_from).format('DD/MM/YYYY'),
			life_date_to : moment(req.body.life_date_to).format('DD/MM/YYYY'),
			stock : req.body.stock,
			status : req.body.status,
			main_image : main_image,
		});

		archivo = JSON.stringify(products);
		fs.writeFileSync(productsFilePath, archivo);
		res.redirect("/productos/crear");
	},

	// Formulario de modificacion
	edit: (req, res) => {

		let product = products.find(function (item) {
			return (req.params.id == item.id);
		})

		suppliers = suppliers.filter(function (item) {
			return (item.status == 'Habilitado')
		})

		product_images = products_images.filter(function (item) {
			return (req.params.id == item.id)
		})

		res.render("products/productEditForm", { product: product, categories: categories, suppliers: suppliers, product_images: product_images });
	},

	// Modificacion de producto
	update: (req, res, next) => {

		if (req.files[0] !== undefined) {
			products_images = products_images.filter(function (item) {
				return (item.id != req.params.id)
			})

			for (let i = 0; i < req.files.length; i++) {
				var product_image = ""
				if (req.files[i] !== undefined) {
					product_image = req.files[i].filename
				}
				products_images.push({
					id: req.params.id,
					image: product_image,
					number: i,
				})
			}
		}

		let archivo = JSON.stringify(products_images);
		fs.writeFileSync(productsImagesFilePath, archivo);

		var main_image = ""
		product_image = products_images.find(function(item) {
			return (item.id == req.params.id & item.number == 0)
		})

		main_image = product_image.image	

		products.forEach (function(item) {
			if (item.id == req.params.id) {
				item.name = req.body.name,
				item.description = req.body.description,
				item.category = req.body.category,
				item.expiration_days = req.body.expiration_days,
				item.share = req.body.share,
				item.price = req.body.price,
				item.discount = req.body.discount,
				item.category = req.body.category,
				item.description = req.body.description,
				item.supplier = req.body.supplier,
				item.price = req.body.price,
				item.discount = req.body.discount,
				item.life_date_from = moment(req.body.life_date_from).format('DD/MM/YYYY'),
				item.life_date_to = moment(req.body.life_date_to).format('DD/MM/YYYY'),
				item.stock = req.body.stock,
				item.status = req.body.status,
				item.main_image = main_image
			}
		});

		archivo = JSON.stringify(products);
		fs.writeFileSync(productsFilePath, archivo);

		res.redirect("/");
	},

	delete: (req, res) => {
		// Pasamos el contenido de products a otra variable temporal
		let content = products;

		// Localizamos y filtramos el producto que quereremos borrar
		let filtered_content = content.filter(function (element) {
			return element.id != req.params.id;
		});

		// Volvemos a convertir el contenido filtrado en un string
		content = JSON.stringify(filtered_content);

		// Escribimos nuevamente el archivo productsDataBase.json con el producto borrado
		fs.writeFileSync(productsFilePath, content);
		res.redirect('/');
	}
};

module.exports = controller;