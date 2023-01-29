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
  

  //update user

  //delete user


  // add friend


  // delete friend




  //extra credit: remove associated thoughts when user is deleted