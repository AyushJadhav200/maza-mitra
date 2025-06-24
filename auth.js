// ✅ Signup Logic
function signup() {
  const username = document.getElementById("signupUsername").value.trim();
  const password = document.getElementById("signupPassword").value.trim();
  const msg = document.getElementById("signupMsg");

  if (!username || !password) {
    msg.textContent = "⚠️ Please fill in all fields.";
    return;
  }

  localStorage.setItem("userName", username);
  localStorage.setItem("userPass", password);

  msg.textContent = "✅ Signup successful! Redirecting...";
  setTimeout(() => {
    window.location.href = "index.html"; // Login page
  }, 1500);
}

// ✅ Login Logic
function login() {
  const username = document.getElementById("loginUsername").value.trim();
  const password = document.getElementById("loginPassword").value.trim();
  const msg = document.getElementById("loginMsg");

  const storedUser = localStorage.getItem("userName");
  const storedPass = localStorage.getItem("userPass");

  if (username === storedUser && password === storedPass) {
    msg.textContent = "✅ Login successful! Redirecting...";
    setTimeout(() => {
      window.location.href = "home.html"; // Homepage
    }, 1500);
  } else {
    msg.textContent = "❌ Invalid username or password!";
  }
}
