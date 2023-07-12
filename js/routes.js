const express = require("express");
const router = express.Router();
const controllers = require(__dirname + "/controllers.js");
const {
  subscribeMember,
  getLatestPosts,
  getAllPosts,
  getPostById,
  createPost,
} = controllers;

router.route("/").get(getLatestPosts).post(subscribeMember);
router.route("/blog").get(getAllPosts).post(subscribeMember);
router.route("/hire").get((req, res) => {res.render("hire")});
router.route("/posts/:postName").get(getPostById);
router.route("/editor").get((req, res) => {res.render("editor")}).post(createPost);

module.exports = router;