import React, { useState } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import Loading from "../partials/Loading";

const RecoverPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRecovery = async (e) => {
    e.preventDefault();
    setLoading(true);

    const config = {
      url: process.env.REACT_APP_RECOVERY_EMAIL,
      handleCodeInApp: true,
    };

    await auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        setLoading(false);
        toast.success(
          "An Email to create your new password was sent to " + email
        );
        setEmail("");
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
      });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <form className="recover_password" onSubmit={handleRecovery}>
      <div>
        <label>Email</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email to create a new password."
        />
        <div>
          <button>Confirm</button>
        </div>
      </div>
    </form>
  );
};

export default RecoverPassword;
