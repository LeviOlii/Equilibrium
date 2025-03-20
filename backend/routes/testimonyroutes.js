const express = require("express");
const router = express.Router();
const { getAllTestimonies, createTestimony } = require("../controllers/testimonyController");

router.get("/", getAllTestimonies);
router.post("/", createTestimony);

module.exports = router;
