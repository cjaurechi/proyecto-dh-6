const fs = require('fs');
const path = require('path');
const { Console } = require('console');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const productsImagesFilePath = path.join(__dirname, '../data/productsImagesDataBase.json');
let products_images = JSON.parse(fs.readFileSync(productsImagesFilePath, 'utf-8'));

const categoriesFilePath = path.join(__dirname, '../data/categoriesDataBase.json');
const categories = JSON.parse(fs.readFileSync(categoriesFilePath, 'utf-8'));

const suppliersFilePath = path.join(__dirname, '../data/suppliersDataBase.json');
let suppliers = JSON.parse(fs.readFileSync(suppliersFilePath, 'utf-8'));

const commentsFilePath = path.join(__dirname, '../data/commentsDataBase.json');
let comments = JSON.parse(fs.readFileSync(commentsFilePath, 'utf-8'));

const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const controller = {

	// Detalle de producto
	productDetail: (req, res) => {

		let product = products.find(function (item) {
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

		let products_category = products.filter(function (item) {
			return (req.params.id == item.category);
		})

		let category = categories.find(function (item) {
			return (req.params.id == item.id)
		})

		for (let i = 0; i < products_category.length; i++) {
			let product_image = products_images.find(function (item) {
				return (products_category[i].id == item.id && item.number == 0);
			})
			products_category[i].main_image = product_image.image
		}

		res.render("products/productList", { products_category: products_category, category: category });

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

		products.push({
			id: products[products.length - 1].id + 1,
			name: req.body.name,
			description: req.body.description,
			category: req.body.category,
			creation_user: req.body.user,
			creation_date: fecha_actual.getDate() + "/" + (fecha_actual.getMonth() + 1) + "/" + fecha_actual.getFullYear(),
			supplier: req.body.supplier,
			price: req.body.price,
			discount: req.body.discount,
			life_date_from: req.body.life_date_from,
			life_date_to: req.body.life_date_to,
			stock: req.body.stock,
			state: req.body.status,
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

		products.forEach(function (item) {
			if (item.id == req.params.id) {
				item.name = req.body.name;
				description = req.body.description;
				category = req.body.category;
				item.price = req.body.price;
				item.discount = req.body.discount;
				item.category = req.body.category;
				item.description = req.body.description;
				supplier = req.body.supplier;
				price = req.body.price;
				discount = req.body.discount;
				life_date_from = req.body.life_date_from;
				life_date_to = req.body.life_date_to;
				stock = req.body.stock;
				state = req.body.status;
			}
		});

		archivo = JSON.stringify(products);
		fs.writeFileSync(productsFilePath, archivo);

		res.redirect("/");
	},

	delete: (req, res) => {
		// Pasamos el contenido de productsDataBase.json a una variable
		let content = fs.readFileSync(products, { encoding: 'utf-8' });

		// Convertimos en un array para poder operar
		content = JSON.parse(content);

		// Localizamos y eliminamos el objeto que quereremos borrar?
		let filtered_content = content.filter(function (element) {
			return element.id != req.params.id;
		})

		// Volvemos a convertir el array en un string
		content = JSON.stringify(filtered_content);

		// Escribimos nuevamente el archivo productsDataBase.json
		fs.writeFileSync(filePath, content);
		res.redirect('/productos');
	}
};

module.exports = controller;