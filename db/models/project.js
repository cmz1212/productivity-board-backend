'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class project extends Model {
    static associate(models) {
      this.hasMany(models.task, {foreignKey: 'project_id'} );
    }
  }
  project.init({
    project_description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    auth_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    wip_limit: DataTypes.BIGINT,
    cycle_time_limit: DataTypes.BIGINT,
    project_comments: DataTypes.STRING,
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
  }, {
    sequelize,
    modelName: 'project',
    tableName: 'project',
    underscored: false,
    timestamps: false, // Exclude createdAt and updatedAt columns
    freezeTableName: true // Prevent Sequelize from pluralizing table name
  });
  return project;
};