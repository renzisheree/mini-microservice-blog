const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const posts = {};
app.use(cors());
app.use(bodyParser.json());

app.get("/posts", (req, res) => {
  res.send(posts);
});
app.post("/events", (req, res) => {
  const { type, data } = req.body;

  if (type === "PostCreated") {
    const { id, title } = data;

    posts[id] = { id, title, comments: [] };
  }
  if (type === "CommentCreated") {
    const { id, content, postId } = data;
    const post = posts[postId];
    post.comments.push({ id, content });
  }
  res.send({});
  console.log(posts);
});

app.listen(4002, () => {
  console.log("Listening to port 4002");
});
