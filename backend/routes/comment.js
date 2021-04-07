const router = require("express").Router();
const commentCtrl = require("../controllers/commentCtrl");
const auth = require("../middleware/auth");

router.get("/", auth, commentCtrl.getAllComments);
router.post("/:id", auth, commentCtrl.addComment);
router.put("/:id", auth, commentCtrl.updateComment);
router.delete("/:id", auth, commentCtrl.deleteComment);

module.exports = router;