"use strict"

(function () {
  const root = document.getElementById("dash");
  const skel = document.getElementById("dash-skel");

  function greeting(name) {
    const hour = new Date().getHours();
    const hello = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
    return hello + ", " + name;
  }

  function render() {
    const state = CaspianStore.get();
    const first = state.profile?.firstName || "there";
    document.getElementById("dash-title").textContent = greeting(first);
    if (!state.cards.length) {
      root.innerHTML = '<div class="empty"><h3>Add your first cards</h3><p>Your account includes a Main card and a Cashback card.</p><a class="btn btn-primary" href="add-card.html">Create my cards</a></div>';
      return;
    }
    root.innerHTML = '<section class="surface"><h2>Recent activity</h2></section>';
  }

  skel.hidden = true;
  root.hidden = false;
  render();
})();