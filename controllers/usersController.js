const fs = require('fs');
const path = require('path');
const bcryptjs = require('bcryptjs');
const moment = require('moment');
let { check, validationResult, body } = require("express-validator")

const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
var users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const controller = {

    // Registro

    registro: (req, res) => {
        res.render('users/register');
    },

    createRegistro: (req, res) => {

        //Usuario que se registro
        let nuevo_usuario = {
            id: users[users.length - 1].id + 1,
            first_name: '',
            last_name: '',
            email: req.body.email,
            password: bcryptjs.hashSync(req.body.password, 10),
            passwordrepeat: bcryptjs.hashSync(req.body.passwordrepeat, 10),
            rol: '',
            image: '',
            last_login: moment(new Date()).format('YYYY-MM-DD'),
            last_date_password: moment(new Date()).format('YYYY-MM-DD'),
            language: 'esp', // Dejo español por default
            country: '',
            brday: req.body.fecnac,
            residence: '',
        }

        //Agregamos al usuario nuevo
        users.push(nuevo_usuario);

        //Convertimos en string
        users = JSON.stringify(users);

        //Lo escribimos en el archivo
        fs.writeFileSync(usersFilePath, users)

        res.redirect('/usuarios/registro');
    },


    // Login

    login: (req, res) => {
        res.render('users/login');
    },

}

module.exports = controller;