var playlists;
fetch("https://raw.githubusercontent.com/localcatolico/localcatolico-musicas/main/data/playlists.json")
  .then(res => res.json())
  .then(data => {
    playlists = data.playlists;
   })
  .then(() => {
    var musics;
    fetch("https://raw.githubusercontent.com/localcatolico/localcatolico-musicas/main/data/musics.json")
      .then(res => res.json())
      .then(data => {
        musics = data.musics;
      })
      .then(() => {
        doPlaylists(playlists, musics);
      });
   });

function doPlaylists(playlists, musics) {
  let html = "";

  var playlist = getURI();
  console.log(playlist);

  for (var p of playlists) {
    if (p.enabled != "true"){ continue }

    if (playlist) {
      if (p.id != playlist){
        continue
      }
    }

    html +=
      `<div class="accordion-item">
        <h2 class="accordion-header" id="` + p.id + `">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse` + p.id + `" aria-expanded="false" aria-controls=flush-collapse"` + p.id + `">
            ` + p.name + `
          </button>
        </h2>
        <div id="flush-collapse` + p.id + `" class="accordion-collapse collapse show" aria-labelledby="` + p.id + `" data-bs-parent="#churchs">
          <div class="accordion-body">
            <a href="` + window.location.search.split("?q=")[0] + "?q="+ p.id + `">Compartilhar</a>`;

    let music;
    for (var s of p.summary) {
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

  document.getElementById("playlists").innerHTML = html;
}

function findMusic(music, musics){
  for (var m of musics) {
    if (m.id == music) {
      return m
    }
  }
}

function getURI() {
  if (window.location.search.split("q=").length != 0){
    return window.location.search.split("q=")[1];
  }
}
