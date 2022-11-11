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
    .then((thought) => {
      res.status(200).json(thought)
    })
    .catch((e) => {
      return res.status(500).json(e);
    })
  },
}