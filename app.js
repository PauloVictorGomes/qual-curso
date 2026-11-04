// Fluxo do quiz (index.html): 24 perguntas de escala, perguntas abertas e resultado.
// O cálculo fica em nucleo.js; a tela de resultado, em resultado.js.

(function () {
  const ESCALA = [
    "Nada a ver comigo",
    "Pouco a ver comigo",
    "Mais ou menos",
    "Tem a ver comigo",
    "Tudo a ver comigo"
  ];

  const $ = id => document.getElementById(id);
  const telas = ["tela-intro", "tela-quiz", "tela-abertas", "tela-resultado"];

  // Frases de incentivo mostradas ao chegar em certas perguntas (índice 0-based)
  const INCENTIVOS = {
    12: "Metade do caminho! Continue assim.",
    20: "Só mais 4!"
  };
  const PAUSA_RESPOSTA_MS = 180; // tempo para ver a opção marcada antes de avançar

  let indice = 0;
  let respostas = new Array(PERGUNTAS.length).fill(null);
  let abertas = {};
  let avancando = false;

  // Mostra uma tela e leva o foco ao título (ajuda leitores de tela)
  function mostrar(id) {
    telas.forEach(t => { $(t).hidden = t !== id; });
    window.scrollTo(0, 0);
    Comum.focarTitulo($(id));
  }

  // ----- Perguntas de escala -----
  function renderPergunta() {
    const total = PERGUNTAS.length;
    $("contador").textContent = `Pergunta ${indice + 1} de ${total}`;
    $("barra-progresso").style.width = `${(indice / total) * 100}%`;
    $("pergunta-texto").textContent = PERGUNTAS[indice].texto;
    $("incentivo").textContent = INCENTIVOS[indice] || "";

    const cartao = $("cartao-pergunta");
    cartao.classList.remove("entrar");
    void cartao.offsetWidth; // reinicia a animação
    cartao.classList.add("entrar");

    const box = $("opcoes");
    box.innerHTML = "";
    ESCALA.forEach((rotulo, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "opcao" + (respostas[indice] === i + 1 ? " selecionada" : "");
      b.setAttribute("aria-pressed", respostas[indice] === i + 1 ? "true" : "false");
      const num = document.createElement("span");
      num.className = "opcao-num";
      num.setAttribute("aria-hidden", "true");
      num.textContent = i + 1;
      const texto = document.createElement("span");
      texto.textContent = rotulo;
      b.append(num, texto);
      b.addEventListener("click", () => responder(i + 1));
      box.appendChild(b);
    });

    if (!$("tela-quiz").hidden) Comum.focarTitulo($("tela-quiz"));
  }

  function responder(valor) {
    if (avancando) return; // evita clique duplo pular uma pergunta
    respostas[indice] = valor;
    Array.from($("opcoes").children).forEach((b, i) => {
      b.classList.toggle("selecionada", i + 1 === valor);
      b.setAttribute("aria-pressed", i + 1 === valor ? "true" : "false");
    });

    avancando = true;
    setTimeout(() => {
      avancando = false;
      if (indice < PERGUNTAS.length - 1) {
        indice += 1;
        renderPergunta();
      } else {
        $("barra-progresso").style.width = "100%";
        Comum.montarAbertas($("form-abertas"), abertas);
        mostrar("tela-abertas");
      }
    }, PAUSA_RESPOSTA_MS);
  }

  function finalizar() {
    if (Comum.validarAbertas($("form-abertas"), abertas)) mostrarResultado();
  }

  // ----- Resultado -----
  function mostrarResultado() {
    const perfis = calcularPerfis(respostas, PERGUNTAS);
    Resultado.mostrar({
      perfis,
      abertas,
      modo: "Quiz rápido",
      respostas: PERGUNTAS.map((p, i) => ({
        perfil: p.perfil,
        pergunta: p.texto,
        resposta: `${ESCALA[respostas[i] - 1]} (${respostas[i]}/5)`
      }))
    });
    mostrar("tela-resultado");
  }

  function reiniciar() {
    respostas = new Array(PERGUNTAS.length).fill(null);
    abertas = {};
    $("form-abertas").innerHTML = "";
    mostrar("tela-intro");
  }

  // ----- Eventos -----
  Comum.iniciarTema();
  Resultado.iniciar({
    container: $("tela-resultado"),
    titulo: "Veja o que suas respostas mostram",
    textoRefazer: "Refazer o quiz",
    aoRefazer: reiniciar
  });

  Comum.montarEntrada($("entrada"));
  $("link-aventura").addEventListener("click", e => {
    if (!Comum.exigirConsentimento()) e.preventDefault();
  });

  $("btn-comecar").addEventListener("click", () => {
    if (!Comum.exigirConsentimento()) return;
    indice = 0;
    renderPergunta();
    mostrar("tela-quiz");
  });

  // Atalho: teclas 1 a 5 respondem a pergunta atual
  document.addEventListener("keydown", e => {
    if ($("tela-quiz").hidden || e.ctrlKey || e.metaKey || e.altKey) return;
    const n = Number(e.key);
    if (n >= 1 && n <= ESCALA.length) responder(n);
  });

  $("btn-voltar").addEventListener("click", () => {
    if (avancando) return;
    if (indice > 0) {
      indice -= 1;
      renderPergunta();
    } else {
      mostrar("tela-intro");
    }
  });

  $("btn-voltar-abertas").addEventListener("click", () => {
    indice = PERGUNTAS.length - 1;
    renderPergunta();
    mostrar("tela-quiz");
  });

  $("btn-finalizar").addEventListener("click", finalizar);

  // ----- Modo de teste (index.html?teste) -----
  // Carrega teste/perfis-teste.js, que mostra atalhos para preencher o quiz.
  if (new URLSearchParams(location.search).has("teste")) {
    window.quizTeste = {
      // Preenche tudo e vai direto ao resultado
      resultado(novasRespostas, textos) {
        respostas = novasRespostas.slice();
        abertas = { ...textos };
        $("form-abertas").innerHTML = "";
        Comum.montarAbertas($("form-abertas"), abertas);
        mostrarResultado();
      },
      abrirAreas: i => Resultado.teste.abrirAreas(i),
      exportar: () => Resultado.teste.exportar(),
      prepararPdf: indices => Resultado.teste.prepararPdf(indices),
      // Preenche só as escalas e para nas perguntas abertas (vazias)
      abertas(novasRespostas) {
        respostas = novasRespostas.slice();
        abertas = {};
        $("form-abertas").innerHTML = "";
        Comum.montarAbertas($("form-abertas"), abertas);
        mostrar("tela-abertas");
      }
    };
    const s = document.createElement("script");
    s.src = "teste/perfis-teste.js";
    document.body.appendChild(s);
  }
})();
