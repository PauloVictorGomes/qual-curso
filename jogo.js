// Fluxo do modo aventura (jogo.html): mundo → personagem → 15 cenas → acampamento → revelação.
// Os mundos ficam em data/mundos/*.js; o cálculo, em nucleo.js; o resultado, em resultado.js.

(function () {
  const $ = id => document.getElementById(id);
  const telas = ["tela-mundos", "tela-personagem", "tela-cena", "tela-acampamento", "tela-resultado"];
  const PAUSA_ESCOLHA_MS = 200; // tempo para ver a opção marcada antes da reação

  let mundo = null;
  let personagem = null;
  let cenaAtual = 0;
  let escolhas = [];      // letra escolhida em cada cena
  let ordemOpcoes = [];   // opções embaralhadas de cada cena
  let abertas = {};
  let travado = false;    // evita clique duplo durante a pausa
  let esperandoContinuar = false;

  function mostrar(id) {
    telas.forEach(t => { $(t).hidden = t !== id; });
    window.scrollTo(0, 0);
    Comum.focarTitulo($(id));
  }

  // Embaralha sem mexer no original (Fisher-Yates)
  function embaralhar(lista) {
    const copia = lista.slice();
    for (let i = copia.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
  }

  function nomeJogador() {
    return Comum.participante().apelido || personagem.nome;
  }

  // ----- 1. Mundos -----
  function aplicarTemaMundo(m) {
    document.body.style.setProperty("--mundo-a", m.tema.a);
    document.body.style.setProperty("--mundo-b", m.tema.b);
    document.body.dataset.mundo = m.id;
  }

  function renderMundos() {
    const box = $("lista-mundos");
    box.innerHTML = "";
    MUNDOS.forEach(m => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "cartao-mundo";
      b.style.setProperty("--mundo-a", m.tema.a);
      b.style.setProperty("--mundo-b", m.tema.b);
      const emoji = document.createElement("span");
      emoji.className = "mundo-emoji";
      emoji.setAttribute("aria-hidden", "true");
      emoji.textContent = m.emoji;
      const texto = document.createElement("span");
      texto.className = "mundo-texto";
      const genero = document.createElement("span");
      genero.className = "mundo-genero";
      genero.textContent = m.genero;
      const nome = document.createElement("strong");
      nome.textContent = m.nome;
      const resumo = document.createElement("span");
      resumo.className = "mundo-resumo";
      resumo.textContent = m.resumo;
      texto.append(genero, nome, resumo);
      b.append(emoji, texto);
      b.addEventListener("click", () => {
        if (Comum.exigirConsentimento()) escolherMundo(m.id);
      });
      box.appendChild(b);
    });
  }

  function escolherMundo(id) {
    mundo = MUNDOS.find(m => m.id === id);
    if (!mundo) return;
    personagem = null;
    aplicarTemaMundo(mundo);
    $("banner-emoji").textContent = mundo.emoji;
    $("banner-genero").textContent = mundo.genero;
    $("banner-nome").textContent = mundo.nome;
    $("mundo-intro").textContent = mundo.intro;
    renderPersonagens();
    mostrar("tela-personagem");
  }

  // ----- 2. Personagem -----
  function renderPersonagens() {
    const box = $("lista-personagens");
    box.innerHTML = "";
    mundo.personagens.forEach((p, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "cartao-personagem";
      b.setAttribute("role", "radio");
      b.setAttribute("aria-checked", "false");
      const avatar = document.createElement("span");
      avatar.className = "personagem-avatar";
      avatar.setAttribute("aria-hidden", "true");
      avatar.textContent = p.emoji;
      const item = document.createElement("span");
      item.className = "personagem-item";
      item.textContent = p.item;
      avatar.appendChild(item);
      const nome = document.createElement("strong");
      nome.textContent = p.nome;
      const desc = document.createElement("span");
      desc.className = "personagem-desc";
      desc.textContent = p.descricao;
      b.append(avatar, nome, desc);
      b.addEventListener("click", () => escolherPersonagem(i));
      box.appendChild(b);
    });
    $("btn-iniciar").disabled = true;
  }

  function escolherPersonagem(i) {
    personagem = mundo.personagens[i];
    Array.from($("lista-personagens").children).forEach((b, j) => {
      b.classList.toggle("selecionado", i === j);
      b.setAttribute("aria-checked", i === j ? "true" : "false");
    });
    $("btn-iniciar").disabled = false;
  }

  function iniciarAventura() {
    if (!personagem) return;
    cenaAtual = 0;
    escolhas = [];
    ordemOpcoes = mundo.cenas.map(c => embaralhar(c.opcoes));
    $("cena-avatar").textContent = personagem.emoji;
    $("cena-nome").textContent = nomeJogador();
    $("cena-mundo").textContent = mundo.nome;
    renderCena();
    mostrar("tela-cena");
  }

  // ----- 3. Cenas -----
  function renderTrilha() {
    const box = $("trilha");
    box.innerHTML = "";
    mundo.cenas.forEach((_, i) => {
      const passo = document.createElement("span");
      passo.className = "passo" + (i < cenaAtual ? " feito" : i === cenaAtual ? " atual" : "");
      box.appendChild(passo);
    });
  }

  function renderCena() {
    const cena = mundo.cenas[cenaAtual];
    $("cena-capitulo").textContent = `Capítulo ${cenaAtual + 1} de ${mundo.cenas.length}`;
    renderTrilha();
    $("cena-titulo").textContent = cena.titulo;
    $("cena-texto").textContent = cena.texto;
    $("cena-reacao").hidden = true;
    esperandoContinuar = false;

    const cartao = $("cartao-cena");
    cartao.classList.remove("entrar");
    void cartao.offsetWidth; // reinicia a animação
    cartao.classList.add("entrar");

    const box = $("cena-opcoes");
    box.innerHTML = "";
    ordemOpcoes[cenaAtual].forEach((opcao, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "opcao";
      const num = document.createElement("span");
      num.className = "opcao-num";
      num.setAttribute("aria-hidden", "true");
      num.textContent = i + 1;
      const texto = document.createElement("span");
      texto.textContent = opcao.texto;
      b.append(num, texto);
      b.addEventListener("click", () => escolher(i));
      box.appendChild(b);
    });

    if (!$("tela-cena").hidden) Comum.focarTitulo($("tela-cena"));
  }

  function escolher(i) {
    if (travado || esperandoContinuar) return;
    const opcao = ordemOpcoes[cenaAtual][i];
    escolhas[cenaAtual] = opcao.perfil;
    Array.from($("cena-opcoes").children).forEach((b, j) => {
      b.classList.toggle("selecionada", i === j);
      b.classList.toggle("apagada", i !== j);
      b.disabled = true;
    });

    travado = true;
    setTimeout(() => {
      travado = false;
      esperandoContinuar = true;
      $("cena-reacao-texto").textContent = opcao.reacao;
      $("cena-reacao").hidden = false;
      $("btn-continuar").textContent =
        cenaAtual === mundo.cenas.length - 1 ? "Encerrar a jornada →" : "Continuar →";
      $("btn-continuar").focus({ preventScroll: true });
      $("cena-reacao").scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, PAUSA_ESCOLHA_MS);
  }

  function continuar() {
    if (!esperandoContinuar) return;
    if (cenaAtual < mundo.cenas.length - 1) {
      cenaAtual += 1;
      renderCena();
      window.scrollTo(0, 0);
    } else {
      irAoAcampamento();
    }
  }

  // ----- 4. Acampamento -----
  function irAoAcampamento() {
    $("acampamento-texto").textContent = mundo.acampamento;
    Comum.montarAbertas($("form-abertas"), abertas);
    mostrar("tela-acampamento");
  }

  function finalizar() {
    if (!Comum.validarAbertas($("form-abertas"), abertas)) return;
    mostrarResultado();
    // Só aqui: os atalhos do modo de teste mostram o resultado sem enviar para a planilha
    Resultado.enviar();
  }

  // ----- 5. Revelação e resultado -----
  function montarRevelacao(perfis) {
    const [p1, p2] = perfisMaisFortes(perfis);
    const t1 = mundo.titulos[p1], t2 = mundo.titulos[p2];
    const cursos = ranquearCursos(perfis, PROFISSOES).slice(0, 3).map(c => c.nome);

    const cartao = document.createElement("div");
    cartao.className = "cartao revelacao";
    cartao.style.setProperty("--mundo-a", mundo.tema.a);
    cartao.style.setProperty("--mundo-b", mundo.tema.b);

    const topo = document.createElement("div");
    topo.className = "revelacao-topo";
    const avatar = document.createElement("span");
    avatar.className = "revelacao-avatar";
    avatar.setAttribute("aria-hidden", "true");
    avatar.textContent = personagem.emoji;
    const cabecalho = document.createElement("div");
    const onde = document.createElement("p");
    onde.className = "revelacao-onde";
    // "noMundo" traz a preposição certa ("no Reino de Valdora", "na Estação Órion")
    onde.textContent = `${mundo.emoji} Sua jornada ${mundo.noMundo || "em " + mundo.nome}`;
    const quem = document.createElement("h3");
    quem.textContent = `${nomeJogador()} jogou como`;
    cabecalho.append(onde, quem);
    topo.append(avatar, cabecalho);

    const titulo = document.createElement("p");
    titulo.className = "revelacao-titulo";
    const forte1 = document.createElement("strong");
    forte1.textContent = t1.nome;
    const forte2 = document.createElement("strong");
    forte2.textContent = t2.nome;
    titulo.append(forte1, " com um toque de ", forte2);

    const frase = document.createElement("p");
    frase.textContent = `Nas suas escolhas, você ${t1.frase}, e também ${t2.frase}.`;

    const ponte = document.createElement("p");
    ponte.className = "revelacao-ponte";
    ponte.textContent = "No mundo real, quem joga assim costuma combinar com " +
      `${cursos.slice(0, -1).join(", ")} e ${cursos[cursos.length - 1]}.`;

    cartao.append(topo, titulo, frase, ponte);
    return cartao;
  }

  function mostrarResultado() {
    const perfis = calcularPerfisPorEscolhas(escolhas, mundo.cenas);
    Resultado.mostrar({
      perfis,
      abertas,
      extra: montarRevelacao(perfis),
      modo: `Modo aventura (${mundo.nome})`,
      // Cada perfil aparece só uma vez por cena, então a letra identifica a opção
      respostas: mundo.cenas.map((cena, i) => ({
        perfil: escolhas[i],
        pergunta: cena.titulo,
        resposta: cena.opcoes.find(o => o.perfil === escolhas[i]).texto
      }))
    });
    mostrar("tela-resultado");
  }

  function jogarDeNovo() {
    mundo = null;
    personagem = null;
    escolhas = [];
    abertas = {};
    $("form-abertas").innerHTML = "";
    delete document.body.dataset.mundo;
    mostrar("tela-mundos");
  }

  // ----- Eventos -----
  Comum.iniciarTema();
  Resultado.iniciar({
    container: $("tela-resultado"),
    titulo: "Veja o que suas escolhas mostram",
    textoRefazer: "Jogar em outro mundo",
    aoRefazer: jogarDeNovo
  });
  Comum.montarEntrada($("entrada"));
  renderMundos();

  $("btn-voltar-mundos").addEventListener("click", () => mostrar("tela-mundos"));
  $("btn-iniciar").addEventListener("click", iniciarAventura);
  $("btn-continuar").addEventListener("click", continuar);
  $("btn-finalizar").addEventListener("click", finalizar);

  // Atalho: teclas 1 a 4 escolhem a opção da cena
  document.addEventListener("keydown", e => {
    if ($("tela-cena").hidden || e.ctrlKey || e.metaKey || e.altKey) return;
    const n = Number(e.key);
    if (n >= 1 && n <= ordemOpcoes[cenaAtual].length) escolher(n - 1);
  });

  // ----- Modo de teste (jogo.html?teste) -----
  // Carrega teste/jogo-teste.js, com o verificador de balanceamento e a simulação.
  if (new URLSearchParams(location.search).has("teste")) {
    window.jogoTeste = {
      escolherMundo,
      escolherPersonagem,
      iniciarAventura,
      // Registra a escolha da cena atual sem animação e avança
      escolherLetra(letra) {
        escolhas[cenaAtual] = letra;
        esperandoContinuar = true;
        continuar();
      },
      // Mostra a cena n já com as escolhas anteriores feitas
      irParaCena(n) {
        cenaAtual = n;
        renderCena();
      },
      cenaAtual: () => mundo.cenas[cenaAtual],
      escolher,
      finalizarCom(textos) {
        abertas = { ...textos };
        $("form-abertas").innerHTML = "";
        Comum.montarAbertas($("form-abertas"), abertas);
        mostrarResultado();
      },
      irAoAcampamento
    };
    const s = document.createElement("script");
    s.src = "teste/jogo-teste.js";
    document.body.appendChild(s);
  }
})();
