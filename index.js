const express = require("express");

const app = express();

require("dotenv").config();

app.use(express.json());

const redis = require('./redis')

const deleteKeys = async (pattern) => {
  const keys = await redis.keys(`${pattern}::*`)
  console.log(keys)
  if (keys.length > 0) {
    redis.del(keys)
  }
}

app.get("/", (req, res) => {
  res.send("hi")
})

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
