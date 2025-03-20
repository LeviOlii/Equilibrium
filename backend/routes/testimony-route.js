const express = require("express");
const router = express.Router();
const { getAllTestimonies, createTestimony, deleteTestimony } = require("../controllers/testimonyController");

router.get("/", getAllTestimonies);
router.post("/", createTestimony);
router.delete("/:id", deleteTestimony);

module.exports = router;
