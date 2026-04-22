/* GeoJSON Persebaran Rumah Kopi — Kawangkoan Utara
   Atribut: nama, alamat, jam_buka, fasilitas
   Koordinat sesuai data QGIS (RumahKopi_3.js) */
var json_RumahKopi = {
  type: "FeatureCollection",
  name: "RumahKopi",
  crs: { type: "name", properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" } },
  features: [
    { type: "Feature", properties: { id: "1", nama: "COFFEE ADDICT", alamat: "6Q5Q+HPH, Jl. kawangkoan-Tomohon, Uner, Kec. Kawangkoan Utara, Kabupaten Minahasa, Sulawesi Utara", jam_buka: "09.00 - 22.00"}, geometry: { type: "Point", coordinates: [124.789366830940409, 1.208937479183695] } },
    { type: "Feature", properties: { id: "2", nama: "Glori-A House", alamat: "6Q5Q+4RR, Kinali Satu, Kec. Kawangkoan, Kabupaten Minahasa, Sulawesi Utara", jam_buka: "08.00 - 23.00"}, geometry: { type: "Point", coordinates: [124.789459106754592, 1.207858911060375] } },
    { type: "Feature", properties: { id: "3", nama: "RM & Rk Chamar Kawangkoan", alamat: "6Q4Q+VFW, Jl. Raya Kawangkoan Manado, Uner, Kec. Kawangkoan Utara, Kabupaten Minahasa, Sulawesi Utara", jam_buka: "07.30 - 22.30"}, geometry: { type: "Point", coordinates: [124.788707285776624, 1.207262143704624] } },
    { type: "Feature", properties: { id: "4", nama: "Rumah Kopi Glori-A", alamat: "6Q4Q+R8 Uner, Kabupaten Minahasa, Sulawesi Utara", jam_buka: "06.00 - 23.00"}, geometry: { type: "Point", coordinates: [124.788262735696335, 1.207098581042165] } },
    { type: "Feature", properties: { id: "5", nama: "Rumah Kopi Berkat", alamat: "6Q4Q+Q4P, Talikuran Utara, Kawangkoan Utara, Minahasa Regency, North Sulawesi", jam_buka: "08.00 - 22.00"}, geometry: { type: "Point", coordinates: [124.787871319845124, 1.203998264956969] } },
    { type: "Feature", properties: { id: "7", nama: "BROTSOSEIS KAWANGKOAN (ARUY)", alamat: "6Q4P+6W4, Talikuran Utara, Kec. Kawangkoan Utara, Kabupaten Minahasa, Sulawesi Utara", jam_buka: "08.00 - 22.30"}, geometry: { type: "Point", coordinates: [124.787782825826625, 1.206675019927817] } },
    { type: "Feature", properties: { id: "9", nama: "Seruni Coffee x Eatery", alamat: "6Q2Q+CG Sendangan, Kabupaten Minahasa, Sulawesi Utara", jam_buka: "08.00 - 23.00"}, geometry: { type: "Point", coordinates: [124.788786892575288, 1.201123722072903] } },
    { type: "Feature", properties: { id: "10", nama: "Rumah Kopi Gembira Kawangkoan", alamat: "6Q2Q+9G Uner, Kabupaten Minahasa, Sulawesi Utara", jam_buka: "07.30 - 22.00"}, geometry: { type: "Point", coordinates: [124.788794077987035, 1.200956188524997] } },
    { type: "Feature", properties: { id: "11", nama: "TORONATA Coffee House", alamat: "Jl.Raya Kawangkoan (BW Lapian Kel.Sendangan Tengah, Sendangan, Kec. Kawangkoan Utara, Kabupaten Minahasa, Sulawesi Utara 95692", jam_buka: "08.00 - 22.00"}, geometry: { type: "Point", coordinates: [124.788930033541149, 1.200691935552987] } },
    { type: "Feature", properties: { id: "12", nama: "Rumah Kopi Sarina (RKS)", alamat: "Jl. Lingkungan I, Sendangan, Kec. Kawangkoan Utara, Kabupaten Minahasa, Sulawesi Utara 95692", jam_buka: "07.00 - 22.30"}, geometry: { type: "Point", coordinates: [124.788947618890987, 1.200583587107219] } }
  ]
};
