/**
 * Register component handles user registration.
 *
 * Allows user to enter first name, last name, email and password.
 * On submit, sends registration data to backend API.
 * Shows error alerts if any fields are missing.
 * Navigates to login page after successful registration.
 */
import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

const Register = () => {
  // initialize useNavigate
  const navigate = useNavigate();

  // data to register new user
  const [data, setData] = useState({
    f_name: "",
    l_name: "",
    email: "",
    password: "",
  });
  // function to register new user
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.f_name.trim() === "") {
      // sweet alert to enter first name
      Swal.fire("Please enter your first name");
    } else if (data.l_name.trim() === "") {
      // sweet alert to enter last name
      Swal.fire("Please enter your last name");
    } else if (data.email.trim() === "") {
      // sweet alert to enter email
      Swal.fire("Please enter your email");
    } else if (data.password.trim() === "") {
      // sweet alert to enter password
      Swal.fire("Please enter your password");
    } else {
      // send registration data to backend API if all data is inserted to form
      const response = await axios.post("http://localhost:5000/register", data);
      console.log(response);
      navigate("/login");
    }
  };
  return (
    <div className="register-container">
      {/* form to register new user */}
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="first-name">First Name</label>
        <input
          type="text"
          name="f_name"
          id="first-name"
          placeholder="First Name"
          onChange={(e) => setData({ ...data, f_name: e.target.value })}
        />
        <label htmlFor="last-name">Last Name</label>
        <input
          type="text"
          name="l_name"
          id="last-name"
          placeholder="Last Name"
          onChange={(e) => setData({ ...data, l_name: e.target.value })}
        />
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
      {/* link to login page */}
      <Link to="/login">
        <p>login</p>
      </Link>
    </div>
  );
};

export default Register;
