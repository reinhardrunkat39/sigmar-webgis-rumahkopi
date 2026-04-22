/* =========================================================
   SIG Persebaran Rumah Kopi - Kawangkoan Utara
   script.js — splash, theme switch, map interactions
   ========================================================= */
(function () {
  "use strict";

  /* ---------- Theme (dark / light) ---------- */
  var root = document.documentElement;
  var savedTheme = (function () {
    try { return localStorage.getItem("rk-theme"); } catch (e) { return null; }
  })();
  if (savedTheme === "light" || savedTheme === "dark") {
    root.setAttribute("data-theme", savedTheme);
  }
  function syncThemeIcons() {
    var dark = root.getAttribute("data-theme") === "dark";
    document.querySelectorAll(".theme-icon").forEach(function (el) {
      el.textContent = dark ? "🌙" : "☀️";
    });
  }
  function toggleTheme() {
    var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("rk-theme", next); } catch (e) {}
    syncThemeIcons();
  }
  syncThemeIcons();
  document.getElementById("theme-toggle-splash").addEventListener("click", toggleTheme);

  /* ---------- Splash → App ---------- */
  var splash = document.getElementById("splash");
  var app = document.getElementById("app");
  var mapInitialized = false;

  document.getElementById("splash-count").textContent = json_RumahKopi.features.length;

  function enterApp() {
    splash.classList.add("fade-out");
    setTimeout(function () {
      splash.classList.add("hidden");
      app.classList.remove("hidden");
      if (!mapInitialized) {
        initMap();
        mapInitialized = true;
      } else if (window._rkMap) {
        setTimeout(function () { window._rkMap.invalidateSize(); }, 100);
      }
    }, 500);
  }
  function backToSplash() {
    app.classList.add("hidden");
    splash.classList.remove("hidden", "fade-out");
  }
  document.getElementById("enter-map").addEventListener("click", enterApp);

  /* ---------- Map ---------- */
  var INITIAL_BOUNDS = [
    [1.1949761295866939, 124.77829430050606],
    [1.21183991281079, 124.80403471451227]
  ];

  function initMap() {
    var map = L.map("map", {
      zoomControl: false, maxZoom: 19, minZoom: 3,
      zoomAnimation: true, fadeAnimation: true,
      attributionControl: true
    }).fitBounds(INITIAL_BOUNDS);
    window._rkMap = map;

    L.control.zoom({ position: "bottomright" }).addTo(map);
    L.control.scale({ position: "bottomleft", imperial: false }).addTo(map);

    /* === 3 Base Layers === */
    var osm = L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      { attribution: '&copy; OpenStreetMap contributors', maxZoom: 19, subdomains: "abc" }
    );

    var googleSatellite = L.tileLayer(
      "https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
      { attribution: "&copy; Google Satellite", maxZoom: 20, subdomains: ["mt0","mt1","mt2","mt3"] }
    );

    var googleHybrid = L.tileLayer(
      "https://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}",
      { attribution: "&copy; Google Hybrid", maxZoom: 20, subdomains: ["mt0","mt1","mt2","mt3"] }
    ).addTo(map);

    var wilayahLayer = L.geoJSON(json_WilayahKawangkoan, {
      style: { color: "#00ff88", weight: 2, fillColor: "#00ff88", fillOpacity: 0.08, dashArray: "6 6" },
      onEachFeature: function (f, layer) {
        layer.bindTooltip("🗺️ " + (f.properties.nama || "Wilayah"), { sticky: true });
      }
    }).addTo(map);

    var coffeeIcon = L.divIcon({
      className: "coffee-marker",
      html: '<div class="coffee-marker-inner"><span>☕</span></div>',
      iconSize: [42, 42], iconAnchor: [21, 42], popupAnchor: [0, -40]
    });

    var markersById = {};
    var markersGroup = L.layerGroup().addTo(map);

    json_RumahKopi.features.forEach(function (feat) {
      var p = feat.properties;
      var c = feat.geometry.coordinates;
      var lat = c[1], lng = c[0];
      var html =
        '<div class="popup-title">☕ ' + esc(p.nama) + "</div>" +
        '<div class="popup-row"><b>📍 Alamat:</b> ' + esc(p.alamat) + "</div>" +
        '<div class="popup-row"><b>🕒 Jam Buka:</b> ' + esc(p.jam_buka) + "</div>" +
        '<a class="popup-btn" target="_blank" rel="noreferrer" href="https://www.google.com/maps?q=' +
        lat + "," + lng + '">🚀 Buka di Google Maps</a>';
      var marker = L.marker([lat, lng], { icon: coffeeIcon, title: p.nama })
        .bindPopup(html, { maxWidth: 280 })
        .bindTooltip(p.nama, { direction: "top", offset: [0, -38] });
      markersGroup.addLayer(marker);
      markersById[p.id] = { marker: marker, data: p, lat: lat, lng: lng };
    });

    L.control.layers(
      {
        "🛰️ Google Hybrid": googleHybrid,
        "🌍 Google Satellite": googleSatellite,
        "🗺️ OpenStreetMap": osm
      },
      {
        "☕ Rumah Kopi": markersGroup,
        "🗺️ Wilayah Kawangkoan Utara": wilayahLayer
      },
      { position: "topright", collapsed: false }
    ).addTo(map);

    /* Click on map → coordinate popup */
    map.on("click", function (e) {
      var lat = e.latlng.lat.toFixed(6);
      var lng = e.latlng.lng.toFixed(6);
      L.popup()
        .setLatLng(e.latlng)
        .setContent(
          '<div class="popup-title">📍 Koordinat</div>' +
          '<div class="popup-row"><b>Latitude:</b> ' + lat + "</div>" +
          '<div class="popup-row"><b>Longitude:</b> ' + lng + "</div>" +
          '<a class="popup-btn" target="_blank" rel="noreferrer" href="https://www.google.com/maps?q=' +
          lat + "," + lng + '">🚀 Buka di Google Maps</a>'
        )
        .openOn(map);
    });

    document.getElementById("count").textContent = json_RumahKopi.features.length;

    /* Reset view */
    document.getElementById("reset-view").addEventListener("click", function () {
      map.flyToBounds(INITIAL_BOUNDS, { duration: 1.2 });
      map.closePopup();
    });

    /* Search */
    var searchInput = document.getElementById("search");
    var resultsBox = document.getElementById("search-results");
    searchInput.addEventListener("input", function () {
      var q = this.value.trim().toLowerCase();
      if (!q) { resultsBox.innerHTML = ""; resultsBox.classList.remove("show"); return; }
      var matches = json_RumahKopi.features.filter(function (f) {
        var p = f.properties;
        return (p.nama && p.nama.toLowerCase().indexOf(q) !== -1) ||
               (p.alamat && p.alamat.toLowerCase().indexOf(q) !== -1);
      }).slice(0, 6);

      if (!matches.length) {
        resultsBox.innerHTML = '<div class="result-item" style="cursor:default"><div class="result-name">Tidak ditemukan</div></div>';
      } else {
        resultsBox.innerHTML = matches.map(function (f) {
          var p = f.properties;
          return '<div class="result-item" data-id="' + p.id + '">' +
            '<div class="result-name">☕ ' + esc(p.nama) + "</div>" +
            '<div class="result-addr">' + esc(p.alamat) + "</div>" +
            "</div>";
        }).join("");
      }
      resultsBox.classList.add("show");
    });

    resultsBox.addEventListener("click", function (e) {
      var item = e.target.closest(".result-item");
      if (!item || !item.dataset.id) return;
      var m = markersById[item.dataset.id];
      if (!m) return;
      map.flyTo([m.lat, m.lng], 17, { duration: 1.2 });
      setTimeout(function () { m.marker.openPopup(); }, 900);
      resultsBox.classList.remove("show");
      searchInput.value = m.data.nama;
    });
    document.addEventListener("click", function (e) {
      if (!e.target.closest("#search-wrap")) resultsBox.classList.remove("show");
    });

    setTimeout(function () { map.invalidateSize(); }, 200);
  }

  /* ---------- Panel drawer ---------- */
  var panel = document.getElementById("panel");
  document.getElementById("toggle-panel").addEventListener("click", function () {
    panel.classList.toggle("open");
  });
  document.getElementById("close-panel").addEventListener("click", function () {
    panel.classList.remove("open");
  });

  /* ---------- App-level theme toggle + back ---------- */
  document.getElementById("theme-toggle").addEventListener("click", toggleTheme);
  document.getElementById("back-home").addEventListener("click", backToSplash);

  /* ---------- Helper ---------- */
  function esc(s) {
    if (s == null) return "";
    return String(s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  /* Allow Enter on splash */
  document.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && !splash.classList.contains("hidden")) enterApp();
  });
})();
