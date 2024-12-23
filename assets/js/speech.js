if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'pt-BR';
  recognition.interimResults = false;

  const voiceButton = document.getElementById('voiceButton');
  const searchInput = document.getElementById('searchInput');
  const statusLabel = document.getElementById('statusLabel');

  let isListening = false;
  voiceButton.addEventListener('click', () => {
    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }
  });

  recognition.addEventListener('start', () => {
    isListening = true;
    voiceButton.classList.remove('btn-primary');
    voiceButton.classList.add('btn-danger');
    voiceButton.innerHTML = '<i class="fas fa-microphone-slash"></i>';
    statusLabel.style.display = 'block';
  });

  recognition.addEventListener('end', () => {
    isListening = false;
    voiceButton.classList.remove('btn-danger');
    voiceButton.classList.add('btn-primary');
    voiceButton.innerHTML = '<i class="fas fa-microphone"></i>';
    statusLabel.style.display = 'none';
  });

  recognition.addEventListener('result', (event) => {
    const transcript = event.results[0][0].transcript;
    searchInput.value = transcript;
    searchMusic();
  });

  recognition.addEventListener('error', (event) => {
    console.error('Erro no reconhecimento de fala:', event.error);
    alert('Erro ao usar o reconhecimento de voz. Tente novamente.');
  });
} else {
  alert('Seu navegador não suporta reconhecimento de voz.');
}
