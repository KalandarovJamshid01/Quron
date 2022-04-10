let container = document.querySelector(".container");
let big = document.querySelector(".big");

fetch("https://api.quran.sutanlab.id/surah")
  .then(function (response) {
    return response.json();
  })
  .then(function (res) {
    let data = res.data;
    // console.log(data);
    for (let i = 0; i < data.length; i++) {
      let html = `
    <div class="sura">
    <p class="eng">${data[i].name.transliteration.en}</p>
    <p class="arabic">${data[i].name.short}</p>
    <p class="juz">${data[i].name.translation.en}</p>
    <p class="number">Surah:${data[i].number}</p>
    <p class="oyatNum">Oyat:${data[i].numberOfVerses}</p>
    <p class="city">Mesto:${data[i].revelation.en}</p>
    <a id="${data[i].number}" class="listen">Listen and Read</a>
  </div>`;
      document
        .querySelector(".container")
        .insertAdjacentHTML("beforeend", html);
    }
  });
container.addEventListener("click", function (e) {
  const btn = e.target;
  if (!btn.classList.contains("listen")) return;
  console.log("helo");
  const num = +btn.id;
  let html1, htm2;
  fetch(`https://api.alquran.cloud/v1/surah/${num}/uz.sodik`)
    .then(function (response) {
      return response.json();
    })
    .then(function (res) {
      let data = res.data;
      console.log(data);
      let getHtml = `<div class="popup">
          <div class="child">
            <ion-icon class="close" name="close"></ion-icon>
            <div class="play"></div>
            <p class="name">${data.englishName}</p> 
          </div>
          </div>`;
      document
        .querySelector(".container")
        .insertAdjacentHTML("beforeEnd", getHtml);
      fetch(`https://api.quran.sutanlab.id/surah/${num}`)
        .then(function (response) {
          return response.json();
        })
        .then(function (res) {
          let data2 = res.data;
          console.log(data2);
          for (let i = 0; i < data2.verses.length; i++) {
            html1 = `<div class="text">
            <p class="arabcha">${data2.verses[i].text.arab}</p>
            <p class="oqilishi">${data2.verses[i].text.transliteration.en}</p>
              <p class="uzbek">${data.ayahs[i].text}</p>
            </div>`;

            document
              .querySelector(".name")
              .insertAdjacentHTML("beforeEnd", html1);
            let close = document.querySelector(".close");
            close.addEventListener("click", function () {
              document.querySelector(".popup").remove();
            });
          }
        });
    });
});
