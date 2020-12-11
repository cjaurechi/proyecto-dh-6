module.exports = (sequelize, DataTypes) => {
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        purchase_id: {
            type: DataTypes.INTEGER
        },
        product_id: {
            type: DataTypes.INTEGER
        },
        quantity: {
            type: DataTypes.INTEGER
        },
        price: {
            type: DataTypes.DECIMAL
        },
        discount: {
            type: DataTypes.DECIMAL
        },
        expiration_days: {
            type: DataTypes.INTEGER
        }
    };

    let config = {
        tableName: 'purchase_product',
        timestamps: false
    };
    
    // purchase_product.associate = function(models) {
    //     purchase_product.hasMany(models.purchases, {
    //         as: "producto_compra",
    //         foreignKey: "purchase_id"
    //     })
    // }

    let purchase_product = sequelize.define('purchase_product', cols, config);
    return purchase_product;
}