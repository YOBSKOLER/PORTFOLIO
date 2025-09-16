// ================= toggle style switcher ===================
const styleSwitcher = document.querySelector(".style-switcher");
const styleSwitcherToggler = document.querySelector(".style-switcher-toggler");

// Toggle du panneau au clic sur l'icône des paramètres
if (styleSwitcherToggler && styleSwitcher) {
  styleSwitcherToggler.addEventListener("click", () => {
    styleSwitcher.classList.toggle("open");
  });
}

// Masquer le panneau quand on scrolle
window.addEventListener("scroll", () => {
  styleSwitcher.classList.remove("open");
});

// ================= theme colors  ===================
const alternateStyles = document.querySelectorAll(".alternate-style");
function setActiveStyle(color) {
  alternateStyles.forEach((style) => {
    if (color === style.getAttribute("title")) {
      style.removeAttribute("disabled");
    } else {
      style.setAttribute("disabled", "true");
    }
  });
}

// ===== change links color =====
document.querySelectorAll(".style-switcher-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    setActiveStyle(this.dataset.color);
    document.body.classList.add("switch-anim");
    setTimeout(() => document.body.classList.remove("switch-anim"), 400);
  });
});
