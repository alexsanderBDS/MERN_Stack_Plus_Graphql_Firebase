import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../../firebase";
import { AuthContext } from "../context/authContext";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import { userMutation } from "../../graphql/mutations";
import { validPassword } from "./helpers/validation";

const CompleteRegister = () => {
  const [email, setEmail] = useState("");
  const [viewPassword, setViewPassword] = useState({
    type: "password",
    view: false,
  });
  const [password, setPassword] = useState({
    original: "",
    confirmation: "",
  });
  const { dispatch } = useContext(AuthContext);
  let history = useHistory();

  useEffect(() => {
    setEmail(localStorage.getItem("emailSaved"));
  }, [history]);

  const [createUser] = useMutation(userMutation.CREATE_USER);

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

  const userAcessAvailable = async (e) => {
    e.preventDefault();
    const { original, confirmation } = password;

    try {
      await validPassword(original, confirmation);

      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );

      if (result.user.emailVerified) {
        localStorage.removeItem("emailSaved");
        let user = auth.currentUser;

        await user.updatePassword(original);

        const idTokenResult = await user.getIdTokenResult();
        dispatch({
          type: "USER_LOGGED",
          payload: { email: user.email, token: idTokenResult.token },
        });

        toast.success("Your account was succesfully created!");

        createUser();
        history.push("/");
      }
    } catch (error) {
      toast.error(error.message);
      console.log("Some error:", error);
    }
  };

  return (
    <form className="complete_register_form" onSubmit={userAcessAvailable}>
      <div>
        <label>Email</label>
        <input
          type="email"
          required
          placeholder="Enter email to sign up"
          autoComplete="on"
          onChange={(e) => setEmail(e.target.value)}
          disabled={email ? true : false}
          defaultValue={email ? email : ""}
        />
        <label>Password</label>
        <input
          type={viewPassword.type}
          autoComplete="off"
          required
          placeholder="Enter password"
          onChange={(e) =>
            setPassword((prevPassword) => {
              return { ...prevPassword, original: e.target.value };
            })
          }
        />
        <div className="options">
          <label>See password</label>
          <input
            type="checkbox"
            checked={viewPassword.view}
            onChange={handleViewPassword}
          />
        </div>
        <label>Confirm Password</label>
        <input
          type="password"
          autoComplete="off"
          required
          placeholder="Enter password to match"
          onChange={(e) =>
            setPassword((prevPassword) => {
              return { ...prevPassword, confirmation: e.target.value };
            })
          }
        />
        <div className="btn-register">
          <button>Register</button>
        </div>
      </div>
    </form>
  );
};

export default CompleteRegister;
