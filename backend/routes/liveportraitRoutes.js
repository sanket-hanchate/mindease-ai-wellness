const express = require("express");
const router = express.Router();
const { generateKeyframes } = require("../controllers/liveportraitController");
const authMiddleware = require("../middleware/authMiddleware");

// Secure the route with the existing JWT authMiddleware
router.post("/animate", authMiddleware, generateKeyframes);

module.exports = router;
