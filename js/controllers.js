require("dotenv").config();
const https = require("https");
const Post = require(__dirname + "/schema.js");

//---Mailchimp API---//
exports.subscribeMember = (req, res) => {
  const data = {
    members: [
      {
        email_address: req.body.email,
        status: "subscribed",
      },
    ],
  };
  const jsonData = JSON.stringify(data);
  const url = "https://us11.api.mailchimp.com/3.0/lists/44098ec761";
  const options = {
    method: "POST",
    auth: `anabel:${process.env.API_KEY}`,
  };

  const request = https.request(url, options, async (response) => {
    try {
      if (response.statusCode === 200) {
        res.status(200).json({
          success: true,
        });
      } else {
        console.log("Request Failed");
      }
      response.on("data", function (data) {
        console.log(JSON.parse(data));
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: "Failed",
      });
    }
  });

  request.write(jsonData);
  request.end();
};
//---End Mailchimp API---//

//---START BLOG FUNCTIONALITY---//
//---Get Latest Posts---//
exports.getLatestPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    const sortedPosts = posts.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    const latestPosts = sortedPosts.slice(0, 3);
    res.render("index", { latestPosts: latestPosts });
  } catch (err) {
    throw err;
  }
};

//---Get All Posts---//
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.render("blog", { posts: posts });
  } catch (err) {
    throw err;
  }
};

//---Get Post By Id---//
exports.getPostById = async (req, res) => {
  const requestedTitle = req.params.postName;
  try {
    const post = await Post.findOne({ title: requestedTitle });
    if (post) {
      res.render("article", {
        date: post.date,
        title: post.title,
        body: post.body,
        tags: post.tags,
      });
    } else {
      res.status(404).json({
        status: "Failed",
        message: "Post not found",
      });
    }
  } catch (err) {
    throw err;
  }
};

//---Format Date---//
formatDate = (selectedDate) => {
  let date = new Date(selectedDate);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};
//---End Format Date---//

//---Create New Post---//
exports.createPost = async (req, res) => {
  const post = new Post({
    date: formatDate(req.body.date),
    title: req.body.title,
    body: req.body.body,
    tags: req.body.tag,
  });
  try {
    await post.save();
    res.status(200).json({
      status: "Success",
      message: "Successfully Saved to DB",
    });
  } catch (err) {
    res.status(500).json({
      status: "Error",
      message: "Failed to save the post",
    });
  }
};
//---END BLOG FUNCTIONALITY---//