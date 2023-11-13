'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class task extends Model {
    static associate(models) {
      this.belongsTo(models.project, { foreignKey: 'project_id'});
      this.belongsToMany(models.user, { through: "task_user", foreignKey: 'task_id', otherKey: 'user_id' });
    }
  }
  task.init({
    task_description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    project_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    target_end_date: DataTypes.DATE,
    cycle_time: DataTypes.BIGINT,
    target_cycle_time: DataTypes.BIGINT,
    priority: DataTypes.STRING,
    task_comments: DataTypes.STRING,
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
    modelName: 'task',
    tableName: 'task',
    underscored: false,
    timestamps: false, // Exclude createdAt and updatedAt columns
    freezeTableName: true // Prevent Sequelize from pluralizing table name
  });
  return task;
};