// ================= AMBIL BERITA DARI SQLITE =================

async function loadBerita() {
  try {
    const res = await fetch("/api/berita");
    const data = await res.json();

    const beritaList = document.getElementById("beritaList");

    if (!beritaList) return;

    beritaList.innerHTML = "";

    data.forEach((item) => {
      beritaList.innerHTML += `
        <div class="news-card">
          <div class="content">
            <small>${item.tanggal}</small>
            <h3>${item.judul}</h3>
            <p>${item.isi}</p>
          </div>
        </div>
      `;
    });

  } catch (err) {
    console.log("Gagal mengambil berita:", err);
  }
}

loadBerita();


// ================= FORM KONTAK =================

const form = document.getElementById("contactForm");

if (form) {
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const nama = document.getElementById("nama").value;
    const email = document.getElementById("email").value;
    const pesan = document.getElementById("pesan").value;

    const res = await fetch("/api/kontak", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nama, email, pesan }),
    });

    const hasil = await res.json();
    alert(hasil.message);

    form.reset();
  });
}