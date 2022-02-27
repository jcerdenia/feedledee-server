const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/user");

require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/user", userRoutes);

app.get("/", (_req, res) => {
  res.send("It works!");
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}.`);
});

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB!");
});

mongoose.connect(process.env.DB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
