window.onload = function() {
  kategoriListele();
}

const kategoriEkle = async ()=> {
  let categoriesName = document.getElementById('kategoriAd').value;
  let categoriesDesc = document.getElementById('kategoriAciklamasi').value;
  let categoriesUstId = document.getElementById('kategoriustId').value;
  let categoriesImage = document.getElementById('kategoriResim').value;

  let categoriesObject = {
    ad:categoriesName,
    aciklama:categoriesDesc,
    ust_id:categoriesUstId,
    gorsel:categoriesImage,
  };

  let response = await fetch('https://proje-bir.altayagency.com/api/category/create', {
    method:"POST",
    headers:{
      "Content-Type":"application/json",
    },
    body:JSON.stringify(categoriesObject)
  }
);

if(response.status == 200) {
  kategoriListele();
}
}

const kategoriListele = async ()=> {
  let alan = document.getElementById('alan');
  alan.innerHTML = '';

  let kategoriler;

  await fetch('https://proje-bir.altayagency.com/api/category/list')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    kategoriler = data;
  })
  .catch(console.error());



  kategoriler["kategoriler"].forEach(element=> {
    let tableRow = document.createElement("tr");
    tableRow.innerHTML = 
    `
    <th><input value="${element.ad}" id="guncelleAd-${element.id}"></th>
    <th><input value="${element.aciklama}" id="guncelleAciklama-${element.id}"></th>
    <th><input value="${element.ust_id}" id="guncelleUstId-${element.id}"></th>
    <th><input value="${element.gorsel}" id="guncelleGorsel-${element.id}"></th>
    <th>
    <button class="btn btn-danger" type="button" onclick="sil(${element.id})" >Sil</button>
    <button class="btn btn-success" type="button" onclick="guncelle(${element.id})">Guncelle</button>
    </th>
    `;
    alan.appendChild(tableRow);
  });


}
const sil = async (id) => {
  let response = await fetch(`https://proje-bir.altayagency.com/api/category/delete/${id}`, {
    method:"DELETE"
  }
)
if(response.status == 200) {
  kategoriListele();
}
}

const guncelle = async (id)=> {
  let guncelleAd = document.getElementById(`guncelleAd-${id}`).value;
  let guncelleAciklama = document.getElementById(`guncelleAciklama-${id}`).value;
  let guncelleustId = document.getElementById(`guncelleUstId-${id}`).value;
  let guncelleGorsel = document.getElementById(`guncelleGorsel-${id}`).value;

  let guncellemeObje = {
    ad:guncelleAd,
    aciklama:guncelleAciklama,
    ust_id:guncelleustId,
    gorsel:guncelleGorsel,
  }

  console.log(guncellemeObje)

  let response = await fetch(`https://proje-bir.altayagency.com/api/category/update/${id}`, {
    method:"PUT",
    headers:{
      "Content-Type":"application/json",
    },
    body:JSON.stringify(guncellemeObje)
  })

  if(response.status == 200) {
    kategoriListele();
  }
}