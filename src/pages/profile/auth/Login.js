/**
 * Login component handles user login.
 *
 * Allows user to enter email and password.
 * Validates input and calls API to log user in.
 * Saves token and email in localStorage on success.
 * Navigates to home page and reloads window.
 * Shows error alerts for invalid/missing input.
 * Contains link to register page.
 */
import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
  // set email and password in state from input
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  // initialize useNavigate
  const navigate = useNavigate();

  // function to log user in
  const handleSubmit = async (e) => {
    e.preventDefault();
    // validate input
    if (data.email.trim() === "") {
      // sweet alert to enter email
      Swal.fire("Please enter your email");
    } else if (data.password.trim() === "") {
      // sweet alert to enter password
      Swal.fire("Please enter your password");
    } else {
      // send login data to backend API if all data is inserted to form
      const response = await axios.post("http://localhost:5000/login", data);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("email", response.data.email);
      // navigate to home page and reload window
      navigate("/");
      window.location.reload();
      console.log(response.status);
    }
  };

  return (
    <div className="form-container">
      {/* form to log user in */}
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          onChange={(e) => setData({ ...data, password: e.target.value })}
          autoComplete="on"
        />
        <button type="submit">Submit</button>
      </form>
      {/* link to register page  */}
      <Link to="/register">
        <p>Register</p>
      </Link>
    </div>
  );
};

export default Login;
