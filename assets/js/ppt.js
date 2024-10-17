let slideNumber = 1;
let toUpperCase = true;
let darkTheme = false;
let filename = generateFileName();

document.getElementById('generate-ppt').addEventListener('click', function() {
  let pptx = new PptxGenJS();

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
        addMusicSlide(pptx, music, darkTheme);
      }
    }
  });

  slideEmpty(pptx, darkTheme);
  pptx.writeFile({ fileName: filename });
});

function generateFileName() {
  const titleInput = document.getElementById("title").value;
  let fileName;

  if (titleInput.trim()) {
    fileName = `${titleInput}.pptx`;
  } else {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    fileName = `Local Católico ${day}/${month}/${year}.pptx`;
  }

  return fileName;
}

function slideLocalCatolico(pptx, title, darkTheme) {
  let slide = pptx.addSlide();
  darkSlideTheme(slide, darkTheme);
  slide.addText('Local Católico', { x: 1, y: 1, fontSize: 24, color: '363636', bold: true });
  slide.addImage({
    path: 'https://localcatolico.com.br/assets/img/logo.png',
    x: 1.5,
    y: 1.5,
    w: 3,
    h: 3
  });
  slide.addText(title, {
    x: 0,
    y: 5,
    fontSize: 24,
    color: '363636',
    align: 'center'
  });
}

function slideEmpty(pptx, darkTheme) {
  let slide = pptx.addSlide();
  darkSlideTheme(slide, darkTheme);
}

function addMusicSlide(pptx, music, darkTheme) {
  let slide = pptx.addSlide();
  darkSlideTheme(slide, darkTheme)
  slide.addText(`${music.name}`, { x: 1, y: 1, fontSize: 24, color: '363636' });
  slide.addText(`${music.artist}`, { x: 1, y: 2, fontSize: 18, color: '636363' });

  music.content.forEach((line, index) => {
    let slide = pptx.addSlide();
    let formattedLine = line.replace(/<br>/g, '\n');
    formattedLine = transformText(formattedLine, toUpperCase);
    addFullScreenText(slide, formattedLine, darkTheme)
  });
}

function addFullScreenText(slide, text, darkTheme) {
  const maxFontSize = 48; // Tamanho inicial da fonte
  const minFontSize = 14; // Tamanho mínimo da fonte

  // Define a área máxima do slide que o texto pode ocupar
  const xPos = 0.5;    // Margem esquerda
  const yPos = 0.5;    // Margem superior
  const width = 9;     // Largura do slide (90% do slide)
  const height = 5;    // Altura do slide (ajuste conforme necessário)

  let fontSize = maxFontSize;

  // Loop para ajustar o tamanho da fonte até caber no slide
  while (fontSize >= minFontSize) {
    // Tenta adicionar o texto com o tamanho de fonte atual
    slide.addText(text, {
      x: xPos,
      y: yPos,
      w: width,
      h: height,
      fontSize: fontSize,
      align: 'center',
      valign: 'middle',
      color: darkTheme ? 'FFFFFF' : '000000',
      bold: true
    });

    // Aqui você poderia verificar se o texto ficou grande demais
    // Usando um método fictício que calcula o overflow do slide (simulação)
    const textOverflows = isTextOverflowing(slide);

    if (!textOverflows) {
      break; // Se o texto couber, interrompe o loop
    }

    // Se o texto não couber, diminui o tamanho da fonte e tenta novamente
    fontSize -= 2;
  }
}

// Função fictícia para verificar o overflow do slide
// Idealmente, aqui você poderia verificar se o texto ultrapassa os limites do slide
function isTextOverflowing(slide) {
  // Simulação: sempre retorna falso, pois não estamos calculando de fato
  // Substitua isso com uma lógica que detecta se o texto está ultrapassando o slide
  return false;
}

let musics;
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
    const selectElement = document.getElementById(fieldId);
    musics.forEach(music => {
      const option = document.createElement("option");
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

function viewMusic(selectId) {
  const selectElement = document.getElementById(selectId);
  const selectedMusicId = selectElement.value;
  if (selectedMusicId) {
    window.open(`/music.html?q=${selectedMusicId}`, '_blank');
  } else {
    alert("Por favor, selecione uma música primeiro.");
  }
}

function findMusicById(musicId) {
  const music = musics.find(m => m.id === musicId);
  return music || null;
}

function transformText(text, toUpperCase = false) {
  if (toUpperCase) {
    return text.toUpperCase();
  }
  return text;
}

function darkSlideTheme(slide, darkTheme) {
  if (darkTheme){
    slide.background = { fill: '000000' };
  } else {
    slide.background = { fill: 'FFFFFF' };
  }
}
