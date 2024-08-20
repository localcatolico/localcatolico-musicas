const sheetUrl = "https://docs.google.com/spreadsheets/d/17iuLN9zmfkS3BTWtAY4-Ibw6EUw2dWsk52JcNfZjih8/pub?output=csv";

function parseCSV(data) {
  const lines = data.split("\n");

  return lines.slice(1).map(line => {
    const values = line.split(",");
    return values[0].trim();
  });
}

async function fetchData() {
  try {
    const response = await fetch(sheetUrl);
    const data = await response.text();
    const parsedData = parseCSV(data);
    let html = "";

    parsedData.forEach(value => {
      if (value) {
        console.log(value);
        html += 
            `<div class="accordion-item">
              <h2 class="accordion-header" id="` + value + `">
                <a class="accordion-button" type="button" href="/playlist.html?id=` + value + `">
                  ` + value + `
                </a>
              </h2>
            </div>`;
      }
    });

    document.getElementById("playlists").innerHTML = html;
  } catch (error) {
    console.error("Erro ao buscar os dados:", error);
  }
}

fetchData();
