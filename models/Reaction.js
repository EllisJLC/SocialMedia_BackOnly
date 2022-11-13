const { Schema, model } = require('mongoose');

const reactionSchema = new Schema (
  {
    reaction: {
      type: String,
      required: true,
      length: [1,280],
    },
    createdAt: {
      type: Date,
      default: Date.now,

    },
    username: {
      type: String,
      required: true,
    },
  }
)

module.exports = reactionSchema;