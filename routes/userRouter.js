const express = require("express");
const { signup, login, authenticate, myProfile, logout } = require("../controllers/authController");
// const { getUser, getAllUser, updateUser, deleteUser } = require("../controllers/userController");

const router = express.Router();

router.route("/signup").post(signup);
router.route("/login").post(login);

router.use(authenticate);

router.route("/logout").post(logout);
router.route("/me").get(myProfile);

// postman only routes
// router.route("/").get(getAllUser);
// router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
