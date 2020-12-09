module.exports = (sequelize,Datatypes) => {
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        category_id: {
            type: DataTypes.INTEGER
        },
        supplier_id: {
            type: DataTypes.INTEGER
        },
        creation_date: {
            type: DataTypes.DATE
        },
        expiration_days: {
            type: DataTypes.INTEGER
        },
        share: {
            type: DataTypes.STRING
        },
        price: {
            type: DataTypes.DECIMAL
        },
        discount: {
            type: DataTypes.DECIMAL
        },
        life_date_from: {
            type: DataTypes.DATE
        },
        life_date_to: {
            type: DataTypes.DATE
        },
        stock: {
            type: DataTypes.INTEGER
        },
        status: {
            type: DataTypes.STRING
        },
        main_image: {
            type: DataTypes.STRING
        }
    };
    let config = {
        tableName: "products",
        timestamps:false
    };
    let products = sequelize.define(products,"cols",config);

    products.associate = function(models) {
        products.belongsTo(models.categories, {
            as: "categorias",
            foreignKey: "category_id"
        })
        products.belongsTo(models.suppliers, {
            as: "proveedores",
            foreignKey: "supplier_id"
        })
        products.hasMany(models.product_image, {
            as: "producto_imagen",
            foreignKey: "product_id"
        })
    }

    return products

}