module.exports = (sequelize,Datatypes) => {
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
        lenguage: {
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
    };
    let config = {
        tableName: "products",
        timestamps:false
    };
    let products = sequelize.define(products,"cols",config);

    return products

}    