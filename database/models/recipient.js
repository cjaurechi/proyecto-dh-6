module.exports = (sequelize, DataTypes) => {
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: DataTypes.VARCHAR
        },
        last_name: {
            type: DataTypes.VARCHAR
        },
        email: {
            type: DataTypes.VARCHAR
        },
        
        address_id: {
            type: DataTypes.VARCHAR
        }
    };

    let config = {
        tableName: 'recipients',
        timestamps: false
    };

    let purchases = sequelize.define('recipients', cols, config);

    recipients.associate = function(models) {
        
        recipients.belongsToMany(models.purchases, {
            as: 'purchases',
            through: 'recipient_purchase',
            foreignKey:'recipent_id' ,
            otherKey: 'purchase_id',
            timestamps: false
        })
    }

    return recipients;
}