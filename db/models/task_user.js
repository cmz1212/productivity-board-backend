'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class task_user extends Model {
    static associate(models) {
      // Define associations here
    }
  }

  task_user.init(
    {
      // Define columns of the task_user table here
      user_id: DataTypes.INTEGER,
      task_id: DataTypes.INTEGER,
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
      }
    },
    {
      sequelize,
      modelName: 'task_user',
      tableName: 'task_user',
      underscored: false,
      timestamps: false, // Exclude createdAt and updatedAt columns
      freezeTableName: true // Prevent Sequelize from pluralizing table name
    }
  );

  return task_user;
};