module.exports = (sequelize,Datatypes) => {
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        purchase_id: {
            type: DataTypes.INTEGER
        },
        status_id: {
            type: DataTypes.INTEGER
        },
        status_date: {
            type: DataTypes.DATE
        }
    };
    let config = {
        tableName: "purchase_status",
        timestamps:false
    };
    let purchase_status = sequelize.define(purchase_status,"cols",config);
    

    return purchase_status

}