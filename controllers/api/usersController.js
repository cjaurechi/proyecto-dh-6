const { validationResult } = require('express-validator');
const createError = require('http-errors');
const db = require('../../database/models');
const { forEach } = require('../../middlewares/productMiddleware');

module.exports = {
	listado (req, res,next){

		db.users.findAll({
			attributes:[
				"id", 
				"first_name",
				"email"
			]
		})
		
			.then(function(users){
				let newUsers = []
				users.forEach((user) => {
					newUsers.push({
						id: user.id,
						first_name: user.first_name,
						email: user.email,
						detail: '/api/users/' + user.id
					})
				})
				let respuesta = {
					meta:{
						count: users.length,
						url: "/api/users"
						},
					data: newUsers}
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