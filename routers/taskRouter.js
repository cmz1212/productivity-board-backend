class taskRouter {
  constructor(express,controller,checkJwt,checkAdminScopes,checkContentManagerScopes) {
    this.express = express;
    this.controller = controller;
    this.checkJwt = checkJwt;
    this.checkAdminScopes = checkAdminScopes;
    this.checkContentManagerScopes = checkContentManagerScopes;
  }
  routes() {
    const router = this.express.Router();
    router.get("/", this.controller.getAll.bind(this.controller));
    router.get("/:taskId", this.controller.getOneTask.bind(this.controller));
    router.post("/", this.controller.postOneTask.bind(this.controller));
    router.put("/:taskId", this.controller.putOneTask.bind(this.controller));
    router.delete("/:taskId", this.controller.deleteOneTask.bind(this.controller));
    return router;
  }
}

module.exports = taskRouter;