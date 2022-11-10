const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
  getUsers(req,res) {
    User.find()
    .then((users) => res.json(users))
    .catch((e) => res.status(500).json(e))
  },
  getOneUser(req,res) {
    User.findOne({_id: req.params.userId})
    .selecet('-__v')
    .then((user) => 
      !user 
        ? res.status(404).json({message:'No user with that id'})
        : res.json(user)
    )
    .catch((e)=>res.status(500).json(e))
  },
  createUser(req,res) {
    User.create(req.body) // create new user given request body, need email and username
    .then((user) => res.json(user))
    .catch((e) => {
      console.log(e);
      return res.status(500).json(e);
    })
  },
  deleteUser(req,res){
    User.findOneAndDelete({_id: req.params.userId})
    .then((user) => 
      !user
        ? res.status(404).json({message: "no user with that id."})
        : Thought.deleteMany({_id: {$in: user.thoughts}})
    )
    .then(() => res.json({message: 'User deleted.'}))
    .catch((e)=> res.status(500).json(e))
  },
  updateUser(req,res) {
    User.findOneAndUpdate(
      {_id: req.params.userId},
      {$set: req.body},
      {
        runValidators: true,
        new: true
      }
    )
    .then ((user) => 
    !user
      ? res.status(404).json({ message: 'No user with this id!' })
      : res.json(user)
    )
    .catch ((e) => res.status(500).json(e));
  },
};