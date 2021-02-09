import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../firebase";
import { AuthContext } from "../context/authContext";
import { toast } from "react-toastify";
import Loading from "../partials/Loading";
import { validEmail } from "./helpers/validation";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [viewPassword, setViewPassword] = useState({
    type: "password",
    view: false,
  });
  const { dispatch } = useContext(AuthContext);
  let history = useHistory();

  const handleViewPassword = () => {
    setViewPassword((prevState) => {
      return { ...prevState, view: !viewPassword.view };
    });

    if (viewPassword.type === "password") {
      setViewPassword((prevState) => {
        return { ...prevState, type: "text" };
      });
    } else {
      setViewPassword((prevState) => {
        return { ...prevState, type: "password" };
      });
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await validEmail(email);

      await auth
        .signInWithEmailAndPassword(email, password)
        .then(async (result) => {
          const { user } = result;
          const idTokenResult = await user.getIdTokenResult();

          dispatch({
            type: "USER_LOGGED",
            payload: { email: user.email, token: idTokenResult.token },
          });

          toast.success(`Welcome ${user.email}!`);

          history.push("/");
        });
    } catch (error) {
      toast.error(`${error.message}`);
      console.log(error);
      history.push("/");
    }
  };

  if (loading) {
    return (
      <div>
        <h1>
          <Loading />
        </h1>
      </div>
    );
  }

  return (
    <form className="login_form" onSubmit={handleLogin}>
      <div>
        <div>
          <label>Email</label>
        </div>
        <input
          type="email"
          required
          placeholder="Enter email to sign in"
          autoComplete="on"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          type={viewPassword.type}
          autoComplete="off"
          required
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="options">
          <label>See password</label>
          <input
            type="checkbox"
            checked={viewPassword.view}
            onChange={handleViewPassword}
          />
        </div>
        <div className="btn-register">
          <button>Login</button>
          <Link to="/register">Don't have an account? Click here.</Link>
          <Link
            style={{ color: "yellow", textShadow: "1px 1px 0 black" }}
            to="/recovery-password"
          >
            Forgot password ?
          </Link>
        </div>
      </div>
    </form>
  );
};

export default Login;
