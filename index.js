const cors = require('cors')
const express = require('express')
require('dotenv').config()

// importing Routers
const TaskRouter = require('./routers/taskRouter')
const ProjectRouter = require('./routers/projectRouter')
const UserRouter = require('./routers/userRouter')

// importing Controllers
const TaskController = require('./controllers/taskController')
const ProjectController = require('./controllers/projectController')
const UserController = require('./controllers/userController')



// importing DB
const db = require('./db/models/index')
const {task, project, user} = db

// initializing Controllers -> note the lowercase for the first word
const taskController = new TaskController(task, project, user)
const projectController = new ProjectController(project, task)
const userController = new UserController(user, task)

// inittializing Routers
const taskRouter = new TaskRouter(taskController).routes()
const projectRouter = new ProjectRouter(projectController).routes()
const userRouter = new UserRouter(userController).routes()



const PORT = process.env.PORT;
const app = express();

// Enable CORS access to this server
app.use(cors());

// Enable reading JSON request bodies
app.use(express.json());

// USING the routers
app.use('/task', taskRouter)
app.use('/project', projectRouter)
app.use('/user', userRouter)

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
