const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PostsModel } = require("../models/Post.model");

const app = express();

const PostRouter = express.Router();
PostRouter.use(express.json());

//! Get the list of all the posts

PostRouter.get("/", async (req, res) => {
  try {
    //finding data fronm post Schema
    let posts = await PostsModel.find();
    console.log(posts);
    console.log(`Get your posts`);
    res.status(200).send(posts);
  } catch (error) {
    console.log({ error: error.message });
    res.status(404).send({ error: `error in getting the post data` });
  }
});

//! Get the list of all the posts by id

PostRouter.get("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    console.log(id);
    let posts = await PostsModel.findById();
    console.log(posts);
    console.log(`Get your own posts`);
    res.status(200).send(posts);
  } catch (error) {
    console.log({ error: error.message });
    res.status(404).send({ error: `error in getting the post data` });
  }
});

// user to create a new post.

PostRouter.post("/", async (req, res) => {
  try {
    let data = req.body;
    console.log(data);
    let posts = new PostsModel(data);
    await posts.save();
    console.log(posts);
    console.log(`Create your own posts`);
    res.status(201).send(posts);
  } catch (error) {
    console.log({ error: error.message });
    res.status(404).send({ error: `error in creating the post ` });
  }
});

// allow users to update the text or image of a specific post identified by its ID.

PostRouter.patch("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let data = req.body;
    console.log(data);
    console.log(id);
    let posts = await PostsModel.findByIdAndUpdate(id, data);
    console.log(posts);
    console.log(`Update your own posts`);
    res.status(204).send(posts);
  } catch (error) {
    console.log({ error: error.message });
    res.status(404).send({ error: `error in updating the post data` });
  }
});

// User able to delete a specific post identified by its ID.

PostRouter.get("/:id", async (req, res) => {
  try {
    let id = req.params.id;

    console.log(id);
    let posts = await PostsModel.findById(id);
    res.status(202).send(posts);
  } catch (error) {
    console.log({ error: error.message });
    res.status(404).send({ error: `error in deleting the post data` });
  }
});
PostRouter.delete("/:id", async (req, res) => {
  try {
    let id = req.params.id;

    console.log(id);
    let posts = await PostsModel.findByIdAndRemove(id);
    console.log(posts);
    console.log(`Delete your own posts`);
    res.status(202).send(posts);
  } catch (error) {
    console.log({ error: error.message });
    res.status(404).send({ error: `error in deleting the post data` });
  }
});

//  users to like a specific post identified by its ID.

// like a particular post
PostRouter.post('/:id/like', async (req, res) => {
    let id = req.params.id;
    let userId = req.body.userId;

    try {
        let post = await PostsModel.findById(id);
        post.likes.push(userId);
        await post.save();

        res.status(202).send("Post liked ")
    } catch (error) {
        res.status(404).send(error.message);
    }
})


// adding comments 
PostRouter.post('/:id/comment', async (req, res) => {
    let id = req.params.id;
    try {
        let post = await PostsModel.findById(id);
        post.comments.push(req.body);
        await post.save();

        res.status(202).send("comment added ")
    } catch (error) {
        res.status(404).send(error.message);
    }
})

//  users to comment on a specific post identified by its ID.




module.exports = {
  PostRouter,
};
