import React from "react";
import BeforeLogin from "./BeforeLogin";

const Home = () => {
  return (
    <div className="home-container">
      <header>
        <h2>To Do List</h2>
        <div className="button-container">
          <button className="add">Add</button>
          <button className="sign-in">Sign in</button>
        </div>
      </header>
      <BeforeLogin />
    </div>
  );
};

export default Home;
