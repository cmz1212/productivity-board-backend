'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {
      this.belongsToMany(models.task, { through: "task_user", foreignKey: 'user_id', otherKey: 'task_id' } );
    }
  }
  user.init({
    user_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_role: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image_link: DataTypes.STRING,
    additional_info: DataTypes.STRING,
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    proj_id: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'user',
    tableName: 'user',
    underscored: false,
    timestamps: false, // Exclude createdAt and updatedAt columns
    freezeTableName: true // Prevent Sequelize from pluralizing table name
  });
  return user;
};