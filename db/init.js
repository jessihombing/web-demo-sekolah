
const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("database.db");

db.serialize(() => {
  // Buat tabel profil
  db.run(`
    CREATE TABLE IF NOT EXISTS profil (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nama TEXT,
      npsn TEXT,
      akreditasi TEXT,
      status TEXT,
      kepala TEXT,
      alamat TEXT,
      guru INTEGER,
      siswa INTEGER
    )
  `);

  // Buat tabel berita
  db.run(`
    CREATE TABLE IF NOT EXISTS berita (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      judul TEXT,
      isi TEXT,
      tanggal TEXT
    )
  `);

  // Buat tabel pesan
  db.run(`
    CREATE TABLE IF NOT EXISTS pesan (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nama TEXT,
      email TEXT,
      isi TEXT
    )
  `);

  // Isi data profil
  db.run(`
    INSERT OR IGNORE INTO profil
    (id,nama,npsn,akreditasi,status,kepala,alamat,guru,siswa)
    VALUES
    (1,'SMA Nusantara Indonesia','12345678','A','Negeri','Drs. Andi Saputra','Jl. Pendidikan No.10, Kota Medan',45,850)
  `);

  // Isi berita
  db.run(`
    INSERT OR IGNORE INTO berita
    (id,judul,isi,tanggal)
    VALUES
    (1,'Lomba Sains Nasional','Siswa SMA Nusantara meraih Juara 1 tingkat nasional.','12 September 2026')
  `);

  db.run(`
    INSERT OR IGNORE INTO berita
    (id,judul,isi,tanggal)
    VALUES
    (2,'Festival Seni Sekolah','Pentas seni dan budaya diikuti seluruh siswa.','1 September 2026')
  `);

  db.run(`
    INSERT OR IGNORE INTO berita
    (id,judul,isi,tanggal)
    VALUES
    (3,'Hari Kemerdekaan','Upacara dan perlombaan berlangsung meriah.','17 Agustus 2026')
  `);

  console.log("Database berhasil dibuat.");
});

// JANGAN ADA db.close()