class projectRouter {
  constructor(express,controller,checkJwt) {
    this.express = express;
    this.controller = controller;
    this.checkJwt = checkJwt;
  }
  routes() {
    const router = this.express.Router();
    router.get("/", this.checkJwt, this.controller.getAll.bind(this.controller));
    router.get("/:projectId", this.checkJwt, this.controller.getOneProject.bind(this.controller));
    router.post("/", this.checkJwt, this.controller.postOneProject.bind(this.controller));
    router.put("/:projectId", this.checkJwt, this.controller.putOneProject.bind(this.controller));
    router.delete("/:projectId", this.checkJwt, this.controller.deleteOneProject.bind(this.controller));
    return router;
  }
}

module.exports = projectRouter;