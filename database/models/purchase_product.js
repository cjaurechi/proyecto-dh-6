module.exports = (sequelize,Datatypes) => {
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
        tableName: "purchase_product",
        timestamps:false
    };
    let purchase_product = sequelize.define(purchase_product,"cols",config);
    
    purchase_product.associate = function(models) {
        purchase_product.hasMany(models.purchases, {
            as: "producto_compra",
            foreignKey: "purchase_id"
        })
    }

    return purchase_product

}