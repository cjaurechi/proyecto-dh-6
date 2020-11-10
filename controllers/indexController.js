const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const categoriesFilePath = path.join(__dirname, '../data/categoriesDataBase.json');
const categories = JSON.parse(fs.readFileSync(categoriesFilePath, 'utf-8'));

const productsImagesFilePath = path.join(__dirname, '../data/productsImagesDataBase.json');
let products_images = JSON.parse(fs.readFileSync(productsImagesFilePath, 'utf-8'));

const controller = {

  // Home Page

  home: (req, res) => {
    res.render('index', {categories:categories, products:products});
  },

  // Nosotros

  nosotros: (req, res) => {
    res.render('nosotros', {categories: categories});
  },

  // Contacto

  contacto: (req, res) => {
    res.render('contacto');
  },
  comoregalar: (req, res) => {
    res.render('comoregalar'),

  // Test

  getTest: (req, res) => {
    res.render('test');
  }

}

module.exports = controller;