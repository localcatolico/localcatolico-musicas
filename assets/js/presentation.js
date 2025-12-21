let currentSlide = 0;
let slides = [];
let musics = [];
let darkTheme = false;

// Carrega os dados
fetch("/data/musics.json")
  .then(res => res.json())
  .then(data => {
    musics = data.musics;
    generatePresentation();
  });

function generatePresentation() {
  const params = new URLSearchParams(window.location.search);
  
  // Configurações
  const title = params.get('title') || 'Local Católico';
  const fontOption = params.get('font') || 'original';
  const themeOption = params.get('theme') || 'light';
  const toUpperCase = fontOption === 'uppercase';
  darkTheme = themeOption === 'dark';
  
  // Slide inicial
  addTitleSlide(title);
  addEmptySlide();
  
  // Oração Eucarística
  if (params.has('eucaristicPrayer')) {
    const prayerId = params.get('eucaristicPrayer');
    // Implementar quando houver dados de orações
  }
  
  // Músicas
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
      const musicId = params.get(fieldId);
      const music = findMusicById(musicId);
      if (music) {
        addMusicTitleSlide(music);
        addMusicContentSlides(music, toUpperCase);
        addEmptySlide();
      }
    }
  });
  
  renderSlides();
  updateControls();
}

function addTitleSlide(title) {
  const slide = {
    type: 'title',
    content: {
      title: 'Local Católico',
      subtitle: title,
      logo: 'https://localcatolico.com.br/assets/img/logo.png'
    }
  };
  slides.push(slide);
}

function addEmptySlide() {
  slides.push({ type: 'empty' });
}

function addMusicTitleSlide(music) {
  const slide = {
    type: 'music-title',
    content: {
      name: music.name,
      artist: music.artist || ''
    }
  };
  slides.push(slide);
}

function addMusicContentSlides(music, toUpperCase) {
  if (music.content && Array.isArray(music.content)) {
    music.content.forEach(line => {
      let formattedLine = line.replace(/<br>/g, '\n');
      if (toUpperCase) {
        formattedLine = formattedLine.toUpperCase();
      }
      slides.push({
        type: 'content',
        content: formattedLine
      });
    });
  }
}

function renderSlides() {
  const container = document.getElementById('slide-container');
  container.innerHTML = '';
  
  slides.forEach((slide, index) => {
    const slideDiv = document.createElement('div');
    slideDiv.className = `slide ${darkTheme ? 'dark' : 'light'}`;
    slideDiv.id = `slide-${index}`;
    
    if (slide.type === 'title') {
      slideDiv.innerHTML = `
        <div class="slide-title">${slide.content.title}</div>
        <img src="${slide.content.logo}" class="slide-logo" alt="Logo">
        <div class="slide-subtitle">${slide.content.subtitle}</div>
      `;
    } else if (slide.type === 'music-title') {
      slideDiv.innerHTML = `
        <div class="slide-title">${slide.content.name}</div>
        ${slide.content.artist ? `<div class="slide-subtitle">${slide.content.artist}</div>` : ''}
      `;
    } else if (slide.type === 'content') {
      slideDiv.innerHTML = `
        <div class="slide-content">${slide.content}</div>
      `;
    }
    // Empty slides são apenas slides vazios
    
    container.appendChild(slideDiv);
  });
  
  document.getElementById('total-slides').textContent = slides.length;
  showSlide(0);
}

function showSlide(index) {
  const allSlides = document.querySelectorAll('.slide');
  allSlides.forEach(slide => slide.classList.remove('active'));
  
  if (allSlides[index]) {
    allSlides[index].classList.add('active');
    currentSlide = index;
    updateControls();
  }
}

function nextSlide() {
  if (currentSlide < slides.length - 1) {
    showSlide(currentSlide + 1);
  }
}

function previousSlide() {
  if (currentSlide > 0) {
    showSlide(currentSlide - 1);
  }
}

function updateControls() {
  document.getElementById('current-slide').textContent = currentSlide + 1;
  document.getElementById('prev-btn').disabled = currentSlide === 0;
  document.getElementById('next-btn').disabled = currentSlide === slides.length - 1;
}

function findMusicById(musicId) {
  return musics.find(m => m.id === musicId) || null;
}

function sharePresentation() {
  const url = window.location.href;
  
  if (navigator.share) {
    navigator.share({
      title: 'Apresentação Local Católico',
      text: 'Confira esta apresentação de músicas católicas',
      url: url
    }).catch(err => console.log('Erro ao compartilhar:', err));
  } else {
    navigator.clipboard.writeText(url).then(() => {
      alert('Link copiado para a área de transferência!');
    }).catch(err => {
      prompt('Copie este link:', url);
    });
  }
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(err => {
      alert('Erro ao entrar em tela cheia: ' + err.message);
    });
  } else {
    document.exitFullscreen();
  }
}

// Navegação por teclado
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' || e.key === ' ') {
    e.preventDefault();
    nextSlide();
  } else if (e.key === 'ArrowLeft') {
    e.preventDefault();
    previousSlide();
  } else if (e.key === 'Escape') {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  }
});

// Navegação por toque (mobile)
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  const swipeThreshold = 50;
  const diff = touchStartX - touchEndX;
  
  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      nextSlide(); // Swipe left
    } else {
      previousSlide(); // Swipe right
    }
  }
}
