const express = require("express");
const app = express();

require("dotenv").config();

app.get("/", (req, res) => {
  res.send("It works!");
});

app.listen(process.env.PORT, () => {
  console.log("Server listening on port", process.env.PORT);
});
