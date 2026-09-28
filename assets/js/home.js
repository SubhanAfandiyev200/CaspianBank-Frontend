"use strict"

(function () {
  const toggle = document.querySelector(".nav-toggle");
  const header = document.querySelector(".site-header");
  toggle?.addEventListener("click", () => {
    const open = header.classList.toggle("is-open");
    header.classList.toggle("is-menu", open);
    toggle.setAttribute("aria-expanded", String(open));
  });
  const homeNav = document.querySelector(".nav-home");
const mega = document.getElementById("mega");
if (homeNav && mega && header) {
  let closeTimer = 0;
  const openMega = () => {
    clearTimeout(closeTimer);
    header.classList.add("is-mega");
  };
  const closeMega = () => {
    clearTimeout(closeTimer);
    closeTimer = setTimeout(() => header.classList.remove("is-mega"), 420);
  };
  homeNav.addEventListener("mouseenter", openMega);
  homeNav.addEventListener("mouseleave", closeMega);
  mega.addEventListener("mouseenter", openMega);
  mega.addEventListener("mouseleave", closeMega);
  homeNav.addEventListener("focusin", openMega);
  mega.addEventListener("focusout", (event) => {
    if (!mega.contains(event.relatedTarget)) header.classList.remove("is-mega");
  });
}
})();

