const cors = require('cors');
const express = require('express');
const { auth } = require('express-oauth2-jwt-bearer');

require('dotenv').config();

const PORT = process.env.PORT;
const app = express();

const checkJwt = auth({
  audience: process.env.API_AUDIENCE,
  issuerBaseURL: process.env.API_ISSUERBASEURL,
  tokenSigningAlg: process.env.API_TOKEN_ALGORITHM
});

// importing Routers
const TaskRouter = require('./routers/taskRouter');
const ProjectRouter = require('./routers/projectRouter');
const UserRouter = require('./routers/userRouter');

// importing Controllers
const TaskController = require('./controllers/taskController');
const ProjectController = require('./controllers/projectController');
const UserController = require('./controllers/userController');


// importing DB
const db = require('./db/models/index');
const {task, project, user} = db;

// initializing Controllers -> note the lowercase for the first word
const taskController = new TaskController(task, project, user);
const projectController = new ProjectController(project, task);
const userController = new UserController(user, task);

// initializing Routers
const taskRouter = new TaskRouter(express, taskController, checkJwt).routes();
const projectRouter = new ProjectRouter(express, projectController, checkJwt).routes();
const userRouter = new UserRouter(express, userController, checkJwt).routes();


// Enable CORS access to this server
app.use(cors());

// Enable reading JSON request bodies
app.use(express.json());

// USING the routers
app.use('/task', taskRouter);
app.use('/project', projectRouter);
app.use('/user', userRouter);

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
