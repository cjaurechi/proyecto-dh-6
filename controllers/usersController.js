const bcryptjs = require('bcryptjs');
const moment = require('moment');
const { check, validationResult, body } = require("express-validator");
const db = require('../database/models');

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
                        if (req.body.recordar) {
                            res.cookie('recordar', usuario.email, { maxAge: 240 * 1000 })
                        }
                        db.users.update({
                            last_login: moment(new Date()).format('YYYY-MM-DD')
                        }, {
                            where: {
                                email: req.body.email
                            }
                        })
                    }
                    res.redirect("/");
                })
                .catch(error => {
                    res.render('users/login', { errors: [{ "msg": 'Credenciales invalidas' }] });
                })
        } else {
            return res.render('users/login', { errors: errors.errors })
        }
    },

    // Logout

    logout: (req, res) => {
        console.log(res.session);
        req.session.destroy();
        res.cookie('recordar', null, { maxAge: 0 })
        return res.render('users/logout', { user: undefined })
    },

    // Perfil de usuario

    getProfile: (req, res) => {
        db.users.findByPk(req.params.id)
            .then(user => {
                res.render('users/profile', { user: user });
            })
            .catch(error => {
                res.render('users/profile', { errors: error });
            })
    },

    // Actualizar datos de usuario

    updateProfile: (req, res) => {
        db.users.update({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            rol: req.body.rol,
            language: req.body.language,
            brday: req.body.brday,
            country: req.body.country,
            residence: req.body.residence,
            phone: req.body.phone,
            dark_mode: req.body.dark_mode
        },
            {
                where: {
                    id: req.params.id
                }
            })
            .then(user => {
                db.users.findByPk(req.params.id)
                    .then(user => {
                        res.render('users/profile', { user: user, edit_success: true })
                    })
                    .catch(error => {
                        res.render('users/profile', { errors: error });
                    })
            })
            .catch(error => {
                res.render('users/profile', { errors: error });
            })
    },

    // Actualizar foto de perfil

    updateAvatar: (req, res) => {
        db.users.update({
            image: req.files[0].filename
        }, {
            where: {
                id: req.params.id
            }
        })
            .then(user => {
                db.users.findByPk(req.params.id)
                    .then(user => {
                        res.render('users/profile', { user: user, edit_success: true })
                    })
                    .catch(error => {
                        res.render('users/profile', { errors: error });
                    })
            })
            .catch(error => {
                res.render('users/profile', { errors: error });
            })
    }

}

module.exports = controller;