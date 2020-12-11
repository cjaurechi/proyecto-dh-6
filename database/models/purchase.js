module.exports = (sequelize, DataTypes) => {
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER
        },
        purchase_date: {
            type: DataTypes.DATE
        },
        total: {
            type: DataTypes.DECIMAL
        },
        email_address: {
            type: DataTypes.STRING
        },
        recipient_address: {
            type: DataTypes.STRING
        },
        message: {
            type: DataTypes.STRING
        },
        status_id: {
            type: DataTypes.INTEGER
        }
    };

    let config = {
        tableName: 'purchases',
        timestamps: false
    };

    // purchases.associate = function(models) {
    //     purchases.belongsTo(models.users, {
    //         as: "usuarios",
    //         foreignKey: "user_id"
    //     })

    //     purchases.hasMany(models.purchase_product, {
    //         as: "compra_producto",
    //         foreignKey: "purchase_id"
    //     })
    // }

    let purchases = sequelize.define('purchases', cols, config);
    return purchases

}