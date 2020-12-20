module.exports = (sequelize, DataTypes) => {
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: DataTypes.STRING
        },
        last_name: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        rol: {
            type: DataTypes.STRING
        },
        image: {
            type: DataTypes.STRING
        },
        last_login: {
            type: DataTypes.DATE
        },
        last_date_password: {
            type: DataTypes.DATE
        },
        language: {
            type: DataTypes.STRING
        },
        country: {
            type: DataTypes.STRING
        },
        brday: {
            type: DataTypes.DATE
        },        
        residence: {
            type: DataTypes.STRING
        },
        phone: {
            type: DataTypes.STRING
        },
        dark_mode: {
            type: DataTypes.STRING
        },
        status: {
            type: DataTypes.STRING
        }
    }

    let config = {
        tableName: 'users',
        timestamps: false
    }
    
    let users = sequelize.define('users', cols, config);

    users.associate = function(models) {
        users.hasMany(models.comments, {
            as: 'comments',
            foreignKey: 'user_id'
        });
        users.hasMany(models.purchases, {
            as: 'purchases',
            foreignKey: 'user_id'
        });
    }

    return users;
}