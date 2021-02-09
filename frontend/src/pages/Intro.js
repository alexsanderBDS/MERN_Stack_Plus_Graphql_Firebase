import React, { useContext } from "react";
import Cards from "./components/Cards";
import { AuthContext } from "./context/authContext";
import { Link } from "react-router-dom";

const Intro = () => {
  const { state } = useContext(AuthContext);

  if (!state.user) {
    return (
      <div className="intro">
        <h1>
          <label>Cards App | Welcome!</label>
        </h1>
        <h2>
          <Link to="/register">Let's Start</Link>
        </h2>
      </div>
    );
  } else {
    return <Cards />;
  }
};

export default Intro;
