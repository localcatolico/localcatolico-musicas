var summary;
fetch("/data/summary.json")
  .then(res => res.json())
  .then(data => {
    summary = data.summary;
   })
  .then(() => {
    var musics;
    fetch("https://raw.githubusercontent.com/localcatolico/localcatolico-musicas/main/data/musics.json")
      .then(res => res.json())
      .then(data => {
        musics = data.musics;
      })
      .then(() => {
        doSummary(summary, musics);
      });
   });

function doSummary(summary, musics) {
  let html = "";

  for (var s of summary) {
    html +=
      `<div class="accordion-item">
        <h2 class="accordion-header" id="` + s.id + `">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse` + s.id + `" aria-expanded="false" aria-controls=flush-collapse"` + s.id + `">
            ` + s.name + `
          </button>
        </h2>
        <div id="flush-collapse` + s.id + `" class="accordion-collapse collapse" aria-labelledby="` + s.id + `" data-bs-parent="#churchs">
          <div class="accordion-body">`;

    let music;
    for (var m of s.musics) {
      music = findMusic(m, musics)
      html += `<h1>` + music.name + `</h1>`
      html += `<h4>` + music.artist + `</h4><br>`

      if (music.youtube_url != "") {
        html += `<a class="btn btn-sm btn-danger" href="` + music.youtube_url + `" target="_blank">YouTube</a>&nbsp;`
      }
  
      if (music.cifra_url != "") {
        html += `<a class="btn btn-sm btn-warning" href="` + music.cifra_url + `" target="_blank">Cifra</a>&nbsp;`
      }
  
      if (music.letra_url != "") {
        html += `<a class="btn btn-sm btn-success" href="` + music.letra_url + `" target="_blank">Letra</a>&nbsp;`
      }

      html += `<br><br>`

      for (var c of music.content) {
        html += c + `<br><br>`
      }
    }

    html +=
          `</div>
        </div>
      </div>`;
  }

  document.getElementById("summary").innerHTML = html;
}

function findMusic(music, musics){
  for (var m of musics) {
    if (m.id == music) {
      return m
    }
  }
}
