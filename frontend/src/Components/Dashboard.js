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
logout

}) {
const styles = {
section: {
marginBottom: "15px"
},
button: {
width: "100%",
padding: "12px",
borderRadius: "8px",
border: "none",
background: "#4f46e5",
color: "white",
fontWeight: "bold",
cursor: "pointer",
marginTop: "10px"
},
resultCard: {
background: "#eef2ff",
padding: "12px",
borderRadius: "8px",
marginTop: "10px"
}
};

return (
<> <h3>Travel Preferences</h3>


  <div style={styles.section}>
    <label>
      <input
        type="checkbox"
        checked={warm}
        onChange={() => setWarm(!warm)}
      />{" "}
      Warm country
    </label>
  </div>

  <div style={styles.section}>
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
    type="number"
    value={days}
    onChange={e => setDays(Number(e.target.value))}
    placeholder="Days"
  />

  <input
    value={comfortLevel}
    onChange={e => setComfortLevel(e.target.value)}
    placeholder="Comfort level"
  />

  <button style={styles.button} onClick={getSuggestions}>
    {loading ? "Loading..." : "Get Suggestions"}
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


);
}

export default Dashboard;
