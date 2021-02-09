import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { auth } from "../../firebase";
import { toast } from "react-toastify";

const Sidebar = ({ grid, setGrid }) => {
  const { state, dispatch } = useContext(AuthContext);

  const handleSidebar = (e) => {
    e.preventDefault();
    setGrid("hide-sidebar-mode");
  };

  const logout = async (e) => {
    e.preventDefault();

    try {
      const resp = window.confirm("Are you sure ?");

      if (resp) {
        await auth.signOut();

        dispatch({
          type: "USER_LOGGED",
          payload: null,
        });

        toast.info("Login to see your cards.");
      }
    } catch (error) {
      console.log(error, "Error on sign out!");
    }
  };

  return (
    <div className={grid}>
      <div className="show-sidebar">
        <Link to="/" onClick={handleSidebar}>
          x
        </Link>
      </div>
      <ul className="sidebar-list">
        <h2>Menu</h2>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          {state.user === null ? (
            <Link to="/login">Login</Link>
          ) : (
            <a href="/" onClick={logout}>
              Logout
            </a>
          )}
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
