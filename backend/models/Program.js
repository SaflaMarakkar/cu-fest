const mongoose = require("mongoose");

const programSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
});

const Program = mongoose.model("Program", programSchema);

module.exports = Program; // ✅ CommonJS Export
