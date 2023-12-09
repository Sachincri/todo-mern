import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/action/user";
import { RiEyeCloseLine } from "react-icons/ri";
import { VscEye } from "react-icons/vsc";

const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [view, setView] = useState(false);
  const dispatch = useDispatch();

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(username , password));
  };

  return (
    <section className="user">
      <div > <h1>Login</h1>
        <form onSubmit={loginSubmit}>
         

          <div>
          <input
            placeholder="Enter Your Username"
            type="text"
            value={ username}
            required
            onChange={(e) => setUsername(e.target.value)}
          /></div>
          <div>
          <input
            placeholder="Enter Your Password"
            type={view ? "text" : "password"}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {view ? (
            <VscEye onClick={() => setView(false)} />
          ) : (
            <RiEyeCloseLine onClick={() => setView(true)} />
          )}</div>
          <div><input className="btn" type="submit" value="Login" /></div>
        </form>
        <Link to="/signup">
          <p>Dont have account? SignUp</p>
        </Link>
      </div>
    </section>
  );
};

export default Login;
