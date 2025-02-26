document.addEventListener("DOMContentLoaded", function () {
  const text = "Frontend developer"; // Teksten der skal skrives
  let index = 0;
  const speed = 100; // Hastighed i millisekunder
  const h4 = document.getElementById("typewriter");

  // Typewriter-effekten
  function typeWriterEffect() {
    if (index < text.length) {
      h4.textContent += text.charAt(index);
      index++;
      setTimeout(typeWriterEffect, speed);
    } else {
      // Når typewriter-effekten er færdig, vent 20 sekunder og slet teksten
      setTimeout(deleteText, 20000); // 20 sekunder = 20000 millisekunder
    }
  }

  // Slet teksten én karakter ad gangen
  function deleteText() {
    let currentText = h4.textContent;
    let deleteIndex = currentText.length - 1;

    function deleteCharacter() {
      h4.textContent = currentText.slice(0, deleteIndex);
      deleteIndex--;
      if (deleteIndex >= 0) {
        setTimeout(deleteCharacter, speed);
      } else {
        // Når teksten er slettet, start typewriter-effekten igen
        setTimeout(function () {
          index = 0; // Nulstil index
          typeWriterEffect(); // Start typewriter-effekten igen
        }, 1000); // Vent 1 sekund før den starter forfra
      }
    }

    deleteCharacter();
  }

  typeWriterEffect(); // Start effekten
});

// Når der klikkes på pilen
document.addEventListener("DOMContentLoaded", function () {
  const scrollArrow = document.getElementById("scrollArrow"); // Hent pilen
  const nextSection = document.getElementById("nextSection"); // Hent næste sektion (med id "nextSection")

  scrollArrow.addEventListener("click", function () {
    nextSection.scrollIntoView({ behavior: "smooth" }); // Ruller til næste sektion med smooth scroll
  });
});

const slider = document.querySelector(".project-slider");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

// Dynamisk beregning af slide-bredde + gap
function getSlideWidth() {
  const firstSlide = slider.querySelector(".project");
  return firstSlide ? firstSlide.offsetWidth + 20 : 320; // Fallback til 320px, hvis ingen slide findes
}

// Funktion til at tjekke om pilene skal deaktiveres
function checkButtons() {
  prevBtn.classList.toggle("disabled", slider.scrollLeft === 0);
  nextBtn.classList.toggle("disabled", slider.scrollLeft + slider.clientWidth >= slider.scrollWidth);
}

// Event listener på pilene
nextBtn.addEventListener("click", () => {
  const slideWidth = getSlideWidth(); // Henter den aktuelle slide-bredde
  slider.scrollBy({ left: slideWidth, behavior: "smooth" });
  setTimeout(checkButtons, 300); // Opdater knap-status efter 300ms
});

prevBtn.addEventListener("click", () => {
  const slideWidth = getSlideWidth(); // Henter den aktuelle slide-bredde
  slider.scrollBy({ left: -slideWidth, behavior: "smooth" });
  setTimeout(checkButtons, 300); // Opdater knap-status efter 300ms
});

// Opdater pil-status ved scroll
slider.addEventListener("scroll", checkButtons);

// Sørger for at knapperne er korrekte fra start
window.addEventListener("load", checkButtons);
