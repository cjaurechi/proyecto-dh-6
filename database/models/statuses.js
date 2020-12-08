module.exports = (sequelize,Datatypes) => {
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        description: {
            type: DataTypes.STRING
        }
    };
    let config = {
        tableName: "statuses",
        timestamps:false
    };
    let statuses = sequelize.define(statuses,"cols",config);

    return statuses

}