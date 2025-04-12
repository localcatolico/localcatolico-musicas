# Local Católico - Musicas

Repositório com letras de músicas católicas por momento.

[Playlists](https://docs.google.com/spreadsheets/d/17iuLN9zmfkS3BTWtAY4-Ibw6EUw2dWsk52JcNfZjih8)

[Script](https://script.google.com/u/1/home/projects/14NDK5KxXi6lp_SKd5XoyhoEcH5DD0QK75hEtCW34aOAqoNDMoVr-ceMi)

```bash
python3 -m http.server
```

http://localhost:8000

# Criando a estrutura json da música com scrape do letras.com

```
docker run --rm rafaelbmateus/scrape-letras https://www.letras.mus.br/diante-do-trono/80790/
```

Incluir o objeto de retorno do arquivo [data/musics.json](/data/musics.json)
