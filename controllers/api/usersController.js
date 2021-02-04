const { validationResult } = require('express-validator');
const createError = require('http-errors');
const db = require('../../database/models');

module.exports = {
	listado (req, res,next){

		db.users.findAll()
		
			.then(function(users){
				let respuesta = {
					meta:{
						count: users.length,
						url: "/api/users"
						},
					data: users}
			 res.send(respuesta)})
			.catch(e => console.log(e));

    },
    detalle (req, res){

		
    }
    
};