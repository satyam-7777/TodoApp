const express = require("express");
const { getAllTasks, createTask, updateTask, deleteTask, getTask } = require("../controllers/taskController");
const { authenticate } = require("../controllers/authController");

const Router = express.Router();

Router.use(authenticate);

// Router.route("/").get().post().patch().delete();
Router.route("/").get(getAllTasks).post(createTask);
Router.route("/:id").get(getTask).patch(updateTask).delete(deleteTask);

module.exports = Router;
