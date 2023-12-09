import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getTodoDetails, updateTodo } from "../redux/action/todo";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "./Loader";

const UpdateTodo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const todoId = params.id;
  const { todo, message, error, loading } = useSelector((state) => state.todos);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (todo && todo._id !== todoId) {
      dispatch(getTodoDetails(todoId));
    } else {
      setTitle(todo.title);
      setDescription(todo.description);
    }
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
    if (message) {
      toast.success(message);
      dispatch({
        type: "clearMessage",
      });
      navigate("/");
    }
  }, [dispatch, error, message, todo, todoId, navigate]);

  const updateTask = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.append("title", title);
    myForm.append("description", description);
    dispatch(updateTodo(todoId, myForm));
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="addtask">
          <h1>Edit Tast</h1>
          <form onSubmit={updateTask}>
            <div>
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <textarea
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </>
  );
};

export default UpdateTodo;
