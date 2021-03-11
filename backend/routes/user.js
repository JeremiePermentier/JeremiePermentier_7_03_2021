const router = require("express").Router();
const userCtrl = require("../controllers/userCtrl");
const dataUser = require("../middleware/dataUser");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.post("/signup", dataUser.valid,userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/profil/:id", auth, userCtrl.getUser);
router.put("/profil/:id", auth, multer, userCtrl.updateUser);
router.delete("/profil/:id", auth, userCtrl.deleteUser);

module.exports = router;