const router = require("express").Router();
const messagesCtrl = require("../controllers/messageCtrl");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.get("/", messagesCtrl.getAllMessages);
router.get("/:id", messagesCtrl.getMessage);
router.post("/add", auth, multer, messagesCtrl.createMessage);
router.post("/:id/like", messagesCtrl.likeMessage);
router.post("/:id/comment", messagesCtrl.addComment);
router.put("/:id", multer, messagesCtrl.updateMessage);
router.put("/comment/:id", auth, messagesCtrl.updateComment);
router.delete("/comment/:id", messagesCtrl.deleteComment);
router.delete("/:id", multer, messagesCtrl.deleteMessage);

module.exports = router;