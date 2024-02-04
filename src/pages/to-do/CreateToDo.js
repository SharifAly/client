import React from "react";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

// title will send from input, done and email are static values

const CreateToDo = () => {
  // data to create new to do
  const [data, setData] = useState({
    todo: "",
    done: 0,
    email: localStorage.getItem("email"),
  });

  const navigate = useNavigate();

  // function to create new to do
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.email === null) {
      // sweet alert to login
      Swal.fire("Please login befor creating a new task");
      return;
    } else {
      const response = await axios.post("http://localhost:5000/create", data);
      // console.log(response);
      setData({ ...data, todo: "" });
      Swal.fire("Task created successfully");
      navigate("/");
    }
  };
  return (
    <div>
      {/* form to create new to do */}
      <form className="create-todo" onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="todo"
          id="todo"
          placeholder="Title"
          value={data.todo}
          // set to do title
          onChange={(e) => setData({ ...data, todo: e.target.value })}
        />
        <button className="create-todo-btn" type="submit">
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateToDo;
