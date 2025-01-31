document.addEventListener("DOMContentLoaded", function() {
  const files = [
      { name: "Apostíla Ministério.pdf", url: "assets/files/apostila-ministerio.pdf" },
      { name: "Músicas Retiro.pdf", url: "assets/files/musicas-retiro.pdf" },
      { name: "Só Por Deus (Prainha).pdf", url: "assets/files/so-por-deus-prainha.pdf" },
      { name: "Sopro de Vida.pdf", url: "assets/files/sopro-de-vida.pdf" },
  ];
  const fileList = document.getElementById('fileList');
  files.forEach(file => {
      const fileCard = document.createElement('div');
      fileCard.classList.add('col-md-3', 'col-10', 'mb-3');
      fileCard.innerHTML = `
          <div class="card file-card p-3 text-center">
              <i class="fas fa-file-pdf fa-3x text-danger"></i>
              <p class="mt-2">${file.name}</p>
              <a href="${file.url}" target="_blank" class="btn btn-primary btn-sm">Abrir</a>
          </div>
      `;
      fileList.appendChild(fileCard);
  });
});
