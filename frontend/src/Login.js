const login = async () => {
  try {
    const response = await fetch("https://localhost:7234/api/Auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        passwordHash: password
      })
    });

    const text = await response.text();
    alert(text);

    if (response.ok) {
      localStorage.setItem("isLoggedIn", "true");
      setIsLoggedIn(true);
    }
  } catch (error) {
    console.error("Login failed", error);
  }
};
