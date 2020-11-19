'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.addConstraint('Menus', {
      fields: ['RestaurantId'],
      type: 'foreign key',
      name: 'add-fk-RestaurantId-to-Menus',
      references: { //Required field
        table: 'Restaurants',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  down: (queryInterface, Sequelize) => {
     return removeConstraint('Menus', 'add-fk-RestaurantId-to-Menus',{})
  }
};
