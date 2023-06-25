const express = require("express");
const router = express.Router();
const {
  fetchPost,
  postsGet,
  postsUpdate,
  postsDelete,
  tagAdd,
  createTag,
  tagsGet,
} = require("./posts.controllers");

router.param("postId", async (req, res, next, postId) => {
  const post = await fetchPost(postId, next);
  if (post) {
    req.post = post;
    next();
  } else {
    const err = new Error("Post Not Found");
    err.status = 404;
    next(err);
  }
});

router.get("/", postsGet);

router.get("/tags", tagsGet);

router.post("/add-tag", createTag);

router.delete("/:postId", postsDelete);

router.put("/:postId", postsUpdate);

router.post("/:postId/:tagId", tagAdd);

module.exports = router;