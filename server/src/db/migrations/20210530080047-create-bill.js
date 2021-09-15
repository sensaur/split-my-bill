module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Bills", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      img_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "IMGs",
            key: "id",
            as: "img_id",
          },
        },
        onUpdate: "CASCADE",
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Bills");
  },
};
