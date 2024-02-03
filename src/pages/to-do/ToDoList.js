import React, { useState, useEffect } from "react";
import axios from "axios";

const ToDoList = () => {
  // set the response data in data state
  const [data, setData] = useState([]);
  // set the email in email state from localStorage after login
  const [email, setEmail] = useState(localStorage.getItem("email"));

  // fetch data from server and set it to data state
  useEffect(() => {
    setEmail(localStorage.getItem("email"));
    const fetchData = async () => {
      const result = await axios(
        // fetch data and send email as query parameter to server, to fetch to dos from specific user
        `http://localhost:5000/get-all?email=${email}`
      );
      setData(result.data);
      console.log(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Done</th>
              <th>Change/Delete</th>
            </tr>
          </thead>
          {/* map through the responsed data and render in table */}
          {data.map((item) => (
            <tbody>
              <tr key={item.id}>
                <td>{item.todo}|</td>
                <td>{item.done ? "erledigt" : "noch zu erledigen"}|</td>
                <td>
                  <button>Change</button>
                  <button>Delete</button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export default ToDoList;
