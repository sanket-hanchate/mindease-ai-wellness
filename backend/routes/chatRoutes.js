const express = require("express");

const router = express.Router();

const {
  sendMessage,
  getChatHistory,
  getConversationMessages
} = require("../controllers/chatController");

const authMiddleware =
  require("../middleware/authMiddleware");

router.post(
  "/",
  authMiddleware,
  sendMessage
);

router.get(
  "/history",
  authMiddleware,
  getChatHistory
);

router.get(
  "/history/:id",
  authMiddleware,
  getConversationMessages
);

router.get(
  "/conversation/:id",
  authMiddleware,
  getConversationMessages
);

module.exports = router;