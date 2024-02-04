import React from "react";
import BeforeLogin from "./BeforeLogin";
import { Link } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Login from "./profile/auth/Login";
import { useNavigate } from "react-router-dom";
import Register from "./profile/auth/Register";
import CreateToDo from "./to-do/CreateToDo";
import ToDoList from "./to-do/ToDoList";
import profilePicture from "../pictures/profile-picture.png";
import EditProfile from "./profile/EditProfile";

const Home = () => {
  // initialize useNavigate
  const navigate = useNavigate();
  // logout function to delete the jwt token, and email from localStorage
  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    // navigate to home page
    navigate("/");
    // reload the page
    window.location.reload();
  };
  return (
    <div className="home-container">
      <header>
        {/* headline */}
        <h2>
          <Link to="/">To Do List</Link>
        </h2>
        {/* create new to do */}
        <div className="button-container">
          <Link to="/create">
            <button className="add">Add</button>
          </Link>
          {/* sign in button, iw will only renderd if the user is not logged in,
           and there is no jwt token in th localStorage */}
          {!localStorage.getItem("token") && (
            <Link to="/login">
              <button className="sign-in">Sign In</button>
            </Link>
          )}
          {/* if user is logged in render sign out button and profilepicture 
          to logout and delete token from the localStorage */}
          {localStorage.getItem("token") && (
            <>
              {/* logout button */}
              <button onClick={handleLogOut} className="sign-in">
                Sign Out
              </button>
              {/* profilepicture */}
              <Link to="/edit-profile">
                <img
                  style={{ width: "2em", borderRadius: "50%" }}
                  src={profilePicture}
                  alt="ProfilePicture"
                />
              </Link>
            </>
          )}
        </div>
      </header>
      {/* routes to navigate through the application */}
      <Routes>
        {/* home route if a user is not logged in */}
        {!localStorage.getItem("token") && (
          <Route index element={<BeforeLogin />} />
        )}
        {/* home route if a user is logged in, show all to dos */}
        <Route index element={<ToDoList />} />
        {/* login route if a user is not logged in */}
        <Route path="/login" element={<Login />} />
        {/* register route if a user is not registered */}
        <Route path="/register" element={<Register />} />
        {/* create to do route if a user is logged in */}
        <Route path="/create" element={<CreateToDo />} />
        {/* edit profile route if a user is logged in */}
        <Route path="/edit-profile" element={<EditProfile />} />
      </Routes>
    </div>
  );
};

export default Home;
