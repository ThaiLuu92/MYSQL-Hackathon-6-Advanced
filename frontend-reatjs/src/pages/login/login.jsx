import React, { useState } from "react";
import axios from "axios";
import "./login.css";
import TaskList from "../tasks/tasks";
import UserTaskList from "../tasks/tasks_user";

const LoginComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false); // Track login status
  const [userRole, setUserRole] = useState(null);

  const handleLogin = async () => {
    if (!username || !password) {
      setErrors(["Please enter both username and password"]);
      return;
    }

    try {
      const response = await axios.post("http://localhost:6789/api/v1/login", {
        username,
        password,
      });

      const { success, user, errors: responseErrors } = response.data;

      if (!success) {
        setErrors(responseErrors || []);
        console.error("Login failed:", responseErrors);
        return;
      }

      alert(`Login successful. Welcome, ${user.username}!`);
      console.log(111111111,user);
      setUserRole(user.role);
      setLoggedIn(true);
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <>
      <div className="login-container">
        <h2>Login</h2>
        {errors.length > 0 && (
          <div className="error-container">
            <ul>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={handleLogin}>Login</button>
      </div>
      {loggedIn && userRole === "admin" && <TaskList />}
      {loggedIn && userRole === "user" && <UserTaskList />}
    </>
  );
};

export default LoginComponent;
