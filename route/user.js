const express = require('express');
const router = express.Router();


// Database Models Importing
const Article = require("../model/article/model");

// Home page route
router.get("/", (req, res, next) => {
  try {
    res.render("pages/home", { title: "Source Hub", description: "" });
  } catch (error) {
    res.status(500).send("Something went wrong from our end, please contact the administartor or developer :)");
  }
});

// Blog page route
router.get("/blogs", async (req, res, next) => {
  try {
    let blogs = await Article.find().lean();
    res.render("pages/blog", { title: "Blog / Source Hub", description: "", blogs });
  } catch (error) {
    res.status(500).send("Something went wrong from our end, please contact the administartor or developer :)");
  }
});

// Quote page rout
router.get("/quote", (req, res, next) => {
  try {
    res.render("pages/quote", { title: "Get a Quote", description: "" });
  } catch (error) {
    res.status(500).send("Something went wrong from our end, please contact the administartor or developer :)");
  }
});

module.exports = router;