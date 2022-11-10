const { Schema, model } = require('mongoose');

const reactionSchema = new Schema (
  {
    thoughtText: {
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