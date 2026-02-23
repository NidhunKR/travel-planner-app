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
  const [history, setHistory] = React.useState([]);



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
        body: JSON.stringify({ email:email, password: password })
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
      body: JSON.stringify({
        email: email,
        password: password
      })
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token); // ⭐ SAVE TOKEN
      setIsLoggedIn(true);
      setMessage("Login successful");
    } else {
      setMessage("Invalid email or password");
    }

  } catch {
    setMessage("Backend not reachable");
  }
};
const getHistory = async () => {
  try {
    const token = localStorage.getItem("token"); // ⭐ GET TOKEN

    const response = await fetch(`${API}api/Travel/history`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}` // ⭐ SEND TOKEN
      }
    });

    const data = await response.json();
    setHistory(data);

  } catch {
    setMessage("Failed to load history");
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
    const token = localStorage.getItem("token");

    const response = await fetch(`${API}api/Travel/suggestions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
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
    background: "linear-gradient(135deg, #1f2937, #111827)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Segoe UI, sans-serif",
    padding: "20px"
  },
  card: {
    background: "#ffffff",
    padding: "35px",
    borderRadius: "16px",
    width: "450px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.25)"
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "26px"
  },
  button: {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#2563eb",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
  },
  input: {
    width: "100%",
    padding: "10px",
    marginTop: "8px",
    marginBottom: "10px",
    borderRadius: "8px",
    border: "1px solid #ddd"
  },
  sectionTitle: {
    marginTop: "20px",
    marginBottom: "10px",
    fontWeight: "bold"
  }
};

  // ---------- UI ----------

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>🌍 Travel Planner</h1>
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
            history={history}
            getHistory={getHistory}
            logout={logout}
          />
        )}
      </div>
    </div>
  );
}

export default App;