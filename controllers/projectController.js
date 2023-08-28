class ProjectController {
  constructor(model, taskModel) {
    this.model = model;
    this.taskModel = taskModel;
  }

  // Retrieve all projects
  async getAll(req, res) {
    try {
      const output = await this.model.findAll({
        include: [
          {
            model: this.taskModel
          },
        ],
      });
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
  
  // Retrieve specific project
  async getOneProject(req, res) {
    const { projectId } = req.params;
    try {
      const OneProject = await this.model.findByPk(projectId, {
        include: [
          {
            model: this.taskModel
          },
        ]
      });
      return res.json(OneProject);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // Add a new project
  async postOneProject(req, res) {
    try {
      // Get the input data from the request body
      const { project_description, wip_limit, cycle_time_limit, project_comments } = req.body;

      const newProject = await this.model.create({
        project_description,
        wip_limit,
        cycle_time_limit,
        project_comments,
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
      });

      // Respond with new project
      return res.json(newProject);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // Update a specific project
  async putOneProject(req, res) {
    try {
      const { projectId } = req.params;
  
      // Get the updated data from the request body
      const { project_description, wip_limit, cycle_time_limit, project_comments } = req.body;
  
      // Find the existing project by ID
      const existingProject = await this.model.findByPk(projectId);
  
      if (!existingProject) {
        return res.status(404).json({ error: true, msg: 'Project not found.' });
      }
  
      // Update project attributes
      existingProject.project_description = project_description;
      existingProject.wip_limit = wip_limit;
      existingProject.cycle_time_limit = cycle_time_limit;
      existingProject.project_comments = project_comments;
      existingProject.updated_at = Sequelize.literal('CURRENT_TIMESTAMP'),
  
      // Save the changes to the database
      await existingProject.save();
  
      // Respond with the updated project
      return res.json(existingProject);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
  
}

module.exports = ProjectController;