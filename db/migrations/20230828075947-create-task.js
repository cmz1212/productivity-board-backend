'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('task', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      task_description: {
        allowNull: false,
        type: Sequelize.STRING
      },
      project_id: {
        allowNull: false,
        type: Sequelize.BIGINT,
        references: {
          model: 'project', // Name of the referenced table
          key: 'id', // Primary key of the referenced table
        },
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING
      },
      start_date: {
        type: Sequelize.DATE
      },
      end_date: {
        type: Sequelize.DATE
      },
      target_end_date: {
        type: Sequelize.DATE
      },
      cycle_time: {
        type: Sequelize.BIGINT
      },
      target_cycle_time: {
        type: Sequelize.BIGINT
      },
      priority: {
        type: Sequelize.STRING
      },
      task_comments: {
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tasks');
  }
};