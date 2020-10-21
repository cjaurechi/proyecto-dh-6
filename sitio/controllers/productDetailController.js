/* var path = require('path'); */

const controlador = {
    producto: function (req, res) {
/*         let file = path.resolve('views/productDetail.ejs');
        res.sendFile(file); */
        res.render('productDetail');
      },
}
module.exports = controlador;