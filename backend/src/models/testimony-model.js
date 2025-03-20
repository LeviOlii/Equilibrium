const mongoose = require("mongoose");

const TestimonySchema = new mongoose.Schema({
    name: { type: String, default: "Anônimo" },
    role: { type: String, default: "Usuário" },
    testimony: { type: String, required: true }
});

module.exports = mongoose.model("Testimony", TestimonySchema);
