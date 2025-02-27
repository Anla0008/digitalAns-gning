document.addEventListener("DOMContentLoaded", function () {
  const words = ["Frontend developer", "UX/UI Designer", "Web developer"]; // Liste med ord
  let wordIndex = 0; // Index for at holde styr på det nuværende ord
  let index = 0; // Index for at holde styr på den nuværende position i ordet
  const speed = 100; // Hastighed i millisekunder
  const h4 = document.getElementById("typewriter");

  // Typewriter-effekten
  function typeWriterEffect() {
    const currentWord = words[wordIndex]; // Hent det nuværende ord
    if (index < currentWord.length) {
      h4.textContent += currentWord.charAt(index);
      index++;
      setTimeout(typeWriterEffect, speed);
    } else {
      // Når typewriter-effekten er færdig, vent 3 sekunder og slet teksten
      setTimeout(deleteText, 3000); // 3 sekunder = 3000 millisekunder
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
        // Når teksten er slettet, skift til næste ord og start typewriter-effekten igen
        wordIndex = (wordIndex + 1) % words.length; // Skift ord (cyklisk)
        index = 0; // Nulstil index
        setTimeout(typeWriterEffect, 1000); // Vent 1 sekund før den starter med det næste ord
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

// Slider

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
