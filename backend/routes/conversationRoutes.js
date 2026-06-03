const express = require("express");

const router =
express.Router();

const authMiddleware =
require("../middleware/authMiddleware");

const {
  createConversation,
  getConversations,
  deleteConversation,
} =
require("../controllers/conversationController");

router.post(
  "/",
  authMiddleware,
  createConversation
);

router.get(
  "/",
  authMiddleware,
  getConversations
);

router.delete(
  "/:id",
  authMiddleware,
  deleteConversation
);

module.exports = router;