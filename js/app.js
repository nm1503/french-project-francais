// app.js — Dark Mode, Search, Init (simplified — no modal, no filters)

const AppModule = (() => {
  // --- Dark Mode ---
  function initDarkMode() {
    const toggle = document.getElementById("theme-toggle");
    if (!toggle) return;
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      document.body.classList.add("dark-mode");
    }
    toggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      const isDark = document.body.classList.contains("dark-mode");
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });
  }

  // --- Search ---
  function initSearch() {
    const input = document.getElementById("search-input");
    const resultsContainer = document.getElementById("search-results");
    if (!input || !resultsContainer) return;

    input.addEventListener("input", () => {
      const query = input.value.trim().toLowerCase();
      if (query.length < 2) {
        resultsContainer.classList.remove("active");
        resultsContainer.innerHTML = "";
        if (typeof MapModule !== "undefined") MapModule.dimAllExcept([]);
        return;
      }

      const matches = Object.entries(REGIONS).filter(([id, data]) => {
        return data.nom.toLowerCase().includes(query) ||
               data.capitale.toLowerCase().includes(query) ||
               data.sitesTouristiques.some(s => s.toLowerCase().includes(query)) ||
               data.specialites.some(s => s.toLowerCase().includes(query));
      });

      if (matches.length === 0) {
        resultsContainer.innerHTML = `<div class="search-result-item" style="color:var(--text-muted);cursor:default;">Aucun résultat trouvé</div>`;
        resultsContainer.classList.add("active");
        if (typeof MapModule !== "undefined") MapModule.dimAllExcept([]);
        return;
      }

      resultsContainer.innerHTML = matches.map(([id, data]) =>
        `<div class="search-result-item" data-region="${id}">
          <strong>${data.nom}</strong>
          <span style="color:var(--text-muted);font-size:0.78rem;margin-left:0.5rem;">${data.capitale}</span>
        </div>`
      ).join("");

      resultsContainer.classList.add("active");

      // Highlight matching regions on map
      if (typeof MapModule !== "undefined") MapModule.dimAllExcept(matches.map(([id]) => id));

      // Click on search result → go to detail page
      resultsContainer.querySelectorAll(".search-result-item[data-region]").forEach(item => {
        item.addEventListener("click", () => {
          const regionId = item.getAttribute("data-region");
          window.location.href = `region.html?id=${regionId}`;
        });
      });
    });

    // Close search results on click outside
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".search-container")) {
        resultsContainer.classList.remove("active");
      }
    });
  }

  // --- Mobile menu ---
  function initMobileMenu() {
    const btn = document.getElementById("mobile-menu-btn");
    const controls = document.getElementById("header-controls");
    if (btn && controls) {
      btn.addEventListener("click", () => {
        controls.classList.toggle("collapsed");
      });
    }
  }

  // --- Map Controls ---
  function initMapControls() {
    const zoomInBtn = document.getElementById("zoom-in");
    const zoomOutBtn = document.getElementById("zoom-out");
    const zoomResetBtn = document.getElementById("zoom-reset");
    if (zoomInBtn) zoomInBtn.addEventListener("click", () => MapModule.zoomIn());
    if (zoomOutBtn) zoomOutBtn.addEventListener("click", () => MapModule.zoomOut());
    if (zoomResetBtn) zoomResetBtn.addEventListener("click", () => MapModule.resetView());
  }

  // --- Init ---
  function init() {
    initDarkMode();
    initSearch();
    initMobileMenu();

    // Render map if map container exists (homepage only)
    const mapContainer = document.getElementById("map-container");
    if (mapContainer && typeof MapModule !== "undefined") {
      MapModule.createSVG(mapContainer);
      initMapControls();
    }

    // Collapsed controls on mobile by default
    if (window.innerWidth <= 768) {
      const controls = document.getElementById("header-controls");
      if (controls) controls.classList.add("collapsed");
    }
  }

  // DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  return {};
})();
