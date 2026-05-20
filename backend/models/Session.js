const mongoose = require("mongoose");
const { Schema } = mongoose;

const SessionSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
    required: true,
  },
  startTime: {
    type: Date,
    default: Date.now(),
  },
  endTime: {
    type: Date,
    default: null,
  },
});

const Session = mongoose.model("Session", SessionSchema);
module.exports = Session;
