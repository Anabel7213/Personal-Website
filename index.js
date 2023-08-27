require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/stylesheets"));
app.use(express.static(__dirname + "/js"));

const DB = process.env.DB
mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((err) => {
    if (err) throw err;
  });

const { homeRouter, blogRouter, hireRouter, editorRouter, idRouter } = {
  homeRouter: require(__dirname + "/js/routes.js"),
  blogRouter: require(__dirname + "/js/routes.js"),
  hireRouter: require(__dirname + "/js/routes.js"),
  editorRouter: require(__dirname + "/js/routes.js"),
  idRouter: require(__dirname + "/js/routes.js"),
};
app.use("/", homeRouter);
app.use("/blog", blogRouter);
app.use("/hire", hireRouter);
app.use("/editor", editorRouter);
app.use("posts/:postName", idRouter);

app.listen(process.env.PORT || 3000);
