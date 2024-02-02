import React from "react";
import BeforeLogin from "./BeforeLogin";
import { Link } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Login from "./profile/auth/Login";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    navigate("/");
    window.location.reload();
  };
  return (
    <div className="home-container">
      <header>
        <h2>
          <Link to="/">To Do List</Link>
        </h2>
        <div className="button-container">
          <button className="add">Add</button>

          {!localStorage.getItem("token") && (
            <Link to="/login">
              <button className="sign-in">Sign In</button>
            </Link>
          )}
          {localStorage.getItem("token") && (
            <button onClick={handleLogOut} className="sign-in">
              Sign Out
            </button>
          )}
        </div>
      </header>
      <Routes>
        {!localStorage.getItem("token") && (
          <Route index element={<BeforeLogin />} />
        )}
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default Home;
