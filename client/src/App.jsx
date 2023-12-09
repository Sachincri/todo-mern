import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { loadUser } from "./redux/action/user";
import { ProtectedRoute } from "protected-route-react";
import toast, { Toaster } from "react-hot-toast";
import Home from "./components/Home";
import Loader from "./components/Loader";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import TodoDetails from "./components/TodoDetails";
import AddTodo from "./components/AddTodo";
import UpdateTodo from "./components/UpdateTodo";
import "./style/app.css";

function App() {
  const { isAuthenticated, error, message, loading } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({
        type: "clearError",
      });
    }
    if (message) {
      toast.success(message);
      dispatch({
        type: "clearMessage",
      });
    }
  }, [dispatch, error, message]);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Router>
      {loading ? (
        <Loader />
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/updatetask/:id"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <UpdateTodo />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addtask"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <AddTodo />
              </ProtectedRoute>
            }
          />
          <Route
            path="/taskdetails/:id"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <TodoDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/">
                <SignUp />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/">
                <Login />
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
      <Toaster />
    </Router>
  );
}

export default App;
