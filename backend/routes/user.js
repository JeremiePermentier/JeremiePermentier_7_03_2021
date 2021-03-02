const router = require("express").Router();
const userCtrl = require("../controllers/userCtrl");
const dataUser = require("../middleware/dataUser");

router.post("/signup", dataUser.valid,userCtrl.signup);
router.post("/login", userCtrl.login);

module.exports = router;