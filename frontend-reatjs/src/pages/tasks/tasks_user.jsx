import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import axios from "axios";
import "./tasks_user.css";

function UserTaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:6789/api/v1/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const upcomingTasks = tasks ? tasks.filter((t) => t.done === 0) : [];
  const completedTasks = tasks ? tasks.filter((t) => t.done === 1) : [];

  return (
    <div className="UserTaskList">
      <header>
        <h1>Task List (User View)</h1>
      </header>
      <main>
        <h2 className="heading">Upcoming Tasks</h2>
        <div className="task-list" id="task-list">
          <table>
            <thead>
              <tr>
                <th>Task Name</th>
                <th>Priority</th>
                <th>Deadline</th>
              </tr>
            </thead>
            <tbody>
              {upcomingTasks.map((t) => (
                <tr key={t.id}>
                  <td>{t.name}</td>
                  <td>{t.priority}</td>
                  <td>{format(new Date(t.deadline), "dd/MM/yyyy")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="completed-task-list">
          <h2 className="cheading">Completed Tasks</h2>
          <table>
            <thead>
              <tr>
                <th>Task Name</th>
                <th>Priority</th>
                <th>Deadline</th>
              </tr>
            </thead>
            <tbody>
              {completedTasks.map((ct) => (
                <tr key={ct.id}>
                  <td>{ct.name}</td>
                  <td>{ct.priority}</td>
                  <td>{format(new Date(ct.deadline), "dd/MM/yyyy")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default UserTaskList;
