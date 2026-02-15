import React from "react";

function Auth({
  email,
  password,
  setEmail,
  setPassword,
  register,
  login
}) {
  return (
    <>
      <input
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
      />

      <button onClick={register}>Register</button>
      <button onClick={login}>Login</button>
    </>
  );
}

export default Auth;
