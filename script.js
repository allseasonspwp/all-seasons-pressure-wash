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


document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("#quoteForm").forEach((form) => {
    const serviceBoxes = form.querySelectorAll('input[name="Requested Services[]"]');
    const fileInput = form.querySelector('input[name="attachment"]');
    const message = form.querySelector(".form-message");

    form.addEventListener("submit", (event) => {
      const hasService = Array.from(serviceBoxes).some((box) => box.checked);

      if (!hasService) {
        event.preventDefault();
        if (message) {
          message.textContent = "Please select at least one service.";
          message.classList.add("show", "error");
        }
        const selector = form.querySelector(".service-selector");
        if (selector) selector.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }

      if (fileInput && fileInput.files.length > 5) {
        event.preventDefault();
        if (message) {
          message.textContent = "Please select no more than 5 photos.";
          message.classList.add("show", "error");
        }
        return;
      }

      if (fileInput) {
        const oversized = Array.from(fileInput.files).some(
          (file) => file.size > 5 * 1024 * 1024
        );
        if (oversized) {
          event.preventDefault();
          if (message) {
            message.textContent = "Each photo must be 5 MB or smaller.";
            message.classList.add("show", "error");
          }
          return;
        }
      }

      if (message) {
        message.textContent = "Sending your quote request...";
        message.classList.remove("error");
        message.classList.add("show");
      }
    });

    serviceBoxes.forEach((box) => {
      box.addEventListener("change", () => {
        if (message && Array.from(serviceBoxes).some((item) => item.checked)) {
          message.textContent = "";
          message.classList.remove("show", "error");
        }
      });
    });
  });
});
