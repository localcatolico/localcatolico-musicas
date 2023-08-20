var musics;
fetch("https://raw.githubusercontent.com/localcatolico/localcatolico-musicas/main/data/musics.json")
  .then(res => res.json())
  .then(data => {
    musics = data.musics;
   })
  .then(() => {
    doMusics(musics);
   });

function doMusics(musics) {
  let html = "";

  for (var music of musics) {
    if (music.name == ""){ continue }
    html +=
      `<div class="accordion-item">
        <h2 class="accordion-header" id="` + music.id + `">
          <button class="accordion-button collapsed" type="button" style="font-size: 20px" data-bs-toggle="collapse" data-bs-target="#flush-collapse` + music.id + `" aria-expanded="false" aria-controls=flush-collapse"` + music.id + `">
            ` + music.name + `<br>
            ` + music.artist + `
          </button>
        </h2>
        <div id="flush-collapse` + music.id + `" class="accordion-collapse collapse" aria-labelledby="` + music.id + `" data-bs-parent="#churchs">
          <div class="accordion-body">`;

    if (music.cifra_url != "") {
      html += `<a class="btn btn-sm btn-primary" href="` + music.cifra_url + `" target="_blank">Cifra</a><br><br>`
    }

    for (var c of music.content) {
      html += c + `<br><br>`
    }

    if (music.youtube_url != "") {
      html += `<iframe width="420" height="315" src="` + music.youtube_url + `"></iframe>`
    }

    html +=
          `</div>
        </div>
      </div>`;
  }

  document.getElementById("musics").innerHTML = html;
}
