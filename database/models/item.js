module.exports = (sequelize, DataTypes) => {
  let cols = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    sale_price: {
      type: DataTypes.DECIMAL
    },
    quantity: {
      type: DataTypes.INTEGER
    },
    subtotal: {
      type: DataTypes.INTEGER
    },
    state: {
      type: DataTypes.TINYINT
    },
    user_id: {
      type: DataTypes.INTEGER
    },
    seller_id: {
      type: DataTypes.INTEGER
    },
    product_id: {
      type: DataTypes.INTEGER
    },
    cart_id: {
      type: DataTypes.INTEGER
    },
    created_at: {
      type: DataTypes.DATE
    },
    updated_at: {
      type: DataTypes.DATE
    },
    deleted_at: {
      type: DataTypes.DATE
    }
  };

  let config = {
    tableName: 'items',
    timestamps: false
  };

  let items = sequelize.define('items', cols, config);

  items.associate = function (models) {
    items.belongsTo(models.users, {
      as: 'user',
      foreignKey: 'user_id'
    });

    items.belongsTo(models.carts, {
      as: 'carts',
      foreignKey: 'cart_id'
    })
  }

  return items;
}