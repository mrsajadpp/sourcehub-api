const express = require('express');
const router = express.Router();

// Database Models Importing
const Article = require("../model/article/model");

// Blog reading page
router.get("/:slug", async (req, res, next) => {
    try {
        let blog = await Article.findOne({ slug: req.params.slug }).lean();
        if (!blog) return res.status(404).send("Oops, Blog not found!");
        res.render("pages/blog_read", { title: blog.title, description: blog.description, blog });
    } catch (error) {
        res.status(500).send("Something went wrong from our end, please contact the administartor or developer :)");
    }
});

module.exports = router; 