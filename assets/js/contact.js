"use strict"

(function () {
  const form = document.getElementById("contact-form");
  const list = document.getElementById("ticket-list");
  const as = document.getElementById("contact-as");

  function render() {
    const state = CaspianStore.get();
    if (!state.session) {
      as.textContent = "Sign in to write to support and see earlier messages.";
      form.querySelector("button[type=submit]").disabled = true;
      list.innerHTML = '<div class="empty"><h3>Sign in required</h3><p>Your message history is available after you sign in.</p><a class="btn btn-primary" href="login.html">Sign in</a></div>';
      return;
    }
    as.textContent = "Sending as " + state.session.name + ".";
    form.querySelector("button[type=submit]").disabled = false;
    const tickets = state.tickets.filter((ticket) => ticket.email.toLowerCase() === state.session.email.toLowerCase());
    list.innerHTML = tickets.length ? tickets.map((ticket) => `
      <article class="thread">
        <div class="spread">
          <h3>${BankUI.esc(ticket.subject)}</h3>
        </div>
        <div class="bubble">
          <p class="meta">You · ${BankUI.formatDateTime(ticket.created)}</p>
          <p>${BankUI.esc(ticket.message)}</p>
        </div>
      </article>`).join("") : '<div class="empty"><h3>No messages yet</h3><p>When you write to us, the thread will stay here.</p></div>';
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const state = CaspianStore.get();
    if (!state.session) return;
    const subject = document.getElementById("subject");
    const message = document.getElementById("message");
    if (!subject.value.trim() || message.value.trim().length < 10) return;
    CaspianStore.update((next) => {
      next.tickets.unshift({
        id: BankUI.uid("t"),
        name: next.session.name,
        email: next.session.email,
        subject: subject.value.trim(),
        message: message.value.trim(),
        status: "Pending",
        created: new Date().toISOString(),
        reply: "",
        repliedAt: null
      });
    });
    form.reset();
    render();
  });

  render();
})();