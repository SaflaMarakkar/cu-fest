const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: Number },
    roles: { type: [String], default: ["user"] },
    password: { type: String, required: true },
    registeredPrograms: [{ type: mongoose.Schema.Types.ObjectId, ref: "Program"  }],
    associatedPrograms: [{ type: mongoose.Schema.Types.ObjectId, ref: "Program" }]
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);