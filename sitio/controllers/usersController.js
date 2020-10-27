const fs = require('fs');
const path = require('path');
let {check,validationResult, body} = require("express-validator")

const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const registroUsersFilePath = path.join(__dirname, '../data/registroUsers.json');


const controller = {

    // Registro

    registro: (req, res) => {
        res.render('register');
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

        let archivoUsuario = fs.readFileSync(registroUsersFilePath, {encoding: 'utf-8'})

        let usuarios;
        if (archivoUsuario == ""){
            usuarios = []
        }else{
            usuarios = JSON.parse(archivoUsuario)
        }

        //Agregamos al usuario nuevo
        usuarios.push(usuario);

        //Convertimos en JSON
        usuariosJSON = JSON.stringify(usuarios);

        //Lo escribimos en el archivo
        fs.appendFileSync(registroUsersFilePath, usuariosJSON)
    
            
        res.redirect('/usuarios/registro');
    },



    // Login

    login: (req, res) => {
        res.render('login');
    },

}

module.exports = controller;