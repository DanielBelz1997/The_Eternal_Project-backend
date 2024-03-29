const express = require("express");
const router = express.Router();
const usersController = require("../../controllers/usersController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");
const authController = require("../../controllers/authController");
const logoutController = require("../../controllers/logoutController");
const professinalController = require("../../controllers/professinalController");

router
  .route("/")
  .get(usersController.getAllUsers)
  .post(
    usersController.createNewUser,
    authController.handleLogin,
    logoutController.handleLogout,
    professinalController.handleProfessional
  )
  .put(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    usersController.updateUser
  )
  .delete(verifyRoles(ROLES_LIST.Admin), usersController.deleteUser);

router.route("/:id").get(usersController.getUser);

module.exports = router;

// MVC = module view controller structure
