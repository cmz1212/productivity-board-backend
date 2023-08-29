const express = require("express");
const router = express.Router();

class userRouter {
  constructor(controller) {
    this.controller = controller;
  }
  routes() {
    // we will insert routes into here later on
    router.get("/", this.controller.getAll.bind(this.controller));
    router.get("/:userId", this.controller.getOneUser.bind(this.controller));
    router.post("/", this.controller.postOneUser.bind(this.controller));
    router.put("/:userId", this.controller.putOneUser.bind(this.controller));
    router.delete("/:userId", this.controller.deleteOneUser.bind(this.controller));
    return router;
  }
}

module.exports = userRouter;