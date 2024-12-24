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
          <div class="accordion-body">
            <button class="btn btn-sm btn-secondary float-end" onclick="copyLinkToClipboard('` + window.location.href + `')">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-files" viewBox="0 0 16 16">
                <path d="M13 0H6a2 2 0 0 0-2 2 2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 13V4a2 2 0 0 0-2-2H5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1zM3 4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4z"/>
              </svg>
              Compartilhar
            </button>`;

    if (music.youtube_url != "") {
      html += `<a class="btn btn-sm btn-danger" href="` + music.youtube_url + `" target="_blank"><i class="fab fa-youtube"></i> YouTube</a>&nbsp;`
    }

    if (music.cifra_url != "") {
      html += `<a class="btn btn-sm btn-warning text-white" href="` + music.cifra_url + `" target="_blank"><i class="fas fa-guitar"></i> Cifra</a>&nbsp;`
    }

    if (music.letra_url != "") {
      html += `<a class="btn btn-sm btn-success" href="` + music.letra_url + `" target="_blank"><i class="fas fa-microphone-alt"></i> Letra</a>&nbsp;`
    }

    html += `<button class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#presentationModal"><i class="fas fa-file-powerpoint"></i> Baixar slide</button>`
    const button = document.getElementById('generateSlidesButton');
    button.setAttribute('onclick', `generateSlidesMusic("` + music.id + `")`);

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

function generateSlidesMusic(musicId) {
  let toUpperCase = getToUpperCase();
  let toDarkTheme = getToDarkTheme();
  let pptx = new PptxGenJS();
  let music = findMusicById(musicId);
  let filename = music.name;
  slideLocalCatolico(pptx, filename, toDarkTheme);
  addMusicContentSlide(pptx, music, toDarkTheme, toUpperCase);
  pptx.writeFile({ fileName: filename });

  // close modal
  const modalElement = document.getElementById('presentationModal');
  const modalInstance = bootstrap.Modal.getInstance(modalElement);
  if (modalInstance) {
    modalInstance.hide();
  }
}

function getToUpperCase() {
  const fontSelect = document.getElementById('fontOption');
  const selectedValue = fontSelect.value;
  if (selectedValue === 'original') {
    return false;
  }
  return true;
}

function getToDarkTheme() {
  const themeSelect = document.getElementById('themeOption');
  const selectedValue = themeSelect.value;
  if (selectedValue === 'light') {
    return false;
  }
  return true;
}
