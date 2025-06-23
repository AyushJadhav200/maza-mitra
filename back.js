// ✅ Toast Welcome Message & Theme Load
window.onload = function () {
  showToast("👋 Welcome to MazaMitra! Your digital helper 🇮🇳");
  showOnScroll();
  loadTheme();
  loadNews();
};

// ✅ Load Saved Theme
function loadTheme() {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    const btn = document.getElementById("darkToggle");
    if (btn) btn.innerText = "☀ Light Mode";
  }
}

// ✅ Toast Function
function showToast(message) {
  const toast = document.createElement("div");
  toast.innerText = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    background: #004aad;
    color: white;
    padding: 12px 20px;
    border-radius: 30px;
    font-weight: bold;
    z-index: 9999;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    transition: opacity 0.5s ease;
  `;
  document.body.appendChild(toast);
  setTimeout(() => (toast.style.opacity = "0"), 3000);
  setTimeout(() => toast.remove(), 3500);
}

// ✅ Dark Mode Toggle
function toggleDarkMode() {
  const isDark = document.body.classList.toggle("dark-mode");
  const btn = document.getElementById("darkToggle");
  if (btn) btn.innerText = isDark ? "☀ Light Mode" : "🌙 Dark Mode";
  localStorage.setItem("theme", isDark ? "dark" : "light");
}

// ✅ Fade-In on Scroll
const faders = document.querySelectorAll(".fade-in");
function showOnScroll() {
  faders.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add("visible");
    }
  });
}

// ✅ Load News from API (using proxy to avoid CORS)
function loadNews() {
  const url = `https://api.allorigins.win/get?url=${encodeURIComponent("https://gnews.io/api/v4/top-headlines?lang=en&country=in&max=5&apikey=93d71a4aadba5eaa3070174b89d11609")}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const parsed = JSON.parse(data.contents);
      const articles = parsed.articles;
      const newsContainer = document.getElementById("news-section");
      newsContainer.innerHTML = ""; // clear old static news
      articles.forEach((article) => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <h3>📰 ${article.title}</h3>
          <p>${article.description || "No description available."}</p>
          <a href="${article.url}" target="_blank" class="btn">Read More</a>
        `;
        newsContainer.appendChild(card);
      });
    })
    .catch((err) => {
      console.error("News Load Failed:", err);
      document.getElementById("news-section").innerHTML = `
        <div class="card">
          <h3>⚠ Unable to Load News</h3>
          <p>Live news failed to load. Please try again later.</p>
        </div>
      `;
    });
}

// ✅ All Calculators & Tools Below 👇

function calculateAge() {
  const dob = new Date(document.getElementById("dob").value);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
  document.getElementById("ageResult").innerText = 'Your age is ${age} years.';
}

function calculateEMI() {
  const P = parseFloat(document.getElementById("amount").value);
  const R = parseFloat(document.getElementById("rate").value) / 12 / 100;
  const N = parseFloat(document.getElementById("months").value);
  if (P && R && N) {
    const emi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    document.getElementById("emiResult").innerText = 'Monthly EMI: ₹${emi.toFixed(2)}';
  } else {
    document.getElementById("emiResult").innerText = "Please fill all fields.";
  }
}

function calculateGST() {
  const amount = parseFloat(document.getElementById("gstAmount").value);
  const rate = parseFloat(document.getElementById("gstRate").value);
  if (amount && rate) {
    const gst = (amount * rate) / 100;
    const total = amount + gst;
    document.getElementById("gstResult").innerText = 'GST: ₹${gst.toFixed(2)}, Total: ₹${total.toFixed(2)}';
  } else {
    document.getElementById("gstResult").innerText = "Please enter valid inputs.";
  }
}

function calculatePercentage() {
  const base = parseFloat(document.getElementById("percentBase").value);
  const percent = parseFloat(document.getElementById("percentVal").value);
  if (base && percent) {
    const result = (base * percent) / 100;
    document.getElementById("percentResult").innerText = '${percent}% of ₹${base} is ₹${result.toFixed(2)}';
  } else {
    document.getElementById("percentResult").innerText = "Please fill both fields.";
  }
}

function calculateDateDiff() {
  const start = new Date(document.getElementById("startDate").value);
  const end = new Date(document.getElementById("endDate").value);
  if (start && end) {
    const diff = Math.abs(end - start);
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    document.getElementById("dateDiffResult").innerText = 'Difference: ${days} days';
  } else {
    document.getElementById("dateDiffResult").innerText = "Please select both dates.";
  }
}

function calculateFD() {
  const P = parseFloat(document.getElementById("fdPrincipal").value);
  const R = parseFloat(document.getElementById("fdRate").value) / 100;
  const T = parseFloat(document.getElementById("fdYears").value);
  if (P && R && T) {
    const A = P * Math.pow(1 + R, T);
    const interest = A - P;
    document.getElementById("fdResult").innerText = 'Interest: ₹${interest.toFixed(2)}, Total: ₹${A.toFixed(2)}';
  } else {
    document.getElementById("fdResult").innerText = "Please fill all fields.";
  }
}

function generatePassword() {
  const length = parseInt(document.getElementById("passLength").value);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
  let password = "";
  if (!length || length < 4) {
    document.getElementById("passwordResult").innerText = "Minimum 4 characters required.";
    return;
  }
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  document.getElementById("passwordResult").innerText = 'Password: ${password}';
}
// 🔽 Toggle Dropdown
const profileBtn = document.getElementById("profileBtn");
const dropdownMenu = document.getElementById("dropdownMenu");

if (profileBtn && dropdownMenu) {
  profileBtn.addEventListener("click", (e) => {
    dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
    e.stopPropagation();
  });

  // Close dropdown when clicking outside
  window.addEventListener("click", () => {
    dropdownMenu.style.display = "none";
  });
}

// 🔄 Load User Info from LocalStorage
const userName = localStorage.getItem("userName") || "User";
const userNameElement = document.getElementById("userName");
if (userNameElement) userNameElement.innerText = `Hi, ${userName}`;

// 🧑‍💻 Edit Profile
function goToProfile() {
  window.location.href = "profile.html";
}

// 🚪 Logout
function logoutUser() {
  localStorage.clear();
  alert("You have been logged out.");
  window.location.href = "login.html";
}
function toggleDropdown() {
  const dropdown = document.querySelector(".profile-dropdown");
  dropdown.classList.toggle("open");
}

function editProfile() {
  showToast("📝 Edit Profile clicked.");
}

function logout() {
  localStorage.clear();
  showToast("👋 Logged out successfully.");
  window.location.href = "login.html";
}
function toggleDropdown() {
  const dropdown = document.querySelector(".profile-dropdown");
  dropdown.classList.toggle("open");
}

function editProfile() {
  showToast("📝 Edit Profile clicked.");
}

function logout() {
  localStorage.clear();
  showToast("👋 Logged out successfully.");
  window.location.href = "login.html";
}
