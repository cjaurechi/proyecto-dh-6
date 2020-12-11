module.exports = (sequelize, DataTypes) => {
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
        }
    };

    let config = {
        tableName: 'categories',
        timestamps: false
    };
    
    // categories.associate = function(models) {
    //         categories.hasMany(models.products, {
    //                 as: "productos",
    //                 foreignKey: "category_id"
    //             })
    //         }
            
    let categories = sequelize.define('categories', cols, config);
    return categories;

}
