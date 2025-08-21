const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

router.post("/post", userController.createUser);
router.get("/getAll", userController.getAllUsers);
router.get("/get/:id", userController.getUserById);
router.patch("/update/:id", userController.updateUser);
router.delete("/delete/:id", userController.deleteUser);

module.exports = router;