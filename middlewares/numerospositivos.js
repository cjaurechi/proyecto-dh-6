
function numerosPositivos (req, res, next){

    if (req.body.expiration_days < 0 || req.body.price< 0 || req.body.discoun< 0 || req.body.stock< 0) {

              
        return res.render('products/productEditForm');

    }else{
    next ()
}
}
    

module.exports = numerosPositivos