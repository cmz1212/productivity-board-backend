const express = require("express");
const router = express.Router();

class projectRouter {
  constructor(controller) {
    this.controller = controller;
  }
  routes() {
    // we will insert routes into here later on
    router.get("/", this.controller.getAll.bind(this.controller));
    router.get("/:projectId", this.controller.getOneProject.bind(this.controller));
    router.post("/", this.controller.postOneProject.bind(this.controller));
    router.put("/:projectId", this.controller.putOneProject.bind(this.controller));
    router.delete("/:projectId", this.controller.deleteOneProject.bind(this.controller));
    return router;
  }
}

module.exports = projectRouter;