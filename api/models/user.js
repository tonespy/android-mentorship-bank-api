'use strict'
const bcrypt = require('bcrypt')
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    fullname: {
      type: DataTypes.STRING
    },
    username: {
      type: DataTypes.STRING,
      unique: true
    },
    bvn: {
      type: DataTypes.STRING
    },
    bvnProvided: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    phone: {
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {
        isNumeric: true
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['admin', 'user']]
      }
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please provide a password'
        },
        len: {
          args: [8],
          msg: 'Passwords must be at least 8 characters'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: (user) => {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10))
      },
      beforeUpdate: (user) => {
        if (user.password) user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10))
      },
      beforeBulkCreate: (users) => {
        for (const user of users) {
          if (user.password) user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10))
        }
      },
      beforeBulkUpdate: (users) => {
        if (users.attributes.password) users.attributes.password = bcrypt.hashSync(users.attributes.password, bcrypt.genSaltSync(10))
      }
    }
  })

  User.associate = function (models) {
    // associations can be defined here
  }

  User.prototype.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password)
  }

  return User
}
