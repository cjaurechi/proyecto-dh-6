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

		db.users.findByPk(req.params.id)
            
		
		.then(function(user){
			let respuesta = {
				imagenusuario: user.image,
				data: user}
		 res.send(respuesta)})
		.catch(e => console.log(e));


		
    }
    
};