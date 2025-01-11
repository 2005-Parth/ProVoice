const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firebaseId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minLength: 3,
    },
    userName:{
      type: String,
      required: true,
      unique: true,
      trim: true,
      minLength: 3
    },
    name: {
      type: String,
      required: true,
      unique: false,
      trim: true,
      minLength: 3,
    },
    designation: {
      type: String,
      required: true,
      unique: false,
      trim: true,
      minLength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minLength: 3,
    },
    tagLine: {
      type: String,
      required: true,
      unique: false,
      trim: true,
      minLength: 3,
    },
    profilePic: {
      type: String,
      required: true,
      unique: false,
      trim: true,
      minLength: 3,
    },
    bio: {
      type: String,
      required: true,
      unique: false,
      trim: true,
      minLength: 3,
    },
    location: {
      type: String,
      required: true,
      unique: false,
      trim: true,
      minLength: 3,
    },
    currentFocus: {
      type: String,
      required: true,
      unique: false,
      trim: true,
      minLength: 3,
    },
    goals: {
      type: String,
      required: true,
      unique: false,
      trim: true,
      minLength: 3,
    },
    dob: {
      type: Date,
      required: true,
      unique: false,
      trim: true,
      minLength: 3,
    },
    joinedOn: {
      type: Date,
      required: true,
      unique: false,
      trim: true,
      minLength: 3,
    },
    lastActive: {
      type: Date,
      required: true,
      unique: false,
      trim: true,
      minLength: 3,
    },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    achievements: [
      {
        type: Schema.Types.ObjectId,
        ref: "Achievement",
      },
    ],
    connections: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema);
module.exports = User;