const Sequelize = require('sequelize');

class UserController {
  constructor(model, taskModel) {
    this.model = model;
    this.taskModel = taskModel;
  }

  // Retrieve all users
  async getAll(req, res) {
    try {
      const output = await this.model.findAll(
        { include: [
            {
              model: this.taskModel,
              attributes: {
                exclude: ['createdAt', 'updatedAt'] // Exclude createdAt and updatedAt from the associated task
              }
            }
          ],
        }
      );
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
  
  // Retrieve specific user
  async getOneUser(req, res) {
    const { userId } = req.params;
    try {
      const OneUser = await this.model.findByPk(userId, {
        include: [
          {
            model: this.taskModel,
            attributes: {
              exclude: ['createdAt', 'updatedAt'] // Exclude the createdAt column from the associated task
            }
          }
        ]
      });
      return res.json(OneUser);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // Add a new user
  async postOneUser(req, res) {
    try {
      // Get the input data from the request body
      const { user_name, user_role, image_link, additional_info } = req.body;

      const newUser = await this.model.create({
        user_name,
        user_role,
        image_link,
        additional_info,
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
      });

      // Respond with new user
      return res.json(newUser);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // Update a specific user
  async putOneUser(req, res) {
    try {
      const { userId } = req.params;
  
      // Get the updated data from the request body
      const { user_name, user_role, image_link, additional_info } = req.body;
  
      // Find the existing user by ID
      const existingUser = await this.model.findByPk(userId);
  
      if (!existingUser) {
        return res.status(404).json({ error: true, msg: 'User not found.' });
      }
  
      // Update user attributes
      existingUser.user_name = user_name;
      existingUser.user_role = user_role;
      existingUser.image_link = image_link;
      existingUser.additional_info = additional_info;
      existingUser.updated_at = Sequelize.literal('CURRENT_TIMESTAMP'),
  
      // Save the changes to the database
      await existingUser.save();
  
      // Respond with the updated user
      return res.json(existingUser);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
  
}

module.exports = UserController;