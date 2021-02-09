import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { validEmail } from "./helpers/validation";

const Register = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const sendConfirmationToEmail = async (e) => {
    e.preventDefault();

    const config = {
      url: process.env.REACT_APP_CONFIRM_EMAIL,
      handleCodeInApp: true,
    };

    try {
      await validEmail(email);

      await auth.sendSignInLinkToEmail(email, config);

      setLoading(true);
    } catch (error) {
      toast.error(error.message);
      console.log("Your result: Something went wrong!", error);
    }

    localStorage.setItem("emailSaved", email);

    setEmail("");
  };

  if (loading)
    return (
      <div className="confirmation-message">
        <h1>
          A confirmation email has been sent to your address.
          <Link
            to="/"
            style={{ textDecoration: "none", color: "rgba(255,255,255,.6)" }}
          >
            &nbsp;Return to Menu
          </Link>
        </h1>
      </div>
    );

  return (
    <form className="register_form" onSubmit={sendConfirmationToEmail}>
      <div>
        <label>Email</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Enter email to sign up"
        />
        <div className="btn-2">
          <button>Register</button>
          <Link to="/login">Already have an account?</Link>
        </div>
      </div>
    </form>
  );
};

export default Register;
