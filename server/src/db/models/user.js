const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Bill_Split, IMG, SubItem }) {
      this.hasMany(SubItem, { foreignKey: "user_id" });
      this.hasMany(Bill_Split, { foreignKey: "user_id" });
      this.hasMany(IMG, { foreignKey: "user_id" });
    }
  }
  User.init(
    {
      userName: DataTypes.STRING,
      userPhoto: DataTypes.STRING,
      password: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: true
      }
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
