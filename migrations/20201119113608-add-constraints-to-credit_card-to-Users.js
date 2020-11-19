'use strict';

module.exports = {
  up:  (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.addConstraint('Users', {
      fields: ['credit_card'],
      type: 'unique',
      name: 'add-constraint-unique-to-credit_card-in-Users'
    });
  },

  down:  (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.removeConstraint("Users", 'add-constraint-unique-to-credit_card-in-Users', {})
  }
};
