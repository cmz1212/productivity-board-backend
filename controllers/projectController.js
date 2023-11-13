const Sequelize = require("sequelize");

class ProjectController {
  constructor(model, taskModel) {
    this.model = model;
    this.taskModel = taskModel;
  }

  // Retrieve all projects
  async getAll(req, res) {
    try {
      const { useremail } = req.headers;

      const output = await this.model.findAll({
        include: [
          {
            model: this.taskModel,
          },
        ],
        where: {
          auth_id: useremail,
        },
      });
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  }

  // Retrieve specific project
  async getOneProject(req, res) {
    try {
      const { projectId } = req.params;
      const { useremail } = req.headers;
      
      const OneProject = await this.model.findByPk(projectId, {
        include: [
          {
            model: this.taskModel,
          },
        ],
        where: {
          auth_id: useremail,
        },
      });
      return res.json(OneProject);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  }

  // Add a new project
  async postOneProject(req, res) {
    try {
      const { project_description, wip_limit, cycle_time_limit, project_comments, auth_id } = req.body;

      const newProject = await this.model.create({
        project_description,
        wip_limit,
        cycle_time_limit,
        project_comments,
        auth_id,
        created_at: Sequelize.literal("CURRENT_TIMESTAMP"),
        updated_at: Sequelize.literal("CURRENT_TIMESTAMP"),
      });

      // Respond with new project
      return res.json(newProject);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  }

  // Update a specific project
  async putOneProject(req, res) {
    try {
      const { projectId } = req.params;
      const { project_description, wip_limit, cycle_time_limit, project_comments } = req.body;

      // Find the existing project by ID
      const existingProject = await this.model.findByPk(projectId);

      if (!existingProject) {
        return res.status(404).json({ error: true, msg: "Project not found." });
      }

      // Update project attributes
      if (project_description) {
        existingProject.project_description = project_description;
      }
      if (wip_limit) {
        existingProject.wip_limit = wip_limit;
      }
      if (cycle_time_limit) {
        existingProject.cycle_time_limit = cycle_time_limit;
      }
      if (project_comments) {
        existingProject.project_comments = project_comments;
      }

      existingProject.updated_at = Sequelize.literal("CURRENT_TIMESTAMP");

      // Save the changes to the database
      await existingProject.save();

      // Respond with the updated project
      return res.json(existingProject);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  }

  // Delete a specific project
  async deleteOneProject(req, res) {
    try {
      const { projectId } = req.params;

      // Find the existing project by ID
      const existingProject = await this.model.findByPk(projectId);

      if (!existingProject) {
        return res.status(404).json({ error: true, msg: 'Project not found.' });
      }

      // Delete the project from the database
      await existingProject.destroy();

      // Respond with a success message
      return res.json({ success: true, msg: 'Project deleted successfully.' });
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

}

module.exports = ProjectController;