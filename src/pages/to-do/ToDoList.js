import React, { useState, useEffect } from "react";
import axios from "axios";
import doneIcon from "./icons/done-small.png";
import notDoneIcon from "./icons/not-done-small.png";

const ToDoList = () => {
  // set the response data in data state
  const [data, setData] = useState([]);
  // set the email in email state from localStorage after login
  const [email, setEmail] = useState(localStorage.getItem("email"));

  const handleDoneChange = (id) => {
    try {
      axios.put(`http://localhost:5000/update/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (id) => {
    try {
      axios.delete(`http://localhost:5000/delete/${id}`);
    } catch (error) {
      console.log(error);
    }
  };
  // fetch data from server and set it to data state
  useEffect(() => {
    setEmail(localStorage.getItem("email"));
    const fetchData = async () => {
      const result = await axios(
        // fetch data and send email as query parameter to server, to fetch to dos from specific user
        `http://localhost:5000/get-all?email=${email}`
      );
      setData(result.data);
      // console.log(data);
    };
    fetchData();
  }, [handleDelete, handleDoneChange]);

  return (
    <div className="table-container">
      <table className="styled-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Done</th>
            <th></th>
          </tr>
        </thead>
        {/* map through the responsed data and render in table */}
        {data.map((item) => (
          <tbody key={item.id}>
            <tr>
              <td className="table-title">{item.todo}</td>
              <td className="table-done">
                {/* show icon or not if the to do its done or not */}
                {item.done ? (
                  <img style={{ width: "2.5rem" }} src={doneIcon} alt="" />
                ) : (
                  <img
                    style={{ width: "2.5rem", display: "none" }}
                    src={notDoneIcon}
                    alt=""
                  />
                )}
              </td>
              <td className="table-button-container">
                <button
                  className="update-btn"
                  onClick={() => handleDoneChange(item.id)}
                >
                  Done
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
};

export default ToDoList;
