const express = require("express");
require("dotenv").config();
var cors = require('cors')
const app = express();



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// Connect to MongoDB
const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI) 
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

app.listen(3001, () => console.log("Server ready on port 3001."));

module.exports = app;