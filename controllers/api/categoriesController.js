const { validationResult } = require('express-validator');
const createError = require('http-errors');
const db = require('../../database/models');
const { forEach } = require('../../middlewares/productMiddleware');


module.exports = {
	getCategories (req, res,next){

		db.categories.findAll()
		
			.then(function(categories){
				
                let respuesta = {
					meta:{
						count: categories.length,
						url: "/api/categories"
						},
					data: categories}
			res.send(respuesta)})
			.catch(e => console.log(e));

    },

   
    
};