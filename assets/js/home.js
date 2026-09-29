"use strict";

(function () {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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

  const video = document.getElementById("brand-video");
  const videoButton = document.getElementById("video-toggle");
  const videoFrame = document.getElementById("video-frame");
  if (video && videoButton && videoFrame) {
    const source = video.dataset.src;
    if (source) video.src = source;
    document.body.appendChild(videoButton);
    videoButton.hidden = false;
    videoButton.classList.add("video-cursor");
    let previewOn = false;
    const hasFile = () => Boolean(video.getAttribute("src") || video.dataset.src);
    const label = () => {
      const playing = hasFile() ? !video.paused : previewOn;
      videoButton.textContent = playing ? "Stop" : "Play";
    };
    const place = (event) => {
      videoButton.style.left = event.clientX + "px";
      videoButton.style.top = event.clientY + "px";
    };
    label();
    videoFrame.addEventListener("pointermove", (event) => {
      videoFrame.classList.add("is-cursor");
      videoButton.classList.add("is-on");
      place(event);
    });
    videoFrame.addEventListener("pointerleave", () => {
      videoFrame.classList.remove("is-cursor");
      videoButton.classList.remove("is-on");
    });
    videoFrame.addEventListener("click", () => {
      if (hasFile()) {
        if (video.paused) video.play();
        else video.pause();
      } else {
        previewOn = !previewOn;
        label();
      }
    });
    video.addEventListener("play", label);
    video.addEventListener("pause", label);
  }

  if (!window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);
  const hasInertia = typeof window.InertiaPlugin !== "undefined";
  if (window.Draggable && hasInertia) gsap.registerPlugin(Draggable, InertiaPlugin);
  else if (window.Draggable) gsap.registerPlugin(Draggable);

  const fanFrom = [
    { x: 28, y: 34, rotation: 7 },
    { x: 6, y: 12, rotation: 10 },
    { x: -18, y: 40, rotation: 13 }
  ];
  const fanTo = [
    { x: 72, y: 6, rotation: 6 },
    { x: -16, y: -24, rotation: 18 },
    { x: -108, y: 52, rotation: 28 }
  ];
  const cards = gsap.utils.toArray(".fan-card");
  if (reduce) {
    cards.forEach((card, i) => gsap.set(card, { ...fanTo[i], opacity: 1 }));
  } else {
    gsap.fromTo(cards,
      {
        x: (i) => fanFrom[i].x,
        y: (i) => fanFrom[i].y,
        rotation: (i) => fanFrom[i].rotation,
        opacity: 1
      },
      {
        x: (i) => fanTo[i].x,
        y: (i) => fanTo[i].y,
        rotation: (i) => fanTo[i].rotation,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top 62%",
          end: "center 36%",
          scrub: 0.6
        }
      }
    );
  }
})();