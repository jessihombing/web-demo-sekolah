const tabel = document.getElementById("dataBerita");
const form = document.getElementById("beritaForm");

async function tampilBerita(){

const res = await fetch("/api/berita");
const berita = await res.json();

tabel.innerHTML="";

berita.forEach(item=>{

tabel.innerHTML += `
<tr>

<td>${item.id}</td>

<td>${item.judul}</td>

<td>${item.tanggal}</td>

<td>

<button class="delete" onclick="hapus(${item.id})">
Hapus
</button>

</td>

</tr>
`;

});

}

form.addEventListener("submit", async function(e){

e.preventDefault();

await fetch("/api/berita",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
judul:judul.value,
tanggal:tanggal.value,
isi:isi.value
})
});

form.reset();

tampilBerita();

});

async function hapus(id){

if(confirm("Hapus berita ini?")){

await fetch("/api/berita/"+id,{
method:"DELETE"
});

tampilBerita();

}

}

tampilBerita();