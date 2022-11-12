const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
  getThoughts(req,res) {
    Thought.find()
    .then ((thoughts) => res.status(200).json(thoughts))
    .catch ((e) => res.status(500).json(e))
  },
  getOneThought(req,res) { // GET one user
    Thought.findOne({_id: req.params.thoughtId})
    .select('-__v')
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
  updateThought(req,res) { // PUT update a thought
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
  deleteThought (req,res) { // DELETE a thought
    Thought.findById({_id: req.params.thoughtId})
    .then((thought) => {
      User.findByIdAndUpdate(
        {_id: thought.userId},
        {$pull: {thoughts: req.params.thoughtId}},
        {new: true}
      )
    })
    .then (() => Thought.findOneAndDelete({_id: req.params.thoughtId}))
    .then((thought) => 
      !thought
        ? res.status(404).json({message: "no thought with that id."})
        : res.json({message: 'Thought deleted.'}))
    .catch((e) => res.status(500).json(e))
  },
  addReaction (req,res) { // POST new reaction into thought, given reaction in object
    Thought.findOneAndUpdate(
      {id: req.params.thoughtId},
      {$push: {reactions: req.body.reaction}},
      {runValidators:true, new:true}
    )
    .then((thought) => 
      !thought
        ? res.status(404).json({message: "No thought of that id"})
        : res.status(200).json(thought)
    )
    .catch((e) => res.status(500).json(e))
  },
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      {_id: req.params.thoughtId},
      {$pull: {friends: req.params.reactionId}},
      {runValidators: true, new: true}
    )
    .then((thought) => 
      !thought
        ? res.status(404).json({message: "No user of that id"})
        : res.status(200).json(thought)
    )
    .catch((e) => res.status(500).json(e))
  }
}