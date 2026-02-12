import React, { useState } from "react";

function App() {
  // ---------- AUTH STATE ----------
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  // ---------- TRAVEL FORM STATE ----------
  const [warm, setWarm] = useState(true);
  const [beach, setBeach] = useState(true);
  const [days, setDays] = useState(7);
  const [comfortLevel, setComfortLevel] = useState("Comfort");

  const [suggestions, setSuggestions] = useState([]);

  // ---------- REGISTER ----------
  const register = async () => {
    const response = await fetch("https://localhost:7234/api/Auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        passwordHash: password
      })
    });

    const text = await response.text();
    setMessage(text);

    if (response.ok) {
      localStorage.setItem("isLoggedIn", "true");
      setIsLoggedIn(true);
    }
  };

  // ---------- LOGIN ----------
  const login = async () => {
    const response = await fetch("https://localhost:7234/api/Auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        passwordHash: password
      })
    });

    const text = await response.text();
    setMessage(text);

    if (response.ok) {
      localStorage.setItem("isLoggedIn", "true");
      setIsLoggedIn(true);
    }
  };

  // ---------- LOGOUT ----------
  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    setSuggestions([]);
  };

  // ---------- GET TRAVEL SUGGESTIONS ----------
  const getSuggestions = async () => {
    const response = await fetch(
      "https://localhost:7234/api/Travel/suggestions",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          warm,
          beach,
          days,
          comfortLevel
        })
      }
    );

    const data = await response.json();
    setSuggestions(data);
  };

  // ---------- UI ----------
  return (
    <div style={{ padding: "20px" }}>
      <h1>Travel Planner</h1>
      <p>{message}</p>

      {!isLoggedIn ? (
        <>
          <h2>Register</h2>
          <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
          <br />
          <input
            placeholder="Password"
            type="password"
            onChange={e => setPassword(e.target.value)}
          />
          <br />
          <button onClick={register}>Register</button>

          <h2>Login</h2>
          <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
          <br />
          <input
            placeholder="Password"
            type="password"
            onChange={e => setPassword(e.target.value)}
          />
          <br />
          <button onClick={login}>Login</button>
        </>
      ) : (
        <>
          <h2>Travel Preferences</h2>

          <label>
            <input
              type="checkbox"
              checked={warm}
              onChange={() => setWarm(!warm)}
            />
            Warm country
          </label>
          <br />

          <label>
            <input
              type="checkbox"
              checked={beach}
              onChange={() => setBeach(!beach)}
            />
            Beach
          </label>
          <br />

          <input
            type="number"
            value={days}
            onChange={e => setDays(Number(e.target.value))}
            placeholder="Days"
          />
          <br />

          <input
            placeholder="Comfort level"
            value={comfortLevel}
            onChange={e => setComfortLevel(e.target.value)}
          />
          <br />

          <button onClick={getSuggestions}>Get Suggestions</button>

          <h2>Results</h2>
          {suggestions.map((s, index) => (
            <div key={index}>
              <h3>{s.destination}</h3>
              <p>{s.description}</p>
            </div>
          ))}

          <br />
          <button onClick={logout}>Logout</button>
        </>
      )}
    </div>
  );
}

export default App;
