const router = require("express").Router();
const messagesCtrl = require("../controllers/messageCtrl");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.get("/", auth, multer, messagesCtrl.getAllMessages);
router.get("/:id", auth, multer, messagesCtrl.getMessage);
router.post("/add", auth, multer, messagesCtrl.createMessage);
router.put("/:id", auth, multer, messagesCtrl.updateMessage);
router.delete("/:id", auth, multer, messagesCtrl.deleteMessage);

module.exports = router;