class taskRouter {
  constructor(express,controller,checkJwt) {
    this.express = express;
    this.controller = controller;
    this.checkJwt = checkJwt;
  }
  routes() {
    const router = this.express.Router();
    router.get("/", this.checkJwt, this.controller.getAll.bind(this.controller));
    router.get("/:taskId", this.checkJwt, this.controller.getOneTask.bind(this.controller));
    router.post("/", this.checkJwt, this.controller.postOneTask.bind(this.controller));
    router.put("/:taskId", this.checkJwt, this.controller.putOneTask.bind(this.controller));
    router.delete("/:taskId", this.checkJwt, this.controller.deleteOneTask.bind(this.controller));
    return router;
  }
}

module.exports = taskRouter;