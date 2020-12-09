module.exports = (sequelize,Datatypes) => {
    let cols = {
        product_id: {
            type: DataTypes.INTEGER
        },
        image: {
            type: DataTypes.STRING
        },
        number: {
            type: DataTypes.INTEGER
        }
    };
    let config = {
        tableName: "product_image",
        timestamps:false
    };
    let product_image = sequelize.define(product_image,"cols",config);

    product_image.associate = function(models) {
        product_image.belongsTo(models.products, {
            as: "producto_imagen",
            foreignKey: "product_id"
        })
    }

    return product_image

}