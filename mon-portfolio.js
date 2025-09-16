// ============ typing animation ============
// Liste des textes à afficher
// Liste des textes à afficher
const texts = [
  "Développeuse web & mobile",
  "Experte wordpress",
  "Designer graphique et web",
];
let currentTextIndex = 0;
let currentCharIndex = 0;
const typingElement = document.querySelector(".typing");

// Fonction pour créer l'effet de saisie
function typeText() {
  const currentText = texts[currentTextIndex];

  // Réinitialiser l'élément et commencer à saisir
  typingElement.textContent = currentText.substring(0, currentCharIndex + 1);

  // Si tous les caractères ont été tapés, on change de texte après une pause
  if (currentCharIndex < currentText.length - 1) {
    currentCharIndex++;
  } else {
    setTimeout(() => {
      // Réinitialiser pour le texte suivant
      currentCharIndex = 0;
      currentTextIndex = (currentTextIndex + 1) % texts.length; // Passer au texte suivant
    }, 2000); // Attendre 2 secondes avant de passer au texte suivant
  }
}

// Démarrer l'effet de saisie
setInterval(typeText, 150); // Intervalle de 150ms pour chaque caractère

// ===== change links color =====
// alert("hello world");

document.addEventListener("DOMContentLoaded", function () {
  const progressBars = document.querySelectorAll(".progress-in");

  progressBars.forEach((bar) => {
    const percent = bar.nextElementSibling.textContent.trim();
    bar.style.width = percent;
  });
});

document.querySelectorAll(".portfolio-item").forEach((item) => {
  item.addEventListener("mouseover", function () {
    this.querySelector(".portfolio-item-inner").style.transform = "scale(1.05)";
    this.querySelector(".portfolio-img").style.transform = "scale(1.1)";
  });
  item.addEventListener("mouseout", function () {
    this.querySelector(".portfolio-item-inner").style.transform = "scale(1)";
    this.querySelector(".portfolio-img").style.transform = "scale(1)";
  });
});

document.querySelectorAll(".portfolio-item a").forEach((button) => {
  button.addEventListener("mouseover", function () {
    this.style.backgroundColor = " rgba(255, 165, 0, 0.8)";
  });
  button.addEventListener("mouseout", function () {
    this.style.backgroundColor = "#fa5b0f";
  });
});
