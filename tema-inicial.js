// Aplica o tema antes de desenhar a página, para não piscar.
// Carregado de forma síncrona no <head> de cada página.
// O padrão é o tema escuro; o claro só vale se a pessoa escolher no botão.
(function () {
  var salvo = null;
  try { salvo = localStorage.getItem("tema"); } catch (e) {}
  document.documentElement.setAttribute("data-tema", salvo === "claro" ? "claro" : "escuro");
})();
