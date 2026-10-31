// =======================================
// HAFSA'S PORTFOLIO — INTERACTIONS
// =======================================

// 1. Mobile navigation menu
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Close the menu when a navigation link is selected.
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

// 2. Reveal elements as the visitor scrolls
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          currentObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  revealElements.forEach((element) => observer.observe(element));
} else {
  // Fallback for older browsers
  revealElements.forEach((element) => {
    element.classList.add("visible");
  });
}

// 3. Automatic copyright year
document.getElementById("currentYear").textContent =
  new Date().getFullYear();

// 4. Contact form: prepare an email
const contactForm = document.getElementById("contactForm");
const emailLink = document.getElementById("emailLink");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const recipient = emailLink.getAttribute("href")
    .replace(/^mailto:/i, "")
    .trim();

  // Remind the portfolio owner to configure their email.
  if (
    !recipient ||
    recipient.includes("YOUR_EMAIL") ||
    recipient.includes("example.com")
  ) {
    alert(
      "Please add your real email address to index.html first. " +
      "Then visitors can prepare messages for you."
    );
    return;
  }

  const name = document.getElementById("visitorName").value.trim();
  const senderEmail =
    document.getElementById("visitorEmail").value.trim();
  const message =
    document.getElementById("visitorMessage").value.trim();

  if (!name || !senderEmail || !message) {
    alert("Please fill in all the fields.");
    return;
  }

  const subject = encodeURIComponent(
    "Portfolio enquiry from " + name
  );

  const body = encodeURIComponent(
    "Hello Hafsa,\n\n" +
    message +
    "\n\nFrom: " + name +
    "\nReply email: " + senderEmail
  );

  window.location.href =
    "mailto:" + recipient +
    "?subject=" + subject +
    "&body=" + body;
});