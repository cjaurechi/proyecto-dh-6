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
        }
    };
    let config = {
        tableName: "categories",
        timestamps:false
    };
    let categories = sequelize.define(categories,"cols",config);

    categories.associate = function(models) {
        categories.hasMany(models.products, {
            as: "productos",
            foreignKey: "category_id"
        })
    }

    return categories

}
