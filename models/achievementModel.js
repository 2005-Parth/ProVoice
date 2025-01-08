const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const achievementSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: false,
      trim: true,
      minLength: 3,
    },
    description: {
      type: String,
      required: true,
      unique: false,
      trim: true,
      minLength: 3,
    },
    date: {
      type: Date,
      required: true,
      unique: false,
      trim: true,
      minLength: 3,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Achievement = mongoose.model("Achievement", achievementSchema);
module.exports = Achievement;
