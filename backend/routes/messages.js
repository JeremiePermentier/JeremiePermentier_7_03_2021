const router = require("express").Router();
const messagesCtrl = require("../controllers/messageCtrl");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.get("/", auth, messagesCtrl.getAllPost);
router.get("/:id", auth, messagesCtrl.getPost);
router.post("/add", auth, multer, messagesCtrl.createMessage);
router.post("/:id/like", auth, messagesCtrl.likeMessage);
router.post("/:id/comment", auth, messagesCtrl.addComment);
router.put("/:id", auth, multer, messagesCtrl.updateMessage);
router.put("/comment/:id", auth, messagesCtrl.updateMessage);
router.delete("/comment/:id", auth, messagesCtrl.deleteComment);
router.delete("/:id", auth, multer, messagesCtrl.deleteMessage);

module.exports = router;