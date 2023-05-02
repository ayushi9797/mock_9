const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/User.Model");
const app = express();

const UserRouter = express.Router();
UserRouter.use(express.json());

//! MAKING REGISTERED Users ROUTE

UserRouter.post("/register", async (req, res) => {
  // taking user data from User model
  const { name, email, password, dob, bio, posts, friends, friendRequests } =
    req.body;
  console.log(req.body);
  try {
    // create validation for user data
    let user = await UserModel.find({ email });

    // if user already registered
    if (user.length > 0) {
      res.send(`User already registered here `);
    } else {
      try {
        // hashing the password
        bcrypt.hash(password, 4, async function (err, hash) {
          const user = new UserModel({
            name,
            email: email,
            password: hash,
            dob,
            bio,
            posts,
            friends,
            friendRequests,
          });

          // save user data in database
          console.log(user);
          await user.save();

          // sending  confirm request  for registration
          res
            .status(201)
            .send({ message: `User Registered here successfully` });
        });
      } catch (error) {
        console.log(error.message);
        res.status(404).send({ error: `error in registration` });
      }
    }
  } catch (error) {
    res.status(404).send({ error: `error in registration` });
  }
});

//! Get list of all registered users.

UserRouter.get("/users", async (req, res) => {
  try {
    // finding users from models
    let data = await UserModel.find();
    console.log(data);

    // getting registered users data

    console.log(`Get your details`);
    res.status(200).send(data);
  } catch (error) {
    res.status(404).send({ error: `error in getting the users data` });
  }
});

//! Users allows  to send a friend request to another user identified by its ID.
// sending a friend request
UserRouter.post("/:id/friends", async (req, res) => {
  // User's id
  let id = req.params.id;
  console.log(id);

  // Friend's id
  let friendid = req.body.userid;
  console.log(friendid);
  try {
    let users = await UserModel.findById(id);
    users.friendRequests.push(friendid);
    console.log(users);
    // save request in database
    await users.save();
    res.status(201).send({ message: `friend request sent successfully` });
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

//! GET list of all friends of a specific user identified by its ID.

UserRouter.get("/:id/friends", async (req, res) => {
  // Show the friend requests by id
  const id = req.params.id;
  console.log(id);
  try {
    const user = await UserModel.findById(id);

    const friend = user.friends;
    console.log(friend);
    res.status(200).send(user);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});


//!  users to accept or reject friend requests sent to them by another user identified by its ID.

// Accept or Reject the friend requests

UserRouter.patch("/:id/friends/:friendId", async (req, res) => {
  // User's id
  let id = req.params.id;
  console.log(id);

  // Friend's id
  let friendid = req.body.userid;
  console.log(friendid);
  try {
    //  matching users'id
    let users = await UserModel.findById(id);
    console.log(users);
    if (users.friendRequests.includes(friendid)) {
      // users  to friend request
      users.friends.push(friendid);
    } else {
      res.send({ message: `There is no request to ${friendid}` });
    }
    console.log(users);
    // saving friend data
    await users.save();
    res
      .status(201)
      .send({ message: `friend request sent updated successfully` });
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

module.exports = {
  UserRouter,
};
