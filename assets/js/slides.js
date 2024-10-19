let musics
fetch("/data/musics.json")
  .then(res => res.json())
  .then(data => {
    musics = data.musics;
    populateMusicOptions(musics);
  });

function populateMusicOptions(musics) {
  const musicFields = [
    "musicEntrance",
    "musicForgiveness",
    "musicGlory",
    "musicAcclamation",
    "musicOffertory",
    "musicHoly",
    "musicLamb",
    "musicCommunion",
    "musicPostCommunion",
    "musicFinal"
  ];

  musicFields.forEach(fieldId => {
    let selectElement = document.getElementById(fieldId);
    musics.forEach(music => {
      let option = document.createElement("option");
      option.value = music.id;
      var label = music.name;
      if (music.artist != "") {
        label = music.name + " - " + music.artist;
      }
      option.text = label;
      selectElement.appendChild(option);
    });
  });
}

function generateSlidesMissa() {
  let toUpperCase = getToUpperCase();
  let toDarkTheme = getToDarkTheme();
  let pptx = new PptxGenJS();
  let filename = generateFileName();

  slideLocalCatolico(pptx, filename, toDarkTheme);
  slideEmpty(pptx, toDarkTheme);

  const musicFields = [
    "musicEntrance",
    "musicForgiveness",
    "musicGlory",
    "musicAcclamation",
    "musicOffertory",
    "musicHoly",
    "musicLamb",
    "musicCommunion",
    "musicPostCommunion",
    "musicFinal"
  ];

  musicFields.forEach(fieldId => {
    const selectElement = document.getElementById(fieldId);
    const selectedMusicId = selectElement.value;
    if (selectedMusicId) {
      const music = findMusicById(selectedMusicId);
      if (music) {
        addMusicTitleSlide(pptx, music, toDarkTheme);
        addMusicContentSlide(pptx, music, toDarkTheme, toUpperCase);
        slideEmpty(pptx, toDarkTheme);
      }
    }
  });

  pptx.writeFile({ fileName: filename });
}

function viewMusic(selectId) {
  let selectElement = document.getElementById(selectId);
  let selectedMusicId = selectElement.value;
  if (selectedMusicId) {
    window.open(`/music.html?q=${selectedMusicId}`, '_blank');
  } else {
    alert("Por favor, selecione uma música primeiro.");
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
