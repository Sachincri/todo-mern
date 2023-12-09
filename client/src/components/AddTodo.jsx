import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { createTodo } from "../redux/action/todo";
import { useNavigate } from "react-router-dom";

const AddTodo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { message, error } = useSelector((state) => state.todos);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
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
  }, [dispatch, error, message, navigate]);

  const addTask = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.append("title", title);
    myForm.append("description", description);
    dispatch(createTodo(myForm));
  };
  return (
    <div className="addtask">
      <h1>Add Task</h1>
      <form onSubmit={addTask}>
        <div>
          <input
            required
            type="text"
            placeholder="Title"
            value={title}
            maxLength={50}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <textarea
            required
            type="text"
            placeholder="Description"
            value={description}
            maxLength={250}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddTodo;
