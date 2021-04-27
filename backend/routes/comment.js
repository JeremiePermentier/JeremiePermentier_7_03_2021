const router = require("express").Router();
const commentCtrl = require("../controllers/commentCtrl");
const auth = require("../middleware/auth");

router.get("/", auth, commentCtrl.getAllComments);
router.get("/likecomment", auth, commentCtrl.getLike);
router.get("/dislikecomment", auth, commentCtrl.getDislike);
router.post("/:id", auth, commentCtrl.addComment);
router.post("/like/:id", auth, commentCtrl.like);
router.post("/dislike/:id", auth, commentCtrl.dislike);
router.put("/:id", auth, commentCtrl.updateComment);
router.delete("/:id", auth, commentCtrl.deleteComment);

module.exports = router;