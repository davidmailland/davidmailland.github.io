(() => {
  function init() {
    const lb = document.getElementById("lb");
    const lbImg = document.getElementById("lbImg");
    if (!lb || !lbImg) return;

    let scrollY = 0;
    let lastTrigger = null;

    function lockScroll() {
      scrollY = window.scrollY || window.pageYOffset || 0;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
    }

    function unlockScroll() {
      const y = scrollY;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      window.scrollTo(0, y);
    }

    function openLightbox(src, alt, triggerEl) {
      if (!src) return;
      lastTrigger = triggerEl || null;

      lockScroll();

      lbImg.src = src;
      lbImg.alt = alt || "";
      lb.classList.add("is-open");
      lb.setAttribute("aria-hidden", "false");
    }

    function closeLightbox() {
      lb.classList.remove("is-open");
      lb.setAttribute("aria-hidden", "true");

      // Important: restore scroll BEFORE clearing image (more stable in some browsers)
      unlockScroll();

      lbImg.src = "";
      lbImg.alt = "";

      // Return focus to the clicked thumbnail (prevents weird jumps/focus traps)
      if (lastTrigger && typeof lastTrigger.focus === "function") {
        lastTrigger.focus({ preventScroll: true });
      }
      lastTrigger = null;
    }

    // OPEN (capture phase)
    document.addEventListener(
      "click",
      (e) => {
        const btn = e.target.closest(".pub-thumbs .thumb[data-full]");
        if (!btn) return;
        e.preventDefault();
        e.stopImmediatePropagation();
        openLightbox(btn.getAttribute("data-full"), btn.getAttribute("data-alt"), btn);
      },
      true
    );

    // CLOSE (backdrop or close button)
    document.addEventListener(
      "click",
      (e) => {
        if (e.target.closest("#lb .lightbox__backdrop") || e.target.closest("#lb .lightbox__close")) {
          e.preventDefault();
          e.stopImmediatePropagation();
          closeLightbox();
        }
      },
      true
    );

    // ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && lb.classList.contains("is-open")) closeLightbox();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
