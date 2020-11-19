'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.addConstraint('Restaurants', {
      fields: ['username', 'email', 'siup_num'],
      type: 'unique',
      name: 'add-constraints-to-Restaurants'
    });
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.removeConstraint("Restaurants", 'add-constraints-to-Restaurants', {})
  }
};
