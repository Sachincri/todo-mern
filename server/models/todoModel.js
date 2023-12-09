import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },

  description: {
    type: String,
    required: true,
    maxLength: [250, "Maximum 250 characters only"],
  },

  status: {
    type: String,
    enum: ["active", "completed"],
    default: "active",
  },

  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Todo = mongoose.model("Todo", todoSchema);
