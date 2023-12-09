import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getTodoDetails, deleteTodo } from "../redux/action/todo";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "./Loader";
const TodoDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const todoId = params.id;
  const { todo, error, message, loading } = useSelector((state) => state.todos);

  const deleteTodoHandler = () => {
    dispatch(deleteTodo(todoId));
  };

  useEffect(() => {
    if (todo && todo._id !== todoId) {
      dispatch(getTodoDetails(todoId));
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
  }, [dispatch, todo, todoId, navigate, error, message]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="taskd">
          <h1>Details</h1>
          <div>
            <h1>{todo.title}</h1>
            <article>{todo.description}</article>
          </div>

          <Link to={`/updatetask/${todo._id}`}>Edit</Link>
          <span onClick={deleteTodoHandler}>Delete</span>
        </div>
      )}
    </>
  );
};

export default TodoDetails;
