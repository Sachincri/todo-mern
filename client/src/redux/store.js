import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducer/user";
import { todoReducer } from "./reducer/todo";

const store = configureStore({
  reducer: {
    user: userReducer,
    todos: todoReducer,
  },
});

export default store;

export const server = "https://todo-mern-flax.vercel.app/api/v1";
