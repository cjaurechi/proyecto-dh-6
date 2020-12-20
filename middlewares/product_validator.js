const { check, body} = require('express-validator');
const moment = require("moment");

module.exports = [
    check('name').isLength({min: 10, max:50}).withMessage("El nombre del producto debe tener minimo 10 caracteres y maximo 50"),
    check('supplier').notEmpty().withMessage("El producto debe tener asignado un proveedor"),
    check('price').isDecimal().withMessage("El precio del producto debe ser numerico"),
    check('discount').isDecimal().withMessage("El descuento del producto debe ser numerico"),
    check('category').notEmpty().withMessage("El producto debe tener asociada una categoria"),
    check('life_date_from').isDate().withMessage("El producto debe tener asignada una fecha de vigencia desde"),
    check('life_date_to').isDate().withMessage("El producto debe tener asignada una fecha de vigencia hasta"),
    check('expiration_days').isInt({gt: 0}).withMessage("Los dias de vencimiento del producto debe mayor o igual a 0"),
    check('share').isLength({min: 10, max:30}).withMessage("El campo compartir del producto debe tener minimo 10 caracteres y maximo 30"),
    check('stock').isInt({gt: 0}).withMessage("La disponibilidad del producto debe ser mayor o igual a 0"),
    check('status').notEmpty().withMessage("El estado del producto debe tener asociado un valor"),
    check('description').isLength({min: 10, max:300}).withMessage("La descripcion del producto debe tener minimo 10 caracteres y maximo 300"),
    body('life_date_from').custom(function(value){
        fecha_actual = new Date
        fecha_actual = moment(fecha_actual).format('YYYY-MM-DD')
        if (value < fecha_actual) {
            throw new Error('La fecha de vigencia desde debe ser mayor o igual a hoy');
        }
        return true;
    })
]