const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const categoriesFilePath = path.join(__dirname, '../data/categoriesDataBase.json');
const categories = JSON.parse(fs.readFileSync(categoriesFilePath, 'utf-8'));

const controller = {

    // Carrito de compra
    productCart: (req, res) => {
        res.render('productCart');
    },

    // Detalle de producto
    productDetail: (req, res) => {
/*         res.render('productDetail'); */
        res.render('productDetail');
      },

    // Formulario de creacion
	create: (req, res) => {
		res.render("productCreateForm",{categories : categories})
	},
	
	// Alta de producto
	store: (req, res, next) => {

		products.push ({
			id : products[products.length-1].id + 1,
			image : req.files[0].filename,
			...req.body
		})

		let archivo = JSON.stringify(products)
		fs.writeFileSync (productsFilePath,archivo)

	    res.redirect("/")
	},

	// Formulario de modificacion
	edit: (req, res) => {

		product = products.find(function(item){
			return (req.params.id == item.id)
		})

		res.render("productEditForm",{product : product})
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
				 item.image = req.files[0].filename;
			}
		})    
		 
		let archivo = JSON.stringify(products)
		fs.writeFileSync (productsFilePath,archivo)

		res.redirect("/")
	},

};

module.exports = controller;