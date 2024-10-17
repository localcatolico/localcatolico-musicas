var musics;
fetch("/data/musics.json")
  .then(res => res.json())
  .then(data => {
    musics = data.musics;
   })
  .then(() => {
    doMusics(musics);
   });

function doMusics(musics) {
  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get("q");
  let html = "";

  for (var music of musics) {
    if (music.name == ""){ continue }
    if (music.id != id){ continue }
    html +=
      `<div class="card-body">
        <h2>` + music.name + `</h2>
        <h3>` + music.artist + `</h3>
        <div>
          <div class="accordion-body">`;

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
