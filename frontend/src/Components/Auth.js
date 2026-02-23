import React from "react";

function Auth({
  email,
  password,
  setEmail,
  setPassword,
  register,
  login
}) {
  const styles = {
    input: {
      width: "100%",
      padding: "10px",
      marginTop: "10px",
      borderRadius: "8px",
      border: "1px solid #ddd",
      fontSize: "14px"
    },
    buttonPrimary: {
      width: "100%",
      padding: "10px",
      marginTop: "12px",
      borderRadius: "8px",
      border: "none",
      backgroundColor: "#2563eb",
      color: "white",
      fontWeight: "bold",
      cursor: "pointer"
    },
    buttonSecondary: {
      width: "100%",
      padding: "10px",
      marginTop: "8px",
      borderRadius: "8px",
      border: "none",
      backgroundColor: "#16a34a",
      color: "white",
      fontWeight: "bold",
      cursor: "pointer"
    }
  };

  return (
    <>
      <input
        style={styles.input}
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        style={styles.input}
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button style={styles.buttonSecondary} onClick={register}>
        Register
      </button>

      <button style={styles.buttonPrimary} onClick={login}>
        Login
      </button>
    </>
  );
}

export default Auth;

