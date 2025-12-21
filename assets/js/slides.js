let musics
fetch("/data/musics.json")
  .then(res => res.json())
  .then(data => {
    musics = data.musics;
    populateMusicOptions(musics);
    loadFromURL();
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

function buildPresentationParams() {
  const params = new URLSearchParams();

  const title = document.getElementById('title').value;
  if (title) params.set('title', title);

  params.set('font', document.getElementById('fontOption').value);
  params.set('theme', document.getElementById('themeOption').value);

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
    if (selectElement.value && selectElement.value !== "Escolha uma música") {
      params.set(fieldId, selectElement.value);
    }
  });

  const eucaristicPrayer = document.getElementById('eucaristicPrayer');
  if (eucaristicPrayer && eucaristicPrayer.value && eucaristicPrayer.value !== "Escolha uma opção") {
    params.set('eucaristicPrayer', eucaristicPrayer.value);
  }
  
  return params;
}

function generateShareLink() {
  const params = buildPresentationParams();
  const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`;

  navigator.clipboard.writeText(url).then(() => {
    alert('Link copiado para a área de transferência!');
  }).catch(err => {
    // Fallback se o clipboard não funcionar
    prompt('Copie este link:', url);
  });
}

function openWebPresentation() {
  const params = buildPresentationParams();
  const url = `${window.location.origin}/presentation.html?${params.toString()}`;
  window.open(url, '_blank');
}

// Função para carregar dados da URL
function loadFromURL() {
  const params = new URLSearchParams(window.location.search);
  
  // Carrega o título
  if (params.has('title')) {
    document.getElementById('title').value = params.get('title');
  }
  
  // Carrega as opções de fonte e tema
  if (params.has('font')) {
    document.getElementById('fontOption').value = params.get('font');
  }
  if (params.has('theme')) {
    document.getElementById('themeOption').value = params.get('theme');
  }
  
  // Carrega as músicas
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
    if (params.has(fieldId)) {
      const selectElement = document.getElementById(fieldId);
      if (selectElement) {
        selectElement.value = params.get(fieldId);
      }
    }
  });
  
  // Carrega oração eucarística se houver
  if (params.has('eucaristicPrayer')) {
    const eucaristicPrayer = document.getElementById('eucaristicPrayer');
    if (eucaristicPrayer) {
      eucaristicPrayer.value = params.get('eucaristicPrayer');
    }
  }
}
