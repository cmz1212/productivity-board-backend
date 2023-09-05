const Sequelize = require('sequelize');

class TaskController {
  constructor(model, taskModel, userModel) {
    this.model = model;
    this.taskModel = taskModel;
    this.userModel = userModel;
  }

  // Retrieve all tasks
  async getAll(req, res) {
    try {
      const output = await this.model.findAll({
        include: [
          {
            model: this.taskModel,
          },
          {
            model: this.userModel,
            attributes: {
              exclude: ['createdAt', 'updatedAt'] // Exclude createdAt and updatedAt from the associated user
            }
          },
          
        ],
      });
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
  
  // Retrieve specific task
  async getOneTask(req, res) {
    const { taskId } = req.params;
    try {
      const OneTask = await this.model.findByPk(taskId, {
        include: [
          { model: this.taskModel },
          {
            model: this.userModel,
            attributes: {
              exclude: ['createdAt', 'updatedAt'] // Exclude createdAt and updatedAt from the associated user
            }
          }
        ]
      });
      return res.json(OneTask);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // Add a new task
  async postOneTask(req, res) {
    try {
      // Get the input data from the request body
      const { task_description, project_id, status, start_date, end_date, target_end_date, cycle_time, target_cycle_time, priority, task_comments } = req.body;

      const newTask = await this.model.create({
        task_description,
        project_id,
        status,
        start_date,
        end_date,
        target_end_date,
        cycle_time,
        target_cycle_time,
        priority,
        task_comments,
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
      });

      // Respond with new task
      return res.json(newTask);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // Update a specific task
  async putOneTask(req, res) {
    try {
      const { taskId } = req.params;
  
      // Get the updated data from the request body
      const { task_description, project_id, status, start_date, end_date, target_end_date, cycle_time, target_cycle_time, priority, task_comments } = req.body;
  
      // Find the existing task by ID
      const existingTask = await this.model.findByPk(taskId);
  
      // Update task attributes
      if (!existingTask) {
        return res.status(404).json({ error: true, msg: "Task not found." });
      }

      // Update task attributes
      if (task_description) {
        existingTask.task_description = task_description;
      }
      if (project_id) {
        existingTask.project_id = project_id;
      }
      if (status) {
        existingTask.status = status;
      }
      if (start_date) {
        existingTask.start_date = start_date;
      }
      if (end_date) {
        existingTask.end_date = end_date;
      }
      if (target_end_date) {
        existingTask.target_end_date = target_end_date;
      }
      if (cycle_time) {
        existingTask.cycle_time = cycle_time;
      }
      if (target_cycle_time) {
        existingTask.target_cycle_time = target_cycle_time;
      }
      if (priority) {
        existingTask.priority = priority;
      }
      if (task_comments) {
        existingTask.task_comments = task_comments;
      }

      existingTask.updated_at = Sequelize.literal('CURRENT_TIMESTAMP');

      // Save the changes to the database
      await existingTask.save();
  
      // Respond with the updated task
      return res.json(existingTask);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // Delete a specific task
  async deleteOneTask(req, res) {
    try {
      const { taskId } = req.params;

      // Find the existing task by ID
      const existingTask = await this.model.findByPk(taskId);

      if (!existingTask) {
        return res.status(404).json({ error: true, msg: 'Task not found.' });
      }

      // Delete the task from the database
      await existingTask.destroy();

      // Respond with a success message
      return res.json({ success: true, msg: 'Task deleted successfully.' });
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
  
}

module.exports = TaskController;