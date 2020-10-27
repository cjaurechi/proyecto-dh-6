const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const controller = {

    // Registro

    registro: (req, res) => {
        res.render('register');
    },

    // Login

    login: (req, res) => {
        res.render('login');
    },

}

module.exports = controller;