'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Accounts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
        main: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 100000
        },
        goals: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        status: {
            type: Sequelize.ENUM,
            values: ['active', 'disabled'],
            defaultValue: 'disabled'
        },
        account_number: {
          type: Sequelize.STRING,
            allowNull: false
        },
        interest: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        user_id: {
            type: Sequelize.INTEGER,
            onDelete: 'CASCADE',
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id',
                as: 'user_id'
            }
        },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Accounts');
  }
};