const express = require("express");
const app = express();
const dbConnection = require("./db");
dbConnection();
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.listen(5000, () => {
  console.log("Server is listening on port 5200.");
});

app.use("/api/auth", authRoutes);

module.exports = app;
