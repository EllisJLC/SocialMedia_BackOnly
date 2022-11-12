const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
  getThoughts(req,res) {
    Thought.find()
    .then ((thoughts) => res.status(200).json(thoughts))
    .catch ((e) => res.status(500).json(e))
  },
  getOneThought(req,res) { // GET one user
    Thought.findOne({_id: req.params.userId})
    .selecet('-__v')
    .then((thought) => 
      !thought 
        ? res.status(404).json({message:'No thought with that id'})
        : res.status(200).json(thought)
    )
    .catch((e)=>res.status(500).json(e))
  },
  createThought(req,res) { // POST new thought
    Thought.create(req.body) // create new thought given request body, need text, username, and userId.
    .then((thought) => User.findOneAndUpdate(
      {_id: req.body.userId},
      {$push: {thoughts:thought._id}},
      {new: true}
    ))
    .then((thought) => res.status(200).json(thought))
    .catch((e) => {
      return res.status(500).json(e);
    });
  },
  updateThought(req,res) { // Update a thought
    Thought.findByIdAndUpdate(
      {_id: req.params.userId},
      {$set: req.body},
      {
        runValidators: true,
        new: true
      }
      .then ((thought) => 
      !thought
        ? res.status(404).json({ message: 'No thought with this id!' })
        : res.json(thought)
      )
      .catch ((e) => res.status(500).json(e))
    );
  },
  deleteThought (req,res) { // delete a thought
    Thought.findOneAndDelete({_id: req.params.userId})
    .then((thought) => 
      !thought
        ? res.status(404).json({message: "no user with that id."})
        : Thought.deleteMany({_id: {$in: user.thoughts}})
    )
    .then(() => res.json({message: 'User deleted.'}))
    .catch((e)=> res.status(500).json(e))
  }
}