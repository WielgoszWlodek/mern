const express = require("express");
const routeruser = express.Router();
const User = require("../model/User");
const usersController = require("../controllers/users-controller");



routeruser.get("/find/countByUsers", usersController.countByUsers);
routeruser.get("/search", usersController.searchUser);
routeruser.get("/nrkarty", usersController.searchUser1);
routeruser.get("/timeline/:id", usersController.takeReaders);
routeruser.get("/", usersController.getAllUsers);
routeruser.post("/", usersController.addUser);
routeruser.get("/:id", usersController.getById);
routeruser.put("/:id", usersController.updateUser);
routeruser.delete("/:id", usersController.deleteUser);
routeruser.get("/find/countByCategory", usersController.countByCategory);
routeruser.get("/find/countByAuthor", usersController.countByAuthor);
routeruser.get("/find/findUsers", usersController.findUsers);


module.exports = routeruser;



