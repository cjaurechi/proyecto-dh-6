const fs = require('fs');
const path = require('path');

const categoriesFilePath = path.join(__dirname, '../data/categoriesDataBase.json');
const categories = JSON.parse(fs.readFileSync(categoriesFilePath, 'utf-8'));

const controller = {

  // Home Page

  home: (req, res) => {
    res.render('index');
  },

  nosotros: (req, res) => {
    res.render('nosotros', {categories: categories});
  },

  contacto: (req, res) => {
    res.render('contacto');
  }

}

module.exports = controller;