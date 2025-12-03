const router = require("express").Router();
const usersController = require("@controller/users");
const verifyJWT = require("@middleware/verifyJWT");


router.get("/me", verifyJWT, usersController.getUser);
router.get("/:id", verifyJWT, usersController.getUserById);
router.delete("/me", verifyJWT, usersController.deleteUser);


module.exports = router;
