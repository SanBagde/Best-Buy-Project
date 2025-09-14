document.getElementById("signupForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  // Save user credentials to localStorage
  const user = { username, email, password };
  localStorage.setItem("user", JSON.stringify(user));
  alert("Signup successful! Redirecting to login page...");
  window.location.href = "login.html";
});
