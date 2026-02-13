import React, { useState } from "react";

const API = "https://travel-planner-backend-kaym.onrender.com/";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const [warm, setWarm] = useState(true);
  const [beach, setBeach] = useState(true);
  const [days, setDays] = useState(7);
  const [comfortLevel, setComfortLevel] = useState("Comfort");
  const [suggestions, setSuggestions] = useState([]);

  // ---------- API FUNCTIONS ----------

  const register = async () => {
    try {
      const response = await fetch(`${API}api/Auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, passwordHash: password })
      });

      const text = await response.text();
      setMessage(text);

      if (response.ok) {
        localStorage.setItem("isLoggedIn", "true");
        setIsLoggedIn(true);
      }
    } catch {
      setMessage("Backend not reachable");
    }
  };

  const login = async () => {
    try {
      const response = await fetch(`${API}api/Auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, passwordHash: password })
      });

      const text = await response.text();
      setMessage(text);

      if (response.ok) {
        localStorage.setItem("isLoggedIn", "true");
        setIsLoggedIn(true);
      }
    } catch {
      setMessage("Backend not reachable");
    }
  };

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    setSuggestions([]);
  };

  const getSuggestions = async () => {
    try {
      const response = await fetch(`${API}api/Travel/suggestions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ warm, beach, days, comfortLevel })
      });

      const data = await response.json();
      setSuggestions(data);
    } catch {
      setMessage("Failed to fetch suggestions");
    }
  };

  // ---------- STYLES ----------

  const styles = {
    page: {
      minHeight: "100vh",
      background: "#f5f7fb",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "Arial"
    },
    card: {
      background: "white",
      padding: "30px",
      borderRadius: "12px",
      width: "400px",
      boxShadow: "0 8px 20px rgba(0,0,0,0.1)"
    },
    input: {
      width: "100%",
      padding: "10px",
      margin: "8px 0",
      borderRadius: "6px",
      border: "1px solid #ccc"
    },
    button: {
      width: "100%",
      padding: "12px",
      marginTop: "10px",
      borderRadius: "6px",
      border: "none",
      background: "#4f46e5",
      color: "white",
      fontWeight: "bold",
      cursor: "pointer"
    },
    resultCard: {
      background: "#eef2ff",
      padding: "12px",
      borderRadius: "8px",
      marginTop: "10px"
    }
  };

  // ---------- UI ----------

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={{ textAlign: "center" }}>🌍 Travel Planner</h1>
        <p style={{ color: "red" }}>{message}</p>

        {!isLoggedIn ? (
          <>
            <input
              style={styles.input}
              placeholder="Email"
              onChange={e => setEmail(e.target.value)}
            />
            <input
              style={styles.input}
              type="password"
              placeholder="Password"
              onChange={e => setPassword(e.target.value)}
            />

            <button style={styles.button} onClick={register}>
              Register
            </button>

            <button
              style={{ ...styles.button, background: "#16a34a" }}
              onClick={login}
            >
              Login
            </button>
          </>
        ) : (
          <>
            <h3>Travel Preferences</h3>

            <label>
              <input
                type="checkbox"
                checked={warm}
                onChange={() => setWarm(!warm)}
              />{" "}
              Warm country
            </label>

            <br />

            <label>
              <input
                type="checkbox"
                checked={beach}
                onChange={() => setBeach(!beach)}
              />{" "}
              Beach
            </label>

            <input
              style={styles.input}
              type="number"
              value={days}
              onChange={e => setDays(Number(e.target.value))}
              placeholder="Days"
            />

            <input
              style={styles.input}
              value={comfortLevel}
              onChange={e => setComfortLevel(e.target.value)}
              placeholder="Comfort level"
            />

            <button style={styles.button} onClick={getSuggestions}>
              Get Suggestions
            </button>

            {suggestions.map((s, i) => (
              <div key={i} style={styles.resultCard}>
                <h4>{s.destination}</h4>
                <p>{s.description}</p>
              </div>
            ))}

            <button
              style={{ ...styles.button, background: "#dc2626" }}
              onClick={logout}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
