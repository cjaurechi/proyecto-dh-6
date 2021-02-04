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
				let newUsers = users.map((user) => {
					return {
						id: user.id,
						first_name: user.first_name,
						email: user.email,
						detail: '/api/users/' + user.id
					}
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

			let newUsers = {

				id: user.id,
				first_name: user.first_name,
				last_name: user.last_name,
				email: user.email,
				image: "http://localhost:3000/images/users/" + user.image,
				last_login: user.last_login,
				last_date_password: user.last_date_password,
				language: user.language,
				country: user.country,
				brday: user.brday,
				residence: user.residence,
				phone: user.phone,
				dark_mode: user.dark_mode,
				status: user.status	
			}
			
			let respuesta = {
				data: newUsers}
		 res.send(respuesta)})
		.catch(e => console.log(e));


		
    }
    
};