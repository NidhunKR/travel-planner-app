import React, { useState } from "react";
import Auth from "./Components/Auth";
import Dashboard from "./Components/Dashboard";

const API = "https://travel-planner-backend-kaym.onrender.com/";

function App() {
  // ---------- AUTH STATE ----------

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);


  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  // ---------- TRAVEL STATE ----------

  const [warm, setWarm] = useState(true);
  const [beach, setBeach] = useState(true);
  const [days, setDays] = useState(7);
  const [comfortLevel, setComfortLevel] = useState("Comfort");
  const [suggestions, setSuggestions] = useState([]);

  // ---------- API FUNCTIONS ----------

  const register = async () => {
    setLoading(true);
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
    setLoading(false);
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
const getHistory = async () => {
  try {
    const response = await fetch(
      "https://travel-planner-backend-kaym.onrender.com/api/Travel/history"
    );

    if (!response.ok) {
      throw new Error("Server error: " + response.status);
    }

    const text = await response.text();

    if (!text) {
      console.log("Empty response from server");
      return;
    }

    const data = JSON.parse(text);

    console.log(data);
  } catch (error) {
    console.error("History error:", error);
  }
};




  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    setSuggestions([]);
  };

  const getSuggestions = async () => {
  setLoading(true);

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

  setLoading(false);
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
      width: "420px",
      boxShadow: "0 8px 20px rgba(0,0,0,0.1)"
    }
  };

  // ---------- UI ----------

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={{ textAlign: "center" }}>🌍 Travel Planner</h1>
        <p style={{ color: "red" }}>{message}</p>

        {loading && <p>Loading...</p>}

        {!isLoggedIn ? (
          <Auth
            email={email}
            password={password}
            setEmail={setEmail}
            setPassword={setPassword}
            register={register}
            login={login}
          />
        ) : (
          <Dashboard
            loading={loading}
            warm={warm}
            beach={beach}
            days={days}
            comfortLevel={comfortLevel}
            setWarm={setWarm}
            setBeach={setBeach}
            setDays={setDays}
            setComfortLevel={setComfortLevel}
            getSuggestions={getSuggestions}
            suggestions={suggestions}
            getHistory={getHistory}
            logout={logout}
          />
        )}
      </div>
    </div>
  );
}

export default App;
