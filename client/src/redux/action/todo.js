import { server } from "../store";
import axios from "axios";

export const createTodo = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    dispatch({ type: "createTodoRequest" });

    const { data } = await axios.post(`${server}/addtask`, formData, config);

    dispatch({ type: "createTodoSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "createTodoFail",
      payload: error.response.data.message,
    });
  }
};

export const getAllTodo =
  (keyword = "", status, page) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "getAllTodoRequest",
      });
      let api = `${server}/getTask?keyword=${keyword}&page=${page}`;
      if (status) {
        api = `${server}/getTask?keyword=${keyword}&status=${status}&page=${page}`;
      }
      const { data } = await axios.get(api, {
        withCredentials: true,
      });

      dispatch({
        type: "getAllTodoSuccess",
        payload: data.todos,
      });
    } catch (error) {
      dispatch({
        type: "getAllTodoFail",
        payload: error.response.data.message,
      });
    }
  };

export const getTodoDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getTodoDetailsRequest",
    });
    const { data } = await axios.get(`${server}/taskdetail/${id}`, {
      withCredentials: true,
    });
    dispatch({
      type: "getTodoDetailsSuccess",
      payload: data.todo,
    });
  } catch (error) {
    dispatch({
      type: "getTodoDetailsFail",
      payload: error.response.data.message,
    });
  }
};
export const changeStatus = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "changeStatusRequest",
    });
    const { data } = await axios.get(`${server}/changestatus/${id}`, {
      withCredentials: true,
    });
    dispatch({
      type: "changeStatusSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "changeStatusFail",
      payload: error.response.data.message,
    });
  }
};

export const updateTodo = (id, myForm) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
      withCredentials: true,
    };
    dispatch({ type: "updateTodoRequest" });

    const { data } = await axios.put(
      `${server}/edittask/${id}`,
      myForm,
      config
    );

    dispatch({ type: "updateTodoSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "updateTodoFail",
      payload: error.response.data.message,
    });
  }
};

export const deleteTodo = (id) => async (dispatch) => {
  try {
    const config = {
      withCredentials: true,
    };
    dispatch({ type: "deleteTodoRequest" });

    const { data } = await axios.delete(`${server}/deleteTask/${id}`, config);

    dispatch({ type: "deleteTodoSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "deleteTodoFail",
      payload: error.response.data.message,
    });
  }
};
