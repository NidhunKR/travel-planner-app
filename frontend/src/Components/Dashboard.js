import React from "react";

function Dashboard({
  loading,
  warm,
  beach,
  days,
  comfortLevel,
  setWarm,
  setBeach,
  setDays,
  setComfortLevel,
  getSuggestions,
  suggestions,
  history,
  getHistory,
  logout
}) {
  const styles = {
    sectionTitle: {
      marginTop: "20px",
      marginBottom: "10px",
      fontSize: "16px",
      fontWeight: "bold"
    },
    checkboxRow: {
      marginBottom: "8px"
    },
    input: {
      width: "100%",
      padding: "10px",
      marginTop: "8px",
      borderRadius: "8px",
      border: "1px solid #ddd",
      fontSize: "14px"
    },
    primaryButton: {
      width: "100%",
      padding: "12px",
      borderRadius: "8px",
      border: "none",
      background: "#2563eb",
      color: "white",
      fontWeight: "bold",
      cursor: "pointer",
      marginTop: "15px"
    },
    secondaryButton: {
      width: "100%",
      padding: "10px",
      borderRadius: "8px",
      border: "none",
      background: "#374151",
      color: "white",
      fontWeight: "bold",
      cursor: "pointer",
      marginTop: "15px"
    },
    logoutButton: {
      width: "100%",
      padding: "10px",
      borderRadius: "8px",
      border: "none",
      background: "#dc2626",
      color: "white",
      fontWeight: "bold",
      cursor: "pointer",
      marginTop: "20px"
    },
    resultCard: {
      background: "#f3f4f6",
      padding: "12px",
      borderRadius: "10px",
      marginTop: "10px",
      boxShadow: "0 3px 8px rgba(0,0,0,0.05)"
    }
  };

  return (
    <>
      <div style={styles.sectionTitle}>Travel Preferences</div>

      <div style={styles.checkboxRow}>
        <label>
          <input
            type="checkbox"
            checked={warm}
            onChange={() => setWarm(!warm)}
          />{" "}
          Warm country
        </label>
      </div>

      <div style={styles.checkboxRow}>
        <label>
          <input
            type="checkbox"
            checked={beach}
            onChange={() => setBeach(!beach)}
          />{" "}
          Beach
        </label>
      </div>

      <input
        style={styles.input}
        type="number"
        value={days}
        onChange={(e) => setDays(Number(e.target.value))}
        placeholder="Number of days"
      />

      <input
        style={styles.input}
        value={comfortLevel}
        onChange={(e) => setComfortLevel(e.target.value)}
        placeholder="Comfort level (Luxury, Budget...)"
      />

      <button style={styles.primaryButton} onClick={getSuggestions}>
        {loading ? "Loading..." : "Get Suggestions"}
      </button>

      {suggestions.length > 0 && (
        <>
          <div style={styles.sectionTitle}>Suggestions</div>
          {suggestions.map((s, i) => (
            <div key={i} style={styles.resultCard}>
              <strong>{s.destination}</strong>
              <p style={{ margin: "5px 0 0 0" }}>{s.description}</p>
            </div>
          ))}
        </>
      )}

      <button style={styles.secondaryButton} onClick={getHistory}>
        Show History
      </button>

      {history.length > 0 && (
        <>
          <div style={styles.sectionTitle}>History</div>
          {history.map((h, i) => (
            <div key={i} style={styles.resultCard}>
              <strong>{h.destination}</strong>
              <p style={{ margin: "5px 0 0 0" }}>{h.description}</p>
            </div>
          ))}
        </>
      )}

      <button style={styles.logoutButton} onClick={logout}>
        Logout
      </button>
    </>
  );
}

export default Dashboard;
