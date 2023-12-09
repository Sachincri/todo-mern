import { createReducer } from "@reduxjs/toolkit";

export const todoReducer = createReducer({ todos: [], todo: {} }, (builder) => {
  builder
    .addCase("getAllTodoRequest", (state) => {
      state.loading = true;
    })
    .addCase("updateTodoRequest", (state) => {
      state.loading = true;
    })
    .addCase("deleteTodoRequest", (state) => {
      state.loading = true;
    })
    .addCase("getTodoDetailsRequest", (state) => {
      state.loading = true;
    })
    .addCase("changeStatusRequest", (state) => {
      state.loading = true;
    })
    .addCase("createTodoRequest", (state) => {
      state.loading = true;
    });
  builder
    .addCase("getTodoDetailsSuccess", (state, action) => {
      state.loading = false;
      state.todo = action.payload;
    })
    .addCase("getAllTodoSuccess", (state, action) => {
      state.loading = false;
      state.todos = action.payload;
    })
    .addCase("updateTodoSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase("changeStatusSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase("createTodoSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase("deleteTodoSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    });
  builder
    .addCase("createTodoFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("updateTodoFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("getTodoDetailsFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("getAllTodoFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("changeStatusFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("deleteTodoFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

  builder.addCase("clearError", (state) => {
    state.error = null;
  });
  builder.addCase("clearMessage", (state) => {
    state.message = null;
  });
});
