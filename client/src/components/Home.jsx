import { useDispatch, useSelector } from "react-redux";
import { deleteTodo, getAllTodo, changeStatus } from "../redux/action/todo";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { logout } from "../redux/action/user";
import Loader from "./Loader";

const Home = () => {
  const dispatch = useDispatch();
  const { todos, error, message, loading } = useSelector(
    (state) => state.todos
  );

  const [selectedTodos, setSelectedTodos] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleTodoSelection = (todoId) => {
    setSelectedTodos((prevSelected) =>
      prevSelected.includes(todoId)
        ? prevSelected.filter((id) => id !== todoId)
        : [...prevSelected, todoId]
    );
    dispatch(changeStatus(todoId));
  };

  const deleteTodoHandler = () => {
    dispatch(deleteTodo(selectedTodos));
  };

  const handleCheckbox = (value, event) => {
    if (event.target.checked) {
      setStatus(value);
    } else {
      setStatus(null);
    }
  };

  const logoutHandler = () => {
    dispatch(logout());
  };

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
    }
    dispatch(getAllTodo(keyword, status, page));
  }, [dispatch, keyword, page, status, error, message]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <main className="home">
          <section className="sec_1">
            <div>
              <Link to={"/addtask"}>Add Task</Link>
            </div>
            <div>
              <h2>Search</h2>
              <input
                type="text"
                value={keyword}
                placeholder="Search"
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
            <div>
              <h2>Filter</h2>
              {["active", "completed"].map((el, i) => (
                <div key={i}>
                  <input
                    type="checkbox"
                    checked={status === el}
                    onChange={(e) => handleCheckbox(el, e)}
                  />
                  <span>{el}</span>
                </div>
              ))}
            </div>
            <div>
              {selectedTodos.length > 0 ? (
                <button onClick={deleteTodoHandler}>
                  Delete Selected Todos
                </button>
              ) : (
                ""
              )}
            </div>

            <p onClick={logoutHandler}>logOut</p>
          </section>
          <section className="sec_2">
            <h1>To_Do_APP</h1>

            <div>
              {todos
                ?.map((i) => (
                  <div key={i._id}>
                    <input
                      type="checkbox"
                      checked={selectedTodos.includes(i._id)}
                      onChange={() => handleTodoSelection(i._id)}
                    />
                    <Link to={`/taskdetails/${i._id}`}>{i.title}</Link>
                    <span>{i.status}</span>
                    <p>{i.createdAt.substring(0, 10)}</p>
                  </div>
                ))
                .reverse()}
            </div>

            <button onClick={handlePrevPage} disabled={page === 1}>
              prev
            </button>
            <button onClick={handleNextPage}>next</button>
          </section>
        </main>
      )}
      ;
    </>
  );
};

export default Home;
