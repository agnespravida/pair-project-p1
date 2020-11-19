'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Menu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    formatPrice(){
      return `Rp ${this.price}`
    }

    static associate(models) {
      // define association here
      Menu.belongsTo(models.Restaurant)
    }
  };
  Menu.init({
    name: DataTypes.STRING,
    price: DataTypes.STRING,
    amount: DataTypes.STRING,
    description: DataTypes.STRING,
    RestaurantId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Menu',
  });
  return Menu;
};