// =========================================================
// 1. THEME TOGGLE (dark / light) - remembers your choice
// =========================================================
const root = document.documentElement;
const themeBtn = document.getElementById("themeToggle");

function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  themeBtn.textContent = theme === "dark" ? "🌙" : "☀️";
}

let savedTheme = "dark";
try {
  savedTheme = localStorage.getItem("theme") || "dark";
} catch (e) {
  // localStorage can be blocked in some browsers; we simply use dark.
}
applyTheme(savedTheme);

themeBtn.addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  applyTheme(next);
  try { localStorage.setItem("theme", next); } catch (e) {}
});

// =========================================================
// 2. MOBILE MENU
// =========================================================
const menu = document.getElementById("menu");
const menuBtn = document.getElementById("menuToggle");

menuBtn.addEventListener("click", () => {
  const isOpen = menu.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(isOpen));
});

// Close the menu after tapping a link (phone)
menu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  });
});

// =========================================================
// 3. TYPING EFFECT in the hero section
//    Edit the roles array to change the words.
// =========================================================
const roles = [
  "IT Support Technician",
  "Graphic Designer",
  "Vibe Coder (AI-assisted)",
  "Aspiring Full-Stack Developer",
];
const typedEl = document.getElementById("typed");
let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function type() {
  const current = roles[roleIndex];

  if (!deleting) {
    charIndex++;
    typedEl.textContent = current.slice(0, charIndex);
    if (charIndex === current.length) {
      deleting = true;
      return setTimeout(type, 1600); // pause when the word is complete
    }
  } else {
    charIndex--;
    typedEl.textContent = current.slice(0, charIndex);
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(type, deleting ? 40 : 80);
}
type();

// =========================================================
// 4. SCROLL REVEAL ANIMATION
// =========================================================
const revealEls = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target); // animate only once
        }
      });
    },
    { threshold: 0.12 }
  );
  revealEls.forEach((el) => revealObserver.observe(el));
} else {
  // Very old browsers: just show everything
  revealEls.forEach((el) => el.classList.add("visible"));
}

// =========================================================
// 5. HIGHLIGHT THE ACTIVE MENU LINK WHILE SCROLLING
// =========================================================
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav__links a");

window.addEventListener("scroll", () => {
  let currentId = "";
  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 120) {
      currentId = section.id;
    }
  });
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === "#" + currentId);
  });
});

// =========================================================
// 6. CONTACT FORM
//    GitHub Pages has no server, so we open the visitor's email
//    app with the message already written (a "mailto" link).
// =========================================================
const MY_EMAIL = "Suhaypmaxamed15@gmail.com";
const form = document.getElementById("contactForm");
const statusEl = document.getElementById("formStatus");

form.addEventListener("submit", (event) => {
  event.preventDefault(); // stop the page from reloading

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  // Validation: check the input before using it
  const emailLooksValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!name || !message || !emailLooksValid) {
    statusEl.textContent = "Please fill in all fields with a valid email address.";
    statusEl.className = "small error";
    return;
  }

  const subject = encodeURIComponent("Portfolio message from " + name);
  const body = encodeURIComponent(message + "\n\nFrom: " + name + " (" + email + ")");
  window.location.href = "mailto:" + MY_EMAIL + "?subject=" + subject + "&body=" + body;

  statusEl.textContent = "Opening your email app...";
  statusEl.className = "small ok";
  form.reset();
});

// =========================================================
// 7. BACK-TO-TOP BUTTON
// =========================================================
const toTop = document.getElementById("toTop");
window.addEventListener("scroll", () => {
  toTop.classList.toggle("show", window.scrollY > 500);
});
toTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// =========================================================
// 8. FOOTER YEAR (updates itself every year)
// =========================================================
document.getElementById("year").textContent = new Date().getFullYear();
