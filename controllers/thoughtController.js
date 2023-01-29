const { User, Thought } = require("../models");


module.exports = {
    // Get all thoughts
    getThought(req, res) {
        Thought.find({})
          .then((thought) => res.json(thought))
          .catch((err) => res.status(500).json(err));
      },



      // get individual thought
      getIndvThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtID })
          .select("-__v")
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: "No thought found associated with this ID." })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
      },

      //create thought and push to associated user
      createThought(req, res) {
        Thought.create(req.body)
          .then(({ _id }) => {
            return User.findOneAndUpdate(
              { _id: req.body.userID },
              { $push: { thoughts: _id } },
              { new: true }
            );
          })
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: "No user found associated with this ID." })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
      },

      //update thought
      updateThought(req, res) {
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtID },
          { $set: req.body },
          { runValidators: true, New: true }
        )
          .then((user) =>
            !user
              ? res.status(404).json({ message: "No thought found associated with this ID." })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
      },

      //delete thought
      deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtID })
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: "No thought found associated with this ID." })
              : User.findOneAndUpdate(
                  { thoughts: req.params.thoughtID },
                  { $pull: { thoughts: req.params.thoughtID } },
                  { new: true }
                )
          )
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'Thought has been deleted, but no associated user has been found'})
              : res.json({ message: 'Thought has been deleted' })
          )
          .catch((err) => res.status(500).json(err));
      },

      //create reaciton


      //delete reaction

      