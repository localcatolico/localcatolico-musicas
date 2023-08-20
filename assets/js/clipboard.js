function copyPlaylistToClipboard(href, playlist) {
  if (href.split("?q=")[1] != ""){
    href = href.split("?q=")[0] + "?q=" + href.split("?q=")[1];
  }

  navigator.clipboard.writeText(href);

  var element = document.getElementById("toast");
  element.classList.add("show");
}
