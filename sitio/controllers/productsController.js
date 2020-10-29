const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const categoriesFilePath = path.join(__dirname, '../data/categoriesDataBase.json');
const categories = JSON.parse(fs.readFileSync(categoriesFilePath, 'utf-8'));

const controller = {

    // Carrito de compra
    productCart: (req, res) => {
        res.render('products/productCart');
    },

    // Detalle de producto
    productDetail: (req, res) => {
        res.render('products/productDetail');
    },

    // Formulario de creacion
	create: (req, res) => {
		res.render("products/productCreateForm",{categories : categories});
	},
	
	// Alta de producto
	store: (req, res, next) => {
		
		var product_image = ""
		if (req.files[0] !== undefined) {
			product_image = req.files[0].filename
		}

		console.log (req.files[0],product_image)

		products.push ({
			id : products[products.length-1].id + 1,
			image : product_image,
			...req.body
		});

		let archivo = JSON.stringify(products);
		fs.writeFileSync (productsFilePath,archivo);
		res.redirect("/");
	},

	// Formulario de modificacion
	edit: (req, res) => {

		product = products.find(function(item){
			return (req.params.id == item.id);
		})

		res.render("products/productEditForm",{product : product,categories : categories});
	},

	// Modificacion de producto
	update: (req, res, next) => {

		products.forEach (function(item) {
			if (item.id == req.params.id) {
				item.name = req.body.name;
				item.price = req.body.price;
				item.discount = req.body.discount;
				item.category = req.body.category;
				item.description = req.body.description;
				if (req.files[0] !== undefined) {
					item.image = req.files[0].filename;
				}
			}
		});

		let archivo = JSON.stringify(products);
		fs.writeFileSync (productsFilePath,archivo);

		res.redirect("/");
	},

};

module.exports = controller;