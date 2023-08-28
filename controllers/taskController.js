class TaskController {
  constructor(model, projectModel, userModel) {
    this.model = model;
    this.projectModel = projectModel;
    this.userModel = userModel;
  }

  // Retrieve all tasks
  async getAll(req, res) {
    try {
      const output = await this.model.findAll({
        include: [
          {
            model: this.projectModel,
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
          { model: this.projectModel },
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
  
      if (!existingTask) {
        return res.status(404).json({ error: true, msg: 'Task not found.' });
      }
  
      // Update task attributes
      existingTask.task_description = task_description;
      existingTask.project_id = project_id;
      existingTask.status = status;
      existingTask.start_date = start_date;
      existingTask.end_date=end_date;
      existingTask.target_end_date=target_end_date;
      existingTask.cycle_time=cycle_time;
      existingTask.target_cycle_time=target_cycle_time;
      existingTask.priority=priority;
      existingTask.task_comments=task_comments;
      existingTask.updated_at = Sequelize.literal('CURRENT_TIMESTAMP'),
  
      // Save the changes to the database
      await existingTask.save();
  
      // Respond with the updated task
      return res.json(existingTask);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
  
}

module.exports = TaskController;