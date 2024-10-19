let musics
fetch("/data/musics.json")
  .then(res => res.json())
  .then(data => {
    musics = data.musics;
    populateMusicOptions(musics);
  });

function generateSlidesMissa() {
  let pptx = new PptxGenJS();
  let filename = generateFileName();

  slideLocalCatolico(pptx, filename, darkTheme);
  slideEmpty(pptx, darkTheme);

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
        addMusicTitleSlide(pptx, music, darkTheme);
        addMusicContentSlide(pptx, music, darkTheme, toUpperCase);
        slideEmpty(pptx, darkTheme);
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
