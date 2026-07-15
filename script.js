document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".menu");
  const navLinks = document.querySelector(".navlinks");

  if (menuButton && navLinks) {
    menuButton.addEventListener("click", () => {
      navLinks.classList.toggle("open");
      const isOpen = navLinks.classList.contains("open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
      });
    });
  }

  const slider = document.querySelector("#slider");
  const beforeWrap = document.querySelector("#beforeWrap");

  if (slider && beforeWrap) {
    const updateComparison = () => {
      beforeWrap.style.width = `${slider.value}%`;
    };

    slider.addEventListener("input", updateComparison);
    updateComparison();
  }
});
