const fs = require('fs');
const path = require('path');
const bcryptjs = require('bcryptjs');
const moment = require('moment');
const { check, validationResult, body } = require("express-validator");
const db = require('../database/models');

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
            db.users.create({
                first_name: '',
                last_name: '',
                email: req.body.email,
                password: bcryptjs.hashSync(req.body.password, 10),
                rol: '',
                image: req.files[0].filename,
                last_login: null,
                last_date_password: moment(new Date()).format('YYYY-MM-DD'),
                language: 'esp', // Default: Español
                brday: req.body.fecnac,
                country: '',
                residence: '',
                phone: '',
                dark_mode: 'n',
                status: 'active',
            })
                .then(function () {
                    res.render('users/login', { login_success: '¡Te registraste exitosamente! Ya podés iniciar sesión en Reegalo' });
                })
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
            db.users.findOne({
                where: {
                    email: req.body.email
                }
            })
                .then(usuario => {
                    if (bcryptjs.compareSync(req.body.password, usuario.password)) {
                        req.session.user = usuario;
                        res.locals.user = usuario;
                    }
                    res.redirect("/");
                })
                .catch(error => {
                    res.render('users/login', { errors: [{ "msg": 'Credenciales invalidas' }] });
                })
        } else {
            return res.render('users/login', { errors: errors.errors })
        }
    }
}

module.exports = controller;