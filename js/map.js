// map.js — SVG Map Rendering, Hover Tooltips, Click Modal, Zoom/Pan

const MapModule = (() => {
  // SVG paths for all 13 metropolitan regions of France (simplified but recognizable)
  const regionPaths = {
    "hauts-de-france": {
      d: "M350,20 L420,25 L460,55 L470,95 L440,120 L400,140 L350,135 L310,145 L280,130 L260,100 L270,60 L300,30 Z",
      labelX: 365, labelY: 85
    },
    "ile-de-france": {
      d: "M310,145 L350,135 L400,140 L390,170 L380,200 L340,210 L300,195 L290,165 Z",
      labelX: 345, labelY: 175
    },
    "grand-est": {
      d: "M400,140 L440,120 L470,95 L510,100 L540,130 L550,175 L530,220 L490,240 L450,230 L420,210 L390,170 Z",
      labelX: 475, labelY: 170
    },
    "normandie": {
      d: "M160,100 L210,80 L270,60 L260,100 L280,130 L310,145 L290,165 L240,170 L190,155 L150,135 Z",
      labelX: 225, labelY: 125
    },
    "bretagne": {
      d: "M40,135 L90,110 L150,100 L160,100 L150,135 L190,155 L175,185 L130,200 L75,195 L30,175 Z",
      labelX: 110, labelY: 155
    },
    "pays-de-la-loire": {
      d: "M130,200 L175,185 L190,155 L240,170 L290,165 L300,195 L290,235 L260,270 L210,280 L160,265 L120,240 Z",
      labelX: 210, labelY: 225
    },
    "centre-val-de-loire": {
      d: "M300,195 L340,210 L380,200 L390,170 L420,210 L410,260 L380,290 L340,300 L290,285 L260,270 L290,235 Z",
      labelX: 345, labelY: 245
    },
    "bourgogne-franche-comte": {
      d: "M420,210 L450,230 L490,240 L530,220 L540,260 L520,310 L480,330 L440,320 L410,300 L380,290 L410,260 Z",
      labelX: 470, labelY: 275
    },
    "nouvelle-aquitaine": {
      d: "M120,240 L160,265 L210,280 L260,270 L290,285 L340,300 L380,290 L370,340 L350,390 L320,430 L280,460 L230,450 L180,420 L140,370 L110,310 Z",
      labelX: 245, labelY: 365
    },
    "auvergne-rhone-alpes": {
      d: "M380,290 L410,300 L440,320 L480,330 L520,310 L540,340 L530,390 L500,420 L460,430 L420,410 L380,380 L360,350 L370,340 Z",
      labelX: 450, labelY: 365
    },
    "occitanie": {
      d: "M180,420 L230,450 L280,460 L320,430 L350,390 L370,340 L360,350 L380,380 L420,410 L400,450 L370,490 L320,510 L260,510 L210,490 L170,460 Z",
      labelX: 300, labelY: 460
    },
    "provence-alpes-cote-d-azur": {
      d: "M420,410 L460,430 L500,420 L530,390 L560,400 L575,440 L550,470 L510,490 L460,480 L430,460 L400,450 Z",
      labelX: 490, labelY: 445
    },
    "corse": {
      d: "M580,410 L600,400 L615,420 L620,460 L610,500 L595,520 L580,510 L575,470 Z",
      labelX: 597, labelY: 465
    }
  };

  let svgElement = null;
  let currentTransform = { x: 0, y: 0, scale: 1 };
  let isDragging = false;
  let dragStart = { x: 0, y: 0 };
  let mapGroup = null;

  function createSVG(container) {
    // SVG with viewBox for responsive sizing
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 650 550");
    svg.setAttribute("id", "france-map");
    svg.style.width = "100%";
    svg.style.height = "auto";

    // Defs for filters
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");

    // Paris glow filter
    const glowFilter = document.createElementNS("http://www.w3.org/2000/svg", "filter");
    glowFilter.setAttribute("id", "paris-glow");
    glowFilter.setAttribute("x", "-30%");
    glowFilter.setAttribute("y", "-30%");
    glowFilter.setAttribute("width", "160%");
    glowFilter.setAttribute("height", "160%");

    const feGaussian = document.createElementNS("http://www.w3.org/2000/svg", "feGaussianBlur");
    feGaussian.setAttribute("stdDeviation", "4");
    feGaussian.setAttribute("result", "glow");

    const feMerge = document.createElementNS("http://www.w3.org/2000/svg", "feMerge");
    const feMergeGlow = document.createElementNS("http://www.w3.org/2000/svg", "feMergeNode");
    feMergeGlow.setAttribute("in", "glow");
    const feMergeOrig = document.createElementNS("http://www.w3.org/2000/svg", "feMergeNode");
    feMergeOrig.setAttribute("in", "SourceGraphic");
    feMerge.appendChild(feMergeGlow);
    feMerge.appendChild(feMergeOrig);

    glowFilter.appendChild(feGaussian);
    glowFilter.appendChild(feMerge);
    defs.appendChild(glowFilter);
    svg.appendChild(defs);

    // Map group for transforms (zoom/pan)
    mapGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    mapGroup.setAttribute("id", "map-group");

    // Background shape of France outline (subtle)
    const bgRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    bgRect.setAttribute("width", "650");
    bgRect.setAttribute("height", "550");
    bgRect.setAttribute("fill", "transparent");
    mapGroup.appendChild(bgRect);

    // Render each region
    Object.entries(regionPaths).forEach(([id, region]) => {
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", region.d);
      path.setAttribute("data-region", id);
      path.classList.add("region-path");

      // Special styling for Île-de-France (Paris)
      if (id === "ile-de-france") {
        path.classList.add("paris");
        path.setAttribute("filter", "url(#paris-glow)");
      }

      // Event listeners
      path.addEventListener("mouseenter", (e) => onRegionHover(e, id));
      path.addEventListener("mousemove", (e) => onRegionMove(e));
      path.addEventListener("mouseleave", () => onRegionLeave());
      path.addEventListener("click", () => onRegionClick(id));

      mapGroup.appendChild(path);

      // Labels
      const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
      label.setAttribute("x", region.labelX);
      label.setAttribute("y", region.labelY);
      label.classList.add("region-label");
      label.textContent = REGIONS[id] ? REGIONS[id].nom : id;
      mapGroup.appendChild(label);
    });

    // Paris marker dot
    const parisMarker = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    parisMarker.setAttribute("cx", "345");
    parisMarker.setAttribute("cy", "165");
    parisMarker.setAttribute("r", "5");
    parisMarker.setAttribute("fill", "#ED2939");
    parisMarker.setAttribute("stroke", "#fff");
    parisMarker.setAttribute("stroke-width", "2");
    parisMarker.style.filter = "drop-shadow(0 0 6px rgba(237,41,57,0.5))";
    parisMarker.style.pointerEvents = "none";
    mapGroup.appendChild(parisMarker);

    // Paris label
    const parisLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
    parisLabel.setAttribute("x", "355");
    parisLabel.setAttribute("y", "160");
    parisLabel.style.fontFamily = "'Playfair Display', serif";
    parisLabel.style.fontSize = "10px";
    parisLabel.style.fontWeight = "700";
    parisLabel.style.fill = "#ED2939";
    parisLabel.style.pointerEvents = "none";
    parisLabel.textContent = "★ Paris";
    mapGroup.appendChild(parisLabel);

    svg.appendChild(mapGroup);
    container.appendChild(svg);
    svgElement = svg;

    setupZoomPan(svg);
  }

  // --- Hover ---
  function onRegionHover(e, regionId) {
    const data = REGIONS[regionId];
    if (!data) return;

    const tooltip = document.getElementById("tooltip");
    tooltip.querySelector(".tooltip__title").textContent = data.nom;
    tooltip.querySelector("#tip-climate").textContent = data.climat;
    tooltip.querySelector("#tip-population").textContent = data.population;

    const attractionsEl = tooltip.querySelector("#tip-attractions");
    attractionsEl.innerHTML = data.sitesTouristiques.slice(0, 4).map(a =>
      `<span>${a}</span>`
    ).join("");

    tooltip.classList.add("visible");
    positionTooltip(e);

    // Highlight the path
    const path = svgElement.querySelector(`[data-region="${regionId}"]`);
    if (path) path.classList.add("active");
  }

  function onRegionMove(e) {
    positionTooltip(e);
  }

  function onRegionLeave() {
    const tooltip = document.getElementById("tooltip");
    tooltip.classList.remove("visible");

    // Remove active class from all paths
    svgElement.querySelectorAll(".region-path.active").forEach(p => p.classList.remove("active"));
  }

  function positionTooltip(e) {
    const tooltip = document.getElementById("tooltip");
    const padding = 15;
    let x = e.clientX + padding;
    let y = e.clientY + padding;

    // Adjust if tooltip goes off-screen
    const rect = tooltip.getBoundingClientRect();
    if (x + rect.width > window.innerWidth - 20) {
      x = e.clientX - rect.width - padding;
    }
    if (y + rect.height > window.innerHeight - 20) {
      y = e.clientY - rect.height - padding;
    }

    tooltip.style.left = x + "px";
    tooltip.style.top = y + "px";
  }

  // --- Click ---
  function onRegionClick(regionId) {
    const data = REGIONS[regionId];
    if (!data) return;
    // Navigate to full detail page
    window.location.href = `region.html?id=${regionId}`;
  }

  // --- Zoom & Pan (viewBox-based — map stays inside box) ---
  const baseViewBox = { x: 0, y: 0, w: 650, h: 550 };
  let viewBox = { ...baseViewBox };

  function setupZoomPan(svg) {
    svg.addEventListener("wheel", (e) => {
      e.preventDefault();
      const zoomFactor = e.deltaY > 0 ? 1.1 : 0.9;
      const rect = svg.getBoundingClientRect();
      const mx = (e.clientX - rect.left) / rect.width;
      const my = (e.clientY - rect.top) / rect.height;
      const newW = Math.max(100, Math.min(baseViewBox.w * 2, viewBox.w * zoomFactor));
      const newH = Math.max(85, Math.min(baseViewBox.h * 2, viewBox.h * zoomFactor));
      viewBox.x += (viewBox.w - newW) * mx;
      viewBox.y += (viewBox.h - newH) * my;
      viewBox.w = newW;
      viewBox.h = newH;
      applyViewBox();
    }, { passive: false });

    svg.addEventListener("mousedown", (e) => {
      if (e.target.classList.contains("region-path")) return;
      isDragging = true;
      dragStart.x = e.clientX;
      dragStart.y = e.clientY;
      svg.style.cursor = "grabbing";
    });

    window.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      const rect = svgElement.getBoundingClientRect();
      const dx = (e.clientX - dragStart.x) * (viewBox.w / rect.width);
      const dy = (e.clientY - dragStart.y) * (viewBox.h / rect.height);
      viewBox.x -= dx;
      viewBox.y -= dy;
      dragStart.x = e.clientX;
      dragStart.y = e.clientY;
      applyViewBox();
    });

    window.addEventListener("mouseup", () => {
      isDragging = false;
      if (svgElement) svgElement.style.cursor = "grab";
    });

    let lastTouchDist = 0;
    svg.addEventListener("touchstart", (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        dragStart.x = e.touches[0].clientX;
        dragStart.y = e.touches[0].clientY;
      } else if (e.touches.length === 2) {
        lastTouchDist = getTouchDistance(e.touches);
      }
    }, { passive: true });

    svg.addEventListener("touchmove", (e) => {
      if (e.touches.length === 1 && isDragging) {
        e.preventDefault();
        const rect = svgElement.getBoundingClientRect();
        const dx = (e.touches[0].clientX - dragStart.x) * (viewBox.w / rect.width);
        const dy = (e.touches[0].clientY - dragStart.y) * (viewBox.h / rect.height);
        viewBox.x -= dx;
        viewBox.y -= dy;
        dragStart.x = e.touches[0].clientX;
        dragStart.y = e.touches[0].clientY;
        applyViewBox();
      } else if (e.touches.length === 2) {
        e.preventDefault();
        const dist = getTouchDistance(e.touches);
        const zoomFactor = lastTouchDist / dist;
        const newW = Math.max(100, Math.min(baseViewBox.w * 2, viewBox.w * zoomFactor));
        const newH = Math.max(85, Math.min(baseViewBox.h * 2, viewBox.h * zoomFactor));
        viewBox.x += (viewBox.w - newW) * 0.5;
        viewBox.y += (viewBox.h - newH) * 0.5;
        viewBox.w = newW;
        viewBox.h = newH;
        applyViewBox();
        lastTouchDist = dist;
      }
    }, { passive: false });

    svg.addEventListener("touchend", () => {
      isDragging = false;
    });
  }

  function getTouchDistance(touches) {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }

  function applyViewBox() {
    if (!svgElement) return;
    svgElement.setAttribute("viewBox", `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
  }

  function zoomIn() {
    const newW = Math.max(100, viewBox.w * 0.8);
    const newH = Math.max(85, viewBox.h * 0.8);
    viewBox.x += (viewBox.w - newW) * 0.5;
    viewBox.y += (viewBox.h - newH) * 0.5;
    viewBox.w = newW;
    viewBox.h = newH;
    applyViewBox();
  }

  function zoomOut() {
    const newW = Math.min(baseViewBox.w * 2, viewBox.w * 1.25);
    const newH = Math.min(baseViewBox.h * 2, viewBox.h * 1.25);
    viewBox.x += (viewBox.w - newW) * 0.5;
    viewBox.y += (viewBox.h - newH) * 0.5;
    viewBox.w = newW;
    viewBox.h = newH;
    applyViewBox();
  }

  function resetView() {
    viewBox = { ...baseViewBox };
    applyViewBox();
  }

  function highlightRegion(regionId) {
    // Remove previous highlights
    svgElement.querySelectorAll(".region-path.highlighted").forEach(p => p.classList.remove("highlighted"));
    const path = svgElement.querySelector(`[data-region="${regionId}"]`);
    if (path) {
      path.classList.add("highlighted");
      // Scroll map into view
      path.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  function dimAllExcept(regionIds) {
    const paths = svgElement.querySelectorAll(".region-path");
    if (!regionIds || regionIds.length === 0) {
      paths.forEach(p => p.classList.remove("dimmed"));
      return;
    }
    paths.forEach(p => {
      const id = p.getAttribute("data-region");
      if (regionIds.includes(id)) {
        p.classList.remove("dimmed");
      } else {
        p.classList.add("dimmed");
      }
    });
  }

  return {
    createSVG,
    zoomIn,
    zoomOut,
    resetView,
    highlightRegion,
    dimAllExcept
  };
})();
