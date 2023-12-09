import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../redux/action/user";
import { RiEyeCloseLine } from "react-icons/ri";
import { VscEye } from "react-icons/vsc";

const SignUp = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [view, setView] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.append("username", username);
    myForm.append("email", email);
    myForm.append("password", password);

    dispatch(register(myForm));
  };

  return (
    <section className="user">
      <div>
        <h1>SignUp</h1>
        <form onSubmit={submitHandler}>
          <div>
            <input
              placeholder="Enter Your Name"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <input
              placeholder="Enter Your Email"
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              placeholder="Enter Your Password"
              type={view ? "text" : "password"}
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            {view ? (
              <VscEye onClick={() => setView(false)} />
            ) : (
              <RiEyeCloseLine onClick={() => setView(true)} />
            )}
          </div>
          <button type="submut"> submit</button>
        </form>
        <Link to="/login">Already a user? login</Link>
      </div>
    </section>
  );
};

export default SignUp;
