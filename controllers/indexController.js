const fs = require('fs');
const path = require('path');

const categoriesFilePath = path.join(__dirname, '../data/categoriesDataBase.json');
const categories = JSON.parse(fs.readFileSync(categoriesFilePath, 'utf-8'));

const controller = {

  // Home Page

  home: (req, res) => {
    res.render('index');
  },

  // Nosotros

  nosotros: (req, res) => {
    res.render('nosotros', {categories: categories});
  },

  // Contacto

  contacto: (req, res) => {
    res.render('contacto');
  },

  // Test

  getTest: (req, res) => {
    res.render('test');
  }

}

module.exports = controller;