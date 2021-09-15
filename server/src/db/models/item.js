const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    static associate({ Bill, SubItem }) {
      this.belongsTo(Bill, { foreignKey: "bill_id" });
      this.hasMany(SubItem, { foreignKey: "item_id" });
    }
  }
  Item.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      number: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      sum: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      bill_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Item",
    }
  );
  return Item;
};
