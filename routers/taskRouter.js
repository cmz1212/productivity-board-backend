const express = require("express");
const router = express.Router();

class taskRouter {
  constructor(controller) {
    this.controller = controller;
  }
  routes() {
    // we will insert routes into here later on
    router.get("/", this.controller.getAll.bind(this.controller));
    router.get("/:taskId", this.controller.getOneTask.bind(this.controller));
    router.post("/", this.controller.postOneTask.bind(this.controller));
    router.put("/:taskId", this.controller.putOneTask.bind(this.controller));
    return router;
  }
}

module.exports = taskRouter;