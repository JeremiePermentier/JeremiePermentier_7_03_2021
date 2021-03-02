const router = require("express").Router();
const userCtrl = require("../controllers/userCtrl");
const dataUser = require("../middleware/dataUser");

router.post("/signup", dataUser.valid,userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/profil/:id", userCtrl.getUser);
router.put("/profil/:id", userCtrl.updateUser);
router.delete("/profil/:id", userCtrl.deleteUser);

module.exports = router;