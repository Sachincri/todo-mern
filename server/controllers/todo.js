import { Todo } from "../models/todoModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";

export const createTask = catchAsyncErrors(async (req, res, next) => {
  const { title, description } = req.body;

  if (!title) {
    return next(new ErrorHandler("Please enter title ", 400));
  }
  const user = req.user._id; 

  const option = { title, description, user };

  await Todo.create(option);

  res.status(201).json({
    success: true,
    message: "Todo created successfully",
  });
});

export const getTask = catchAsyncErrors(async (req, res, next) => {
  const { keyword, status, page = 1, limit = 5 } = req.query;

  let query = {};

  if (keyword) {
    query.title = { $regex: keyword, $options: "i" };
  }

  if (status) {
    query.status = status;
  }

  const options = {
    skip: (page - 1) * limit,
    limit: parseInt(limit),
  };

  const todos = await Todo.find({
    $or: [{ $and: [query, options] }, { user: req.user._id }],
  });

  res.status(200).json({
    success: true,
    todos,
  });
});

export const taskDetails = catchAsyncErrors(async (req, res, next) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) return next(new ErrorHandler("Todo not found", 401));

  res.status(200).json({
    success: true,
    todo,
  });
});
export const changeStatus = catchAsyncErrors(async (req, res, next) => {
  const task = await Todo.findById(req.params.id);

  if (!task) return next(new ErrorHandler("Todo not found", 401));

  if (task.status === "active") task.status = "completed";
  else task.status = "active";

  await task.save();

  res.status(200).json({
    success: true,
    message: "Change successfully",
  });
});

export const editTask = catchAsyncErrors(async (req, res, next) => {
  const { title, description } = req.body;

  let todo = await Todo.findById(req.params.id);

  todo = await Todo.findByIdAndUpdate(
    req.params.id,
    { title, description },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    message: "Todo updated successfully",
  });
});

export const deleteTask = catchAsyncErrors(async (req, res, next) => {
  const todoIds = (req.params.id || "").split(",");

  if (!todoIds.length) {
    return next(new ErrorHandler("Invalid or missing todo IDs", 400));
  }

  await Todo.deleteMany({ _id: { $in: todoIds } });

  res.status(200).json({
    success: true,
    message: "Todos Deleted Successfully",
  });
});
