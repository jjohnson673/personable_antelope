const { User, Thought } = require("../models");

module.exports = {
  //Get all users
  getUser(req, res) {
    User.find({})
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  //get individual user
  getIndvUser(req, res) {
    User.findOne({ _id: req.params.userID })
      .populate("thoughts")
      .populate("friends")
      .select("-__v")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found associated with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  //create user 
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  //update user
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userID },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found associated with this ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  //delete user


  // add friend


  // delete friend




  //extra credit: remove associated thoughts when user is deleted