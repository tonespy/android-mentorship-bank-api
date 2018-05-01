'use strict'
module.exports = (sequelize, DataTypes) => {
  var Account = sequelize.define('Account', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    account_number: {
      type: DataTypes.STRING,
      allowNull: false
    },
    main: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 100000
    },
    status: {
      type: DataTypes.ENUM,
      values: ['active', 'disabled'],
      defaultValue: 'disabled'
    },
    goals: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    interest: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  })

  Account.associate = function (models) {
    // associations can be defined here
    Account.belongsTo(models.User, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE'
    })
  }

  return Account
}
