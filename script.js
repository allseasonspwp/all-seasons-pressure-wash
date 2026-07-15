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
document.addEventListener("DOMContentLoaded", () => {
  const quoteForm = document.querySelector("#quoteForm");
  if (!quoteForm) return;

  quoteForm.addEventListener("submit", (event) => {
    const key = quoteForm.querySelector('input[name="access_key"]');
    if (!key || key.value.includes("PASTE_YOUR_WEB3FORMS_ACCESS_KEY_HERE")) {
      event.preventDefault();
      alert("The quote form is awaiting its Web3Forms access key. Please call or text 860-200-1187 while setup is completed.");
    }
  });
});
