let container = document.querySelector(".container");
let big = document.querySelector(".big");
let bpop = document.querySelector(".bpop");

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
    <p class="city">Revealation:${data[i].revelation.en}</p>
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
  bpop.innerHTML = "";
  let sura = btn.closest(".sura");
  sura.classList.add("color");
  document
    .querySelectorAll(".sura")
    .forEach((val) => val.classList.add("scale"));
  let arr = [];
  let nextSibling = sura.nextElementSibling;
  let previousSibling = sura.previousElementSibling;
  console.log(nextSibling);
  console.log(previousSibling);
  while (nextSibling) {
    arr.push(nextSibling);
    nextSibling = nextSibling.nextElementSibling;
  }
  while (previousSibling) {
    arr.push(previousSibling);
    previousSibling = previousSibling.previousElementSibling;
  }
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].classList.contains("color")) {
      arr[i].classList.remove("color");
    }
  }
  console.log(arr);
  const num = +btn.id;
  let html1, htm2;
  container.classList.add("gridcol");
  big.classList.add("grid");

  fetch(`https://api.alquran.cloud/v1/surah/${num}/uz.sodik`)
    .then(function (response) {
      return response.json();
    })
    .then(function (res) {
      let data = res.data;
      console.log(data);
      let getHtml = `<div class="popup">         
            <ion-icon class="close" name="close"></ion-icon>
            <div class="play"></div>
            <p class="name">${data.englishName}</p>           
          </div>`;
      bpop.insertAdjacentHTML("afterBegin", getHtml);
      fetch(`https://api.quran.sutanlab.id/surah/${num}`)
        .then(function (response) {
          return response.json();
        })
        .then(function (res) {
          let data2 = res.data;
          // console.log(data2);
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
              sura.classList.remove("color");
              container.classList.remove("gridcol");
              big.classList.remove("grid");
            });
          }
        });
    });
});
