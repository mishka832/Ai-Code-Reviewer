const express = require("express");
const router = express.Router();
const { reviewCode } = require("../controllers/reviewcontroller.js");
router.post("/review", reviewCode);

module.exports = router;
