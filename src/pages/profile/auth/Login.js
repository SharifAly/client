import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:5000/login", data);
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("email", response.data.email);
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="form-container">
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
    </div>
  );
};

export default Login;
