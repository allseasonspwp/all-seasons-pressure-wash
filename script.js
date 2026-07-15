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
  document.querySelectorAll(".compare").forEach((compare) => {
    const slider = compare.querySelector(".compare-slider, #slider");
    const wrap = compare.querySelector(".before-wrap, #beforeWrap");
    if (slider && wrap) {
      const update = () => { wrap.style.width = `${slider.value}%`; };
      slider.addEventListener("input", update);
      update();
    }
  });

  document.querySelectorAll(".track-call").forEach((link) => {
    link.addEventListener("click", () => {
      if (typeof gtag === "function") {
        gtag("event", "phone_click", {event_category: "lead", event_label: link.href});
      }
    });
  });

  document.querySelectorAll(".quote-track, #quoteForm").forEach((form) => {
    form.addEventListener("submit", () => {
      if (typeof gtag === "function") {
        gtag("event", "generate_lead", {event_category: "lead", event_label: "website_quote_form"});
      }
    });
  });
});
