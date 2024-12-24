const sheetUrl = "https://docs.google.com/spreadsheets/d/17iuLN9zmfkS3BTWtAY4-Ibw6EUw2dWsk52JcNfZjih8/pub?output=csv";

async function fetchDataSheet() {
  try {
    const response = await fetch(sheetUrl);
    const data = await response.text();
    const parsedData = parseCSV(data);

    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get("q");

    let html = "";
    let found = false;

    for (let i = 0; i < parsedData.length; i++) {
      const row = parsedData[i];

      // console.log(row[0])

      if (row[0] === id) {
        found = true;
        html += `<div class="accordion-item">
                   <h2 class="accordion-header" id="${row[0]}">
                     <a class="accordion-button" type="button" href="/playlist.html?q=${row[0]}">
                       ${row[0]}
                     </a>
                   </h2>
                 <div id="flush-collapse` + row[0] + `" class="accordion-collapse collapse show" aria-labelledby="` + row[0] + `" data-bs-parent="#churchs">
                   <div class="accordion-body">
                  <button class="btn btn-sm btn-secondary float-end" onclick="copyLinkToClipboard('` + window.location.href + `')">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-files" viewBox="0 0 16 16">
                        <path d="M13 0H6a2 2 0 0 0-2 2 2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 13V4a2 2 0 0 0-2-2H5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1zM3 4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4z"/>
                      </svg>
                      Compartilhar
                    </button>`;

        for (let j = i + 1; j < parsedData.length; j++) {
          if (parsedData[j].every(cell => cell === "")) {
            break;
          }
          html += `<h1>` + parsedData[j][1] + `</h1>`
          html += `<h2>` + parsedData[j][2] + `</h2>`
          html += `<a class="btn btn-sm btn-danger" href="` + parsedData[j][5] + `" target="_blank">YouTube</a>&nbsp;`
          html += `<a class="btn btn-sm btn-warning" href="` + parsedData[j][6] + `" target="_blank">Cifra</a>&nbsp;`
          html += `<a class="btn btn-sm btn-success" href="` + parsedData[j][7] + `" target="_blank">Letra</a>&nbsp;`
          html += `<br><br>`
          if (parsedData[j][3] != "") {
            html += `<h5><b>Tom: ` + parsedData[j][3] + `</b></h5>`
            html += `<br>`
          }
          letra = await getLetra(parsedData[j][4])
          html += `<div style="font-size: 23px">` + letra + `</div>`
          html += `<br><br><br>`
        }
      }

      if (found && row[0] === "") {
        break;
      }
    }

    if (!found) {
      html = "<p>Nenhum resultado encontrado.</p>";
    }

    html +=
          `</div>
        </div>
      </div>`;

    document.getElementById("repertorio").innerHTML = html;
  } catch (error) {
    console.error("Erro ao buscar os dados:", error);
  }
}

function parseCSV(data) {
  const lines = data.split("\n");
  return lines.map(line => line.split(",").map(cell => cell.trim()));
}

async function getLetra(musica) {
  try {
    const response = await fetch('data/musics.json');
    if (!response.ok) {
      throw new Error('Erro ao carregar o arquivo JSON');
    }

    const data = await response.json();
    const itemEncontrado = data.musics.find(item => item.id === musica);
    if (itemEncontrado) {
      const formattedContent = itemEncontrado.content.join('<br><br>');
      console.log('Item encontrado:', formattedContent);
      return formattedContent;
    } else {
      console.log('Item não encontrado');
    }
  } catch (error) {
    console.error('Erro:', error);
  }
}

fetchDataSheet();
