
document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const usernameInput = document.getElementById("username").value.trim();
  const passwordInput = document.getElementById("password").value;

  const storedUser = JSON.parse(localStorage.getItem("user"));
  if (
    storedUser &&
    storedUser.username === usernameInput &&
    storedUser.password === passwordInput
  ) {
    alert("User login successful!");
    window.location.href = "index.html";
  } else {
    alert("Invalid username or password.");
  }
});

// Admin login modal logic
const loginContainer = document.getElementById("loginContainer");
const adminLoginBtn = document.getElementById("adminLoginBtn");
const adminModal = document.getElementById("adminModal");
const adminPasswordInput = document.getElementById("adminPassword");
const closeAdminModal = document.getElementById("closeAdminModal");


adminLoginBtn.addEventListener("click", () => {
  loginContainer.style.display = "none";
  adminModal.style.display = "flex";
  adminPasswordInput.value = "";
});

closeAdminModal.addEventListener("click", () => {
  adminModal.style.display = "none";
  loginContainer.style.display = "block";
});

// Also handle outside modal click
window.addEventListener("click", (e) => {
  if (e.target === adminModal) {
    adminModal.style.display = "none";
    loginContainer.style.display = "block";
  }
});


// Submit admin password
adminSubmitBtn.addEventListener("click", () => {
  if (adminPasswordInput.value === ADMIN_PASSWORD) {
    alert("Admin login successful!");
    window.location.href = "admin.html";
  } else {
    alert("Incorrect admin password!");
    adminPasswordInput.value = "";
  }
});


