const Post = require("../../models/Post");
const Tag = require("../../models/Tag");

exports.fetchPost = async (postId, next) => {
  try {
    const post = await Post.findById(postId).select("-__v");
    return post;
  } catch (error) {
    next(error);
  }
};

exports.postsDelete = async (req, res, next) => {
  try {
    await Post.findByIdAndRemove({ _id: req.post.id }).select("-__v");
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.postsUpdate = async (req, res, next) => {
  try {
    await Post.findByIdAndUpdate(req.post.id, req.body).select("-__v");
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.postsGet = async (req, res, next) => {
  try {
    const posts = await Post.find().populate("tags author").select("-__v");
    res.json(posts);
  } catch (error) {
    next(error);
  }
};

exports.tagsGet = async (req, res, next) => {
  try {
    const tags = await Tag.find().populate("posts").select("-__v");
    res.json(tags);
  } catch (error) {
    next(error);
  }
};

exports.createTag = async (req, res, next) => {
  try {
    const tag = await Tag.create(req.body).select("-__v");
    return res.status(201).json(tag);
  } catch (error) {
    next(error);
  }
};

exports.tagAdd = async (req, res, next) => {
  try {
    const { tagId } = req.params;
    const tag = await Tag.findById(tagId).select("-__v");
    await Post.findByIdAndUpdate(req.post._id, {
      $push: { tags: tag._id },
    });
    await Tag.findByIdAndUpdate(tagId, {
      $push: { posts: req.post._id },
    });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};