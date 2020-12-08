module.exports = (sequelize,Datatypes) => {
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER
        },
        product_id: {
            type: DataTypes.INTEGER
        }
    };
    let config = {
        tableName: "comments",
        timestamps:false
    };
    let comments = sequelize.define(comments,"cols",config);

    return comments

}
