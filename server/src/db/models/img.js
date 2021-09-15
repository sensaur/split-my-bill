"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class IMG extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Bill }) {
      this.belongsTo(User, { foreignKey: "user_id" });
      this.hasOne(Bill, { foreignKey: "img_id" });
    }
  }
  IMG.init(
    {
      url: DataTypes.TEXT,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "IMG",
    }
  );
  return IMG;
};
