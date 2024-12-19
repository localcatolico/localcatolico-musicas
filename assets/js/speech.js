// Verifica se o navegador suporta a API de reconhecimento de fala
if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'pt-BR'; // Define o idioma como português do Brasil
  recognition.interimResults = false; // Retorna apenas resultados finais

  const voiceButton = document.getElementById('voiceButton');
  const searchInput = document.getElementById('searchInput');
  const statusLabel = document.getElementById('statusLabel');

  let isListening = false; // Controle do estado do reconhecimento

  // Inicia ou para o reconhecimento de voz ao clicar no botão
  voiceButton.addEventListener('click', () => {
      if (isListening) {
          recognition.stop(); // Para a captura
      } else {
          recognition.start(); // Inicia a captura
      }
  });

  // Evento disparado quando o reconhecimento começa
  recognition.addEventListener('start', () => {
      isListening = true;
      voiceButton.classList.remove('btn-primary');
      voiceButton.classList.add('btn-danger'); // Altera a cor do botão para vermelho
      voiceButton.innerHTML = '🛑'; // Altera o ícone do botão
      statusLabel.style.display = 'block'; // Mostra a mensagem de captura
  });

  // Evento disparado quando o reconhecimento para
  recognition.addEventListener('end', () => {
      isListening = false;
      voiceButton.classList.remove('btn-danger');
      voiceButton.classList.add('btn-primary'); // Restaura a cor original do botão
      voiceButton.innerHTML = '🎤'; // Restaura o ícone original
      statusLabel.style.display = 'none'; // Esconde a mensagem de captura
  });

  // Evento disparado quando há um resultado do reconhecimento
  recognition.addEventListener('result', (event) => {
      const transcript = event.results[0][0].transcript; // Obtém o texto da fala
      searchInput.value = transcript; // Coloca o texto no input
      searchMusic(); // Chama a função de pesquisa
  });

  recognition.addEventListener('error', (event) => {
      console.error('Erro no reconhecimento de fala:', event.error);
      alert('Erro ao usar o reconhecimento de voz. Tente novamente.');
  });
} else {
  alert('Seu navegador não suporta reconhecimento de voz.');
}
