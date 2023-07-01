var moments;
fetch("https://raw.githubusercontent.com/localcatolico/localcatolico-musicas/main/data/moments.json")
  .then(res => res.json())
  .then(data => {
    moments = data.moments;
   })
  .then(() => {
    var musics;
    fetch("https://raw.githubusercontent.com/localcatolico/localcatolico-musicas/main/data/musics.json")
      .then(res => res.json())
      .then(data => {
        musics = data.musics;
      })
      .then(() => {
        doMoments(moments, musics);
      });
   });

function doMoments(moments, musics) {
  let html = "";

  for (var m of moments) {
    if (m.enabled != "true"){ continue }

    html +=
      `<div class="accordion-item">
        <h2 class="accordion-header" id="` + m.id + `">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse` + m.id + `" aria-expanded="false" aria-controls=flush-collapse"` + m.id + `">
            ` + m.name + `
          </button>
        </h2>
        <div id="flush-collapse` + m.id + `" class="accordion-collapse collapse" aria-labelledby="` + m.id + `" data-bs-parent="#churchs">
          <div class="accordion-body">`;

    let music;
    for (var s of m.summary) {
      html += `<h1>` + s.name + `</h1>`
      for (var m of s.musics) {
        music = findMusic(m, musics)
        html += `<h2>` + music.name + `</h2>`
        for (var c of music.content) {
          html += c + `<br><br>`
        }
      }
    }

    html +=
          `</div>
        </div>
      </div>`;
  }

  document.getElementById("moments").innerHTML = html;
}

function findMusic(music, musics){
  for (var m of musics) {
    if (m.id == music) {
      return m
    }
  }
}
