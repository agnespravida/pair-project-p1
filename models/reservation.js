'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reservation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Reservation.belongsTo(models.Restaurant)
      // Reservation.belongsTo(models.User)
    }
  };
  Reservation.init({
    UserId: DataTypes.INTEGER,
    RestaurantId: DataTypes.INTEGER,
    time: DataTypes.STRING,
    date: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'Reservation',
  });
  return Reservation;
};