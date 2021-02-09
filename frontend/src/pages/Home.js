import React from "react";
import { Switch, Route } from "react-router-dom";
import CreateCard from "./partials/CreateCard";
import UpdateCard from "./partials/UpdateCard";
import Register from "./auth/Register";
import CompleteRegister from "./auth/CompleteRegister";
import Login from "./auth/Login";
import About from "./About";
import Intro from "./Intro";
import RecoverPassword from "./auth/RecoverPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  return (
    <div className="home">
      <div
        style={{
          position: "absolute",
        }}
      >
        <ToastContainer />
      </div>
      <Switch>
        <Route exact path="/" component={Intro} />
        <Route exact path="/create" component={CreateCard} />
        <Route exact path="/update/:id" component={UpdateCard} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/about" component={About} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/complete_register" component={CompleteRegister} />
        <Route exact path="/recovery-password" component={RecoverPassword} />
        <Route exact path="/*" component={Intro} />
      </Switch>
    </div>
  );
};

export default Home;
