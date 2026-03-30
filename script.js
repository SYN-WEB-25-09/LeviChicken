document.addEventListener("DOMContentLoaded", () => {
  const PEXELS_API_KEY = "ZQENE97VQ3FTP5pTYGxXaiBKooiLzNmwGwLGuWSEYJZtRGX7QFYEERdh";
  const WHATSAPP_NUMBER = "22382208266";

  const form = document.getElementById("orderForm");
  const feedback = document.getElementById("orderFeedback");
  const searchBtn = document.getElementById("searchBtn");
  const searchInput = document.getElementById("searchInput");
  const resultsSection = document.getElementById("results");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
    }
  );

  document.querySelectorAll(".card").forEach((card) => {
    observer.observe(card);
  });

  async function searchPexels(query) {
    if (!resultsSection) return;

    resultsSection.innerHTML = "<p>Lade Bilder...</p>";

    try {
      const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=6`;

      const response = await fetch(url, {
        headers: {
          Authorization: PEXELS_API_KEY,
        },
      });

      if (!response.ok) {
        throw new Error("Pexels API Fehler");
      }

      const data = await response.json();

      if (!data.photos || data.photos.length === 0) {
        resultsSection.innerHTML =
          "<p style='padding:16px;color:#666;'>Kein Ergebnis gefunden.</p>";
        return;
      }

      displayPexelsResults(data.photos, query);
    } catch (error) {
      console.error("Erreur Pexels :", error);
      resultsSection.innerHTML =
        "<p style='padding:16px;color:red;'>Impossible de charger les images.</p>";
    }
  }

  function displayPexelsResults(photos, query) {
    const html = photos
      .map(
        (photo) => `
          <article class="result-card visible">
            <img src="${photo.src.medium}" alt="${photo.alt || query}" />
            <h3>${photo.alt || query}</h3>
            <p>📷 ${photo.photographer}</p>
            <a
              href="${photo.url}"
              target="_blank"
              rel="noopener noreferrer"
              style="display:inline-block;margin-top:10px;color:#16a34a;text-decoration:none;font-weight:600;"
            >
              Voir sur Pexels →
            </a>
          </article>
        `
      )
      .join("");

    resultsSection.innerHTML = html;
  }

  function handleOrderSubmit(e) {
    e.preventDefault();

    const name = document.getElementById("orderName")?.value.trim();
    const quantity = document.getElementById("orderQuantity")?.value.trim();
    const address = document.getElementById("orderAddress")?.value.trim();

    if (!name || !quantity || !address) {
      if (feedback) {
        feedback.textContent = "Veuillez remplir tous les champs.";
      }
      return;
    }

    const message = `Bonjour, je commande ${quantity} poulets. Nom : ${name}, Adresse : ${address}`;
    const url = `https://wa.me/${+4915568512248}?text=${encodeURIComponent(message)}`;

    if (feedback) {
      feedback.textContent = "Redirection vers WhatsApp...";
    }

    window.open(url, "_blank");
  }

  if (form) {
    form.addEventListener("submit", handleOrderSubmit);
  }

  if (searchBtn && searchInput) {
    searchBtn.addEventListener("click", () => {
      const query = searchInput.value.trim();

      if (!query) {
        resultsSection.innerHTML = "";
        return;
      }

      searchPexels(query);
    });

    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        searchBtn.click();
      }
    });
  }
});