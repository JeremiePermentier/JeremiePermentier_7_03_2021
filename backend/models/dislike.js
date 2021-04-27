'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Dislike extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Dislike.belongsTo(models.User,
        { foreignKey: {
          allowNull: false
        }, onDelete: 'CASCADE',
      }),
      models.Dislike.belongsTo(models.Message,
        { foreignKey: {
          allowNull: false,
        }, onDelete: 'CASCADE',
      })
    }
  };
  Dislike.init({
    messageId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Dislike',
  });
  return Dislike;
};