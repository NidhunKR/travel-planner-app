import React, { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    alert("Email: " + email + "\nPassword: " + password);
  };

  return (
    <div>
      <h2>Login</h2>

      <div>
        <label>Email:</label><br />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label>Password:</label><br />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
