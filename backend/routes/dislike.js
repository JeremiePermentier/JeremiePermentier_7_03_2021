const router = require("express").Router();
const dislikeCtrl = require("../controllers/dislikesCtrl")
const auth = require("../middleware/auth");

router.post("/:id", auth, dislikeCtrl.dislikeMessage);

module.exports = router;