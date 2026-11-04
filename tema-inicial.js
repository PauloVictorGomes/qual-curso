// Aplica o tema claro/escuro antes de desenhar a página, para não piscar.
// Carregado de forma síncrona no <head> de cada página.
(function () {
  var salvo = null;
  try { salvo = localStorage.getItem("tema"); } catch (e) {}
  var escuro = salvo ? salvo === "escuro" : window.matchMedia("(prefers-color-scheme: dark)").matches;
  document.documentElement.setAttribute("data-tema", escuro ? "escuro" : "claro");
})();
