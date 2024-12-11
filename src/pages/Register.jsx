import { useState } from "react";
import facade from "../util/apiFacade";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    if (!username || !password) {
      setMessage("Username and password are required.");
      return;
    }
    if (password.length < 6) {
      setMessage("Password must be at least 6 characters long.");
      return;
    }
    try {
      await facade.register(username, password);
      setMessage("Registration successful! You can now log in.");
    } catch (err) {
      const error = await err.fullError;
      setMessage(`Registration failed: ${error.message || "Unknown error"}`);
    }
  };
  

  return (
    <div>
      <h2>Register</h2>
      <div>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
      </div>
      <button onClick={handleRegister}>Register</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Register;
