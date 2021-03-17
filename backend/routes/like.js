const router = require("express").Router();
const likeCtrl = require("../controllers/likeCtrl");
const auth = require("../middleware/auth");

router.post("/:id", auth, likeCtrl.likeMessage);

module.exports = router;