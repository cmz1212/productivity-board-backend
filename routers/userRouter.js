class userRouter {
  constructor(express,controller,checkJwt) {
    this.express = express;
    this.controller = controller;
    this.checkJwt = checkJwt;
  }
  routes() {
    const router = this.express.Router();
    router.get("/", this.checkJwt, this.controller.getAll.bind(this.controller));
    router.get("/:userId", this.checkJwt, this.controller.getOneUser.bind(this.controller));
    router.post("/", this.checkJwt, this.controller.postOneUser.bind(this.controller));
    router.put("/:userId", this.checkJwt, this.controller.putOneUser.bind(this.controller));
    router.delete("/:userId", this.checkJwt, this.controller.deleteOneUser.bind(this.controller));
    router.post("/linkUserToTask/:userId", this.checkJwt, this.controller.linkUserToTask.bind(this.controller));
    router.delete("/unlinkUserFromTask/:userId", this.checkJwt, this.controller.unlinkUserFromTask.bind(this.controller));
    return router;
  }
}

module.exports = userRouter;