const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 5000;
const mongoString = process.env.DATABASE_URL;

const app = express();
app.use(express.json());
app.use(cors());

app.use("/users", require("./routes/userRoutes"));

mongoose.connect(mongoString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() =>
    console.log("✅ Connected to MongoDB")
).catch(err =>
    console.error("❌ MongoDB connection error:", err)
);

app.listen(PORT, () => console.log(`🚀 Server is running on http://localhost:${PORT}`));