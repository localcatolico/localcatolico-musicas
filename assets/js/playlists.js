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
          <button class="accordion-button collapsed" type="button" style="font-size: 45px" data-bs-toggle="collapse" data-bs-target="#flush-collapse` + p.id + `" aria-expanded="false" aria-controls=flush-collapse"` + p.id + `">
            ` + p.name + `
          </button>
        </h2>
        <div id="flush-collapse` + p.id + `" class="accordion-collapse collapse show" aria-labelledby="` + p.id + `" data-bs-parent="#churchs">
          <div class="accordion-body">
            <a href="` + window.location.search.split("?q=")[0] + "?q="+ p.id + `">Selecionar</a>
            <button class="btn btn-sm btn-secondary float-end" onclick="copyPlaylistToClipboard('` + window.location.href + "?q="+ p.id + `')">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-files" viewBox="0 0 16 16">
                <path d="M13 0H6a2 2 0 0 0-2 2 2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 13V4a2 2 0 0 0-2-2H5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1zM3 4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4z"/>
              </svg>
              Compartilhar
            </button>`

    let music;
    for (var s of p.summary) {
      html += `<h1>` + s.name + `</h1>`
      for (var m of s.musics) {
        music = findMusic(m, musics)
        html += `<h2>` + music.name + `</h2>`
        if (music.cifra_url != "") {
          html += `<a class="btn btn-sm btn-primary" href="` + music.cifra_url + `" target="_blank">Cifra</a>&nbsp;`
        }
        if (music.youtube_url != "") {
          html += `<a class="btn btn-sm btn-danger" href="` + music.youtube_url + `" target="_blank">YouTube</a>`
        }
        html += `<br><br>`
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
