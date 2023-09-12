class projectRouter {
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
    router.get("/:projectId", this.controller.getOneProject.bind(this.controller));
    router.post("/", this.controller.postOneProject.bind(this.controller));
    router.put("/:projectId", this.controller.putOneProject.bind(this.controller));
    router.delete("/:projectId", this.controller.deleteOneProject.bind(this.controller));
    return router;
  }
}

module.exports = projectRouter;

