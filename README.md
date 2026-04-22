# SIG Persebaran Rumah Kopi — Kawangkoan Utara

WebGIS interaktif berbasis **Leaflet** untuk pemetaan persebaran rumah kopi di Kecamatan Kawangkoan Utara, Kabupaten Minahasa, Sulawesi Utara.

## ✨ Fitur

- 🚀 **Splash / Landing page** modern dengan tombol "Buka Peta"
- 🌙☀️ **Dark & Light mode** — hanya untuk tampilan UI (panel, tombol, popup). **Map tetap warna asli**, tidak ikut berubah.
- 🗺️ **3 Base Layer**:
  - 🛰️ **Google Hybrid** (default) — citra satelit + label jalan
  - 🌍 **Google Satellite** — citra satelit murni
  - 🗺️ **OpenStreetMap** — peta jalan standar
- ☕ 12 marker custom rumah kopi dengan popup info lengkap + Google Maps
- 🔍 Search bar autocomplete (kiri-atas)
- 📍 Klik area peta → popup koordinat lat/lng
- 🎛️ Layer control di kanan-atas (terbuka, rapi, tidak menutupi search)
- 📋 Panel info slide-drawer + Reset View
- 📱 Responsive mobile-friendly

## 🚀 Cara Menjalankan

### Opsi 1 — Buka langsung
Double-click `index.html` (perlu internet untuk basemap & Leaflet CDN).

### Opsi 2 — Local server (direkomendasikan)
```bash
python -m http.server 8000
# atau
npx serve .
```

## 📁 Struktur

```
webgis-rumahkopi/
├── index.html
├── css/style.css
├── js/script.js
└── data/
    ├── wilayah.js     # GeoJSON polygon kecamatan (export QGIS)
    └── rumahkopi.js   # GeoJSON titik rumah kopi (export QGIS)
```

## 👤 Pembuat

- **Reinhard G. M. Runkat** · NIM 241011060057 · Sistem Informasi
- Dosen: **ERIC ALFONSIUS S.Kom., M.Kom.**
