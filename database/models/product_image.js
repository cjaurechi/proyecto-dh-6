module.exports = (sequelize, DataTypes) => {
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
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
        tableName: 'product_image',
        timestamps: false
    };

    // product_image.associate = function(models) {
    //     product_image.belongsTo(models.products, {
    //         as: "producto_imagen",
    //         foreignKey: "product_id"
    //     })
    // }
            
    let product_image = sequelize.define('product_image', cols, config);
    return product_image;
}