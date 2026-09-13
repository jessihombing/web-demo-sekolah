const express = require("express");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// ================= PORT UNTUK RENDER =================
const PORT = process.env.PORT || 3000;

// ================= MIDDLEWARE =================
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Folder public
app.use(express.static(path.join(__dirname, "public")));

// Folder pages
app.use("/pages", express.static(path.join(__dirname, "pages")));

// ================= DATABASE SQLITE =================
const db = new sqlite3.Database("database.db", (err) => {
  if (err) {
    console.error("Gagal membuka database:", err.message);
  } else {
    console.log("SQLite berhasil terhubung.");
  }
});

// ================= API PROFIL =================
app.get("/api/profil", (req, res) => {
  db.get("SELECT * FROM profil LIMIT 1", (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(row);
  });
});

// ================= API BERITA =================

// Ambil semua berita
app.get("/api/berita", (req, res) => {
  db.all("SELECT * FROM berita ORDER BY id DESC", (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Tambah berita
app.post("/api/berita", (req, res) => {
  const { judul, isi, tanggal } = req.body;

  db.run(
    "INSERT INTO berita (judul, isi, tanggal) VALUES (?, ?, ?)",
    [judul, isi, tanggal],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.json({
        success: true,
        message: "Berita berhasil ditambahkan.",
        id: this.lastID,
      });
    }
  );
});

// Hapus berita
app.delete("/api/berita/:id", (req, res) => {
  const id = req.params.id;

  db.run("DELETE FROM berita WHERE id = ?", [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json({
      success: true,
      message: "Berita berhasil dihapus.",
    });
  });
});

// ================= API KONTAK =================
app.post("/api/kontak", (req, res) => {
  const { nama, email, pesan } = req.body;

  db.run(
    "INSERT INTO pesan (nama, email, isi) VALUES (?, ?, ?)",
    [nama, email, pesan],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.json({
        success: true,
        message: "Pesan berhasil dikirim.",
      });
    }
  );
});

// ================= HALAMAN UTAMA =================
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ================= SERVER =================
app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di port ${PORT}`);
});