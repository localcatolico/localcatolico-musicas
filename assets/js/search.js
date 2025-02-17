var musics;
fetch("/data/musics.json")
  .then(res => res.json())
  .then(data => {
    musics = data.musics;
   })
  .then(() => {
    searchMusic();
   });

function searchMusic() {
  const searchQuery = document.getElementById('searchInput').value.toLowerCase();
  const resultsContainer = document.getElementById('searchResults');
  resultsContainer.innerHTML = '';

  let filteredMusics = musics.filter(music => 
    music.name != "" &&
    (
      music.name.toLowerCase().includes(searchQuery) || 
      music.artist.toLowerCase().includes(searchQuery) ||
      music.content.join(" ").toLowerCase().includes(searchQuery)
    )
  );

  // Ordena os resultados por ordem alfabética pelo nome da música
  filteredMusics = filteredMusics.sort((a, b) => a.name.localeCompare(b.name));

  if (filteredMusics.length > 0) {
    resultsContainer.innerHTML = `<p class="text-secondary text-end">` + filteredMusics.length + ` músicas</p>`;
    filteredMusics.forEach(music => {
      let contentMatch = "";
      if (searchQuery && music.content.join(" ").toLowerCase().includes(searchQuery)) {
        const fullContent = music.content.join(" ");
        const startIndex = fullContent.toLowerCase().indexOf(searchQuery);
        const endIndex = startIndex + searchQuery.length;

        const snippetStart = Math.max(0, startIndex - 100);
        const snippetEnd = Math.min(fullContent.length, endIndex + 100);
        const snippet = fullContent.substring(snippetStart, snippetEnd);

        contentMatch = snippet.replace(new RegExp(searchQuery, 'gi'), match => `<mark>${match}</mark>`);
      }

      resultsContainer.innerHTML += `
        <div class="col-md-12 music-item">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">${music.name}</h5>
              <p class="card-text">${music.artist}</p>
              ${contentMatch ? `<p class="card-text">${contentMatch}</p>` : ''}
              <a href="/music.html?q=${music.id}" class="btn btn-primary" target="_blank">Abrir música <i class="fas fa-external-link-alt fa-sm"></i></a>
              <a href="${music.youtube_url}" class="btn btn-danger float-end ms-2" target="_blank"><i class="fab fa-youtube"></i></a>
              <a href="${music.cifra_url}" class="btn btn-warning float-end text-white ms-2" target="_blank"><i class="fas fa-guitar"></i></a>
            </div>
          </div>
        </div>
      `;
    });
  } else {
    resultsContainer.innerHTML = `<p class="text-muted">Nenhum resultado encontrado.</p>`;
  }
}
