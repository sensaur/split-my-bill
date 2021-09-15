const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Bill extends Model {
    static associate({ Item, IMG, Bill_Split }) {
      this.hasMany(Bill_Split, { foreignKey: "bill_parent_id" });
      this.hasMany(Item, { foreignKey: "bill_id" });
      this.belongsTo(IMG, { foreignKey: "img_id" });
    }
  }
  Bill.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false
      },
      img_id: {
        type: DataTypes.INTEGER,
      },
      status: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: "Bill",
    }
  );
  return Bill;
};
