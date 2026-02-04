(() => {
  function init() {
    const lb = document.getElementById("lb");
    const lbImg = document.getElementById("lbImg");
    if (!lb || !lbImg) return;

    function openLightbox(src, alt) {
      if (!src) return;
      lbImg.src = src;
      lbImg.alt = alt || "";
      lb.classList.add("is-open");
      lb.setAttribute("aria-hidden", "false");
      document.documentElement.style.overflow = "hidden";
    }

    function closeLightbox() {
      lb.classList.remove("is-open");
      lb.setAttribute("aria-hidden", "true");
      document.documentElement.style.overflow = "";
      lbImg.src = "";
      lbImg.alt = "";
    }

    // OPEN (capture phase)
    document.addEventListener("click", (e) => {
      const btn = e.target.closest(".pub-thumbs .thumb[data-full]");
      if (!btn) return;
      e.preventDefault();
      e.stopImmediatePropagation();
      openLightbox(btn.getAttribute("data-full"), btn.getAttribute("data-alt"));
    }, true);

    // CLOSE
    document.addEventListener("click", (e) => {
      if (e.target.closest("#lb .lightbox__backdrop") || e.target.closest("#lb .lightbox__close")) {
        e.preventDefault();
        e.stopImmediatePropagation();
        closeLightbox();
      }
    }, true);

    // ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeLightbox();
    });
  }

  // Jekyll themes sometimes load content before scripts: wait for DOM
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
