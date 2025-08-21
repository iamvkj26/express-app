const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use("/users", require("./routes/userRoutes"));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});