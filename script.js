document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("orderForm");
  const feedback = document.getElementById("orderFeedback");
  const cards = document.querySelectorAll(".card");

  // Animation scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  });

  cards.forEach(card => observer.observe(card));

  // Formulaire WhatsApp
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("orderName").value.trim();
    const quantity = document.getElementById("orderQuantity").value.trim();
    const address = document.getElementById("orderAddress").value.trim();

    if (!name || !quantity || !address) {
      feedback.textContent = "Bitte alle Felder ausfüllen";
      return;
    }

    const message = `Hallo, ich bestelle ${quantity} Hähnchen. Name: ${name}, Adresse: ${address}`;
    const url = `https://wa.me/22370000000?text=${encodeURIComponent(message)}`;

    feedback.textContent = "Weiterleitung zu WhatsApp...";
    window.open(url, "_blank");
  });

});