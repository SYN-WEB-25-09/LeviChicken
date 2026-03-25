document.addEventListener("DOMContentLoaded", () => {

  // DOM-Elemente auswählen
  const form = document.getElementById("orderForm");
  const feedback = document.getElementById("orderFeedback");
  let cards = document.querySelectorAll(".card");

  // IntersectionObserver = Animation beim Scrollen
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  });

  // Animation auf vorhandene Karten anwenden
  cards.forEach(card => observer.observe(card));

  // =========================================================
  // API CALL
  // =========================================================

  // Externe Daten von einer API laden
  fetch("https://jsonplaceholder.typicode.com/posts?_limit=3")
    .then(response => response.json())
    .then(data => {
      const container = document.querySelector(".cards");

      data.forEach(item => {
        const apiCard = document.createElement("article");
        apiCard.classList.add("card");

        apiCard.innerHTML = `
          <div class="card__body">
            <h3>${item.title}</h3>
            <p>${item.body}</p>
          </div>
        `;

        container.appendChild(apiCard);
        observer.observe(apiCard);
      });
    })
    .catch(error => {
      console.error("API Fehler:", error);
    });

  // =========================================================
  // WHATSAPP FORMULAR
  // =========================================================

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