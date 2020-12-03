const fs = require('fs');
const path = require('path');
const bcryptjs = require('bcryptjs');
const moment = require('moment');
const { check, validationResult, body } = require("express-validator")

const usersFilePath = path.join(__dirname, '../data/users.json');
var users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const controller = {

    // Registro

    register: (req, res) => {
        res.render('users/register');
    },

    createUser: (req, res) => {
        let errors = validationResult(req);

        if (errors.isEmpty()) {
            // Guardo nombre de archivo para imagen de perfil
            let filename = ""
            req.files.forEach(function (file) {
                filename = file.filename;
            });

            // Creo objeto literal de nuevo usuario
            let nuevo_usuario = {
                id: users[users.length - 1].id + 1,
                first_name: '',
                last_name: '',
                email: req.body.email,
                password: bcryptjs.hashSync(req.body.password, 10),
                bday: req.body.fecnac,
                rol: '',
                profile: filename,
                last_login: moment(new Date()).format('YYYY-MM-DD'),
                last_date_password: moment(new Date()).format('YYYY-MM-DD'),
                language: 'esp', // Dejo español por default
                country: '',
                residence: '',
            }

            // Agregamos nuevo usuario al array de usuarios
            users.push(nuevo_usuario);

            // Convertimos al array en string
            users = JSON.stringify(users);

            // Escribimos el JSON de usuarios
            fs.writeFileSync(usersFilePath, users)
            res.render('users/login', { login_success: '¡Te registraste exitosamente! Ya podés iniciar sesión en Reegalo' });
        } else {
            return res.render('users/register', { errors: errors.errors })
        }
    },

    // Login

    login: (req, res) => {
        res.render('users/login');
    },

    processLogin: (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            let usuarioALoguearse;

            //Recorro el json de usuarios para ver si existe el usuario que se logueo
            for (let i = 0; i < users.length; i++) {
                if (users[i].email == req.body.email) {
                    if (bcryptjs.compareSync(req.body.password, users[i].password)) {
                        usuarioALoguearse = users[i].email;
                        res.locals.rol = users[i].rol;
                        break;
                    }
                }
            }

            // Si no existe el usuario mando un error con credenciales invalidas
            if (usuarioALoguearse == undefined) {
                return res.render('users/login', { errors: [{ "msg": 'Credenciales invalidas' }] })
            }

            //Si existe el usuario entonces lo gurdo en session
            req.session.usuarioLogueado = usuarioALoguearse;
            res.locals.user = usuarioALoguearse;
            console.log(res.locals.rol);
            res.redirect("/")
        } else {
            return res.render('users/login', { errors: errors.errors })
        }
    }
}

module.exports = controller;