fetch("https://api.quran.sutanlab.id/surah")
  .then(function (response) {
    return response.json();
  })
  .then(function (res) {
    let daTa = res;
    console.log(daTa);
    for (let i = 0; i < daTa.data.length; i++) {
      let html = `
    <div class="sura">
    <p class="eng">${daTa.data[i].name.transliteration.en}</p>
    <p class="arabic">${daTa.data[i].name.short}</p>
    <p class="juz">${daTa.data[i].name.translation.en}</p>
    <p class="number">Surah:${daTa.data[i].number}</p>
    <p class="oyatNum">Oyat:${daTa.data[i].numberOfVerses}</p>
    <p class="city">Mesto:${daTa.data[i].revelation.en}</p>
    <a id="${daTa.data[i].number}" class="listen">Listen and Read</a>
  </div>`;
      document
        .querySelector(".container")
        .insertAdjacentHTML("beforeend", html);
    }
  });
let container = document.querySelector(".container");
container.addEventListener("click", function (e) {
  const btn = e.target;
  console.log(btn);
  if (!btn.classList.contains("listen")) return;
  console.log("helo");
  const num = +btn.id;
  fetch(`https://api.quran.sutanlab.id/surah/${num}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (res) {
      let data2 = res;
      console.log(data2);
    });
});
