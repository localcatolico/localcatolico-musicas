function copyToClipboard(text) {
  navigator.clipboard.writeText(text);

  var element = document.getElementById("toast");
  element.classList.add("show");
}
