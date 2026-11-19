document.addEventListener("DOMContentLoaded", () => {
  // Set the public Cloudflare site key here after preparing the Web3Forms integration.
  // Store the secret key in Web3Forms only.
  const siteKey = "";
  if (!siteKey) return;

  const forms = document.querySelectorAll('form[action="https://api.web3forms.com/submit"]');
  if (!forms.length) return;

  const prompt = "Complete the security check before sending your quote. If it does not load, call or text 860-200-1187.";
  forms.forEach((form) => {
    const widget = document.createElement("div");
    widget.className = "cf-turnstile";
    widget.dataset.sitekey = siteKey;
    widget.dataset.size = "flexible";

    const status = document.createElement("p");
    status.className = "field-help";
    status.setAttribute("role", "status");

    const button = form.querySelector('button[type="submit"]');
    if (button) button.before(widget, status);
    else form.append(widget, status);

    form.addEventListener("submit", (event) => {
      const response = form.querySelector('input[name="cf-turnstile-response"]');
      if (response?.value) {
        status.textContent = "";
        return;
      }
      event.preventDefault();
      status.textContent = prompt;
    }, { capture: true });
  });

  const script = document.createElement("script");
  script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
  script.async = true;
  script.addEventListener("error", () => {
    forms.forEach((form) => {
      form.querySelector(".cf-turnstile").nextElementSibling.textContent = prompt;
    });
  });
  document.head.append(script);
});

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
    form.addEventListener("submit", (event) => {
      if (event.defaultPrevented) return;
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
      if (event.defaultPrevented) return;
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
        const allowedTypes = fileInput.accept.split(",");
        const invalidType = Array.from(fileInput.files).some((file) =>
          file.type ? !allowedTypes.includes(file.type) : !/\.(jpe?g|png|webp|hei[cf])$/i.test(file.name)
        );
        if (invalidType) {
          event.preventDefault();
          if (message) {
            message.textContent = "Please choose JPG, PNG, WebP, HEIC or HEIF photos.";
            message.classList.add("show", "error");
          }
          return;
        }

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


document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".gallery-compare").forEach((compare) => {
    const slider = compare.querySelector(".compare-slider");
    const beforeWrap = compare.querySelector(".before-wrap");
    const handle = compare.querySelector(".compare-handle");
    const beforeImage = compare.querySelector(".before-image");

    const update = () => {
      const value = slider.value;
      beforeWrap.style.width = `${value}%`;
      handle.style.left = `${value}%`;
      if (beforeImage) beforeImage.style.width = `${compare.clientWidth}px`;
    };

    slider.addEventListener("input", update);
    window.addEventListener("resize", update);
    update();
  });

  const filters = document.querySelectorAll(".gallery-filter");
  const projects = document.querySelectorAll(".project-card[data-category]");

  filters.forEach((button) => {
    button.addEventListener("click", () => {
      filters.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      const filter = button.dataset.filter;

      projects.forEach((project) => {
        const categories = project.dataset.category.split(" ");
        project.hidden = filter !== "all" && !categories.includes(filter);
      });
    });
  });
});
