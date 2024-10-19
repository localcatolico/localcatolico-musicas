function generateFileName() {
  let titleInput = document.getElementById("title").value;
  let fileName;

  if (titleInput.trim()) {
    fileName = `${titleInput}.pptx`;
  } else {
    let today = new Date();
    let day = String(today.getDate()).padStart(2, '0');
    let month = String(today.getMonth() + 1).padStart(2, '0');
    let year = today.getFullYear();
    fileName = `Local Católico ${day}/${month}/${year}.pptx`;
  }

  return fileName;
}

function slideLocalCatolico(pptx, title, darkTheme) {
  let slide = pptx.addSlide();
  darkSlideTheme(slide, darkTheme);
  slide.addText('Local Católico', {
    x: 1,
    y: 1,
    fontSize: 24,
    color: darkTheme ? 'FFFFFF' : '363636',
    bold: true
  });
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
    color: darkTheme ? 'FFFFFF' : '363636',
    align: 'center'
  });
}

function slideEmpty(pptx, darkTheme) {
  let slide = pptx.addSlide();
  darkSlideTheme(slide, darkTheme);
}

function addMusicTitleSlide(pptx, music, darkTheme) {
  let slide = pptx.addSlide();
  darkSlideTheme(slide, darkTheme)
  slide.addText(`${music.name}`, {
    x: 1,
    y: 1,
    fontSize: 24,
    color: darkTheme ? 'FFFFFF' : '363636',
  });
  slide.addText(`${music.artist}`, {
    x: 1,
    y: 2,
    fontSize: 18,
    color: darkTheme ? 'FFFFFF' : '363636',
  });
}

function addMusicContentSlide(pptx, music, darkTheme, toUpperCase) {
  music.content.forEach((line, index) => {
    let slide = pptx.addSlide();
    darkSlideTheme(slide, darkTheme)
    let formattedLine = line.replace(/<br>/g, '\n');
    formattedLine = transformText(formattedLine, toUpperCase);
    addFullScreenText(slide, formattedLine, darkTheme);
  });
}

function addFullScreenText(slide, text, darkTheme) {
  let xPos = 0.5;
  let yPos = 0.5;
  let width = 9;
  let height = 5;
  let maxFontSize = 48;
  let minFontSize = 14;
  let fontSize = maxFontSize;

  while (fontSize >= minFontSize) {
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

    const textOverflows = isTextOverflowing(slide);

    if (!textOverflows) {
      break;
    }

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

function findMusicById(musicId) {
  let music = musics.find(m => m.id === musicId);
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
