const { request } = require("express");
const Author = require("../../models/Author");
const Post = require("../../models/Post");

exports.fetchAuthor = async (authorId, next) => {
  try {
    const author = await Author.findById(authorId).select("-__v");
    return author;
  } catch (error) {
    next(error);
  }
};

exports.authorCreate = async (req, res, next) => {
  try {
    const newAuthor = await Author.create(req.body).select("-__v");
    res.status(201).json(newAuthor);
  } catch (error) {
    next(error);
  }
};

exports.postsCreate = async (req, res, next) => {
  try {
    req.body.authorId = req.author._id;
    const newPost = await Post.create(req.body).select("-__v");
    await Author.findByIdAndUpdate(req.author._id, {
      $push: { posts: newPost._id },
    }).select("-__v");
    res.status(201).json(newPost);
  } catch (error) {
    next(error);
  }
};

exports.authorDelete = async (req, res, next) => {
  try {
    await Author.findByIdAndRemove({ _id: req.author._id }).select("-__v");
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.authorUpdate = async (req, res, next) => {
  try {
    await Author.findByIdAndUpdate(req.author.id, req.body).select("-__v");
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.authorGet = async (req, res, next) => {
  try {
    const authors = await Author.find().populate("posts").select("-__v");
    res.json(authors);
  } catch (error) {
    next(error);
  }
};