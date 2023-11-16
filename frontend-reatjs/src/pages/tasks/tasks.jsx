import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import axios from "axios";
import "./tasks.css";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("top");
  const [deadline, setDeadline] = useState("");

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

  const handleTaskChange = (e) => {
    setTask(e.target.value);
  };

  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };

  const handleDeadlineChange = (e) => {
    setDeadline(e.target.value);
  };

  const addTask = async () => {
    if (!task || !priority || !deadline) {
      alert("Please fill in all required fields.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:6789/api/v1/tasks", {
        name: task,
        priority,
        deadline,
        done: 0,
      });

      setTasks([...tasks, response.data]);
      setTask("");
      setPriority("top");
      setDeadline("");
      fetchData();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const markDone = async (id) => {
    try {
      await axios.put(`http://localhost:6789/api/v1/tasks/${id}`, {
        done: 1,
      });
      const updatedTasks = tasks.map((t) =>
        t.id === id ? { ...t, done: 1 } : t
      );
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error marking task as done:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:6789/api/v1/tasks/${id}`);
      const updatedTasks = tasks.filter((t) => t.id !== id);
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const upcomingTasks = tasks ? tasks.filter((t) => t.done === 0) : [];
  const completedTasks = tasks ? tasks.filter((t) => t.done === 1) : [];

  return (
    <div className="App">
      <header>
        <h1>Task Scheduler</h1>
      </header>
      <main>
        <div className="task-form">
          <input
            type="text"
            id="name"
            placeholder="Enter task..."
            value={task}
            onChange={handleTaskChange}
          />
          <select
            id="priority"
            value={priority}
            onChange={handlePriorityChange}
          >
            <option value="top">Top Priority</option>
            <option value="middle">Middle Priority</option>
            <option value="low">Less Priority</option>
          </select>
          <input
            type="date"
            id="deadline"
            value={deadline}
            onChange={handleDeadlineChange}
          />
          <button id="add-task" onClick={addTask}>
            Add Task
          </button>
        </div>
        <h2 className="heading">Upcoming Tasks</h2>
        <div className="task-list" id="task-list">
          <table>
            <thead>
              <tr>
                <th>Task Name</th>
                <th>Priority</th>
                <th>Deadline</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {upcomingTasks.map((t) => (
                <tr key={t.id}>
                  <td>{t.name}</td>
                  <td>{t.priority}</td>
                  <td>{format(new Date(t.deadline), "dd/MM/yyyy")}</td>
                  <td>
                    {!t.done && (
                      <>
                        <button
                          className="mark-done"
                          onClick={() => markDone(t.id)}
                        >
                          Mark Done
                        </button>
                        <button
                          className="mark-done"
                          onClick={() => deleteTask(t.id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
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
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
  {completedTasks.map((ct) => (
    <tr key={ct.id}>
      <td>{ct.name}</td>
      <td>{ct.priority}</td>
      <td>{format(new Date(ct.deadline), "dd/MM/yyyy")}</td>
      <td>
        <button
          className="mark-done"
          onClick={() => deleteTask(ct.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>

          </table>
        </div>
      </main>
    </div>
  );
}

export default TaskList;
