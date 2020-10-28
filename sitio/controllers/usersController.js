const fs = require('fs');
const path = require('path');
let { check, validationResult, body } = require("express-validator")

const usersDataBaseFilePath = path.join(__dirname, '../data/usersDataBase.json');


const controller = {

    // Registro

    registro: (req, res) => {
        res.render('users/register');
    },

    createRegistro: (req, res) => {

        //Usuario que se registro

        let usuario = {
            email: req.body.email,
            password: req.body.password,
            passwordrepeat: req.body.passwordrepeat,
            fecnac: req.body.fecnac
        }

        // Leo si ya hay algo en el archivo deusersDataBase

        let archivoUsuario = fs.readFileSync(usersDataBaseFilePath, { encoding: 'utf-8' })

        let usuarios;
        if (archivoUsuario == "") {
            usuarios = []
        } else {
            usuarios = JSON.parse(archivoUsuario)
        }

        //Agregamos al usuario nuevo
        usuarios.push(usuario);

        //Convertimos en JSON
        usuariosJSON = JSON.stringify(usuarios);

        //Lo escribimos en el archivo
        fs.appendFileSync(usersDataBaseFilePath, usuariosJSON)


        res.redirect('/usuarios/registro');
    },



    // Login

    login: (req, res) => {
        res.render('users/login');
    },

}

module.exports = controller;