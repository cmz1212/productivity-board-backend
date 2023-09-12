class userRouter {
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
    router.get("/:userId", this.controller.getOneUser.bind(this.controller));
    router.post("/", this.controller.postOneUser.bind(this.controller));
    router.put("/:userId", this.controller.putOneUser.bind(this.controller));
    router.delete("/:userId", this.controller.deleteOneUser.bind(this.controller));
    return router;
  }
}

module.exports = userRouter;