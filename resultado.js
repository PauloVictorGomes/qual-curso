// Seu número de WhatsApp, só com dígitos, com país e DDD. Exemplo: "5521999998888".
// Vazio: o WhatsApp abre com o texto pronto e a pessoa escolhe o contato.
const WHATSAPP_NUMERO = "5521964287564";

// Endereço do Apps Script que salva as respostas na planilha (termina em /exec).
// Vazio: nada é salvo ao finalizar. Veja o README.md.
const PLANILHA_URL = "https://script.google.com/macros/s/AKfycbxdPoJS0cck-lR8B974rKcqbUf5Xnoh6pYgPjtpsZLddgpHMhSqJeRoe5__1WlZ4hxA/exec";

// Tela de resultado compartilhada pelo quiz (index.html) e pelo jogo (jogo.html):
// gráfico de perfis, cursos, organograma de áreas, envio do resultado e exportação em PDF.
//
// Uso:
//   Resultado.iniciar({ container, titulo, textoRefazer, aoRefazer })  // uma vez
//   Resultado.mostrar({ perfis, abertas, extra, modo, respostas })      // a cada resultado
// "extra" é um elemento opcional mostrado no topo (e no PDF), como a revelação do jogo.
// "modo" e "respostas" ([{ perfil, pergunta, resposta }]) entram no texto para enviar.

(function () {
  const $ = id => document.getElementById(id);

  let perfisAtuais = null; // usado pelo organograma de áreas
  let cursosLocais = [];   // os 5 cursos mostrados no resultado
  let textoAtual = "";     // texto pronto para copiar e enviar
  let envioAtual = null;   // dados do resultado para a planilha

  // ----- Marcação -----
  function marcacaoTela(titulo, textoRefazer) {
    return `
      <div class="so-pdf pdf-cabecalho">
        <span class="logo"><span class="logo-marca" aria-hidden="true"></span>Qual curso combina com você?</span>
        <span>Resultado gerado em <span id="pdf-data"></span></span>
      </div>
      <p class="sobretitulo">Seu resultado</p>
      <h2>${titulo}</h2>

      <div id="resultado-extra"></div>

      <div class="cartao">
        <h3>Seu perfil</h3>
        <p id="perfil-resumo" class="perfil-resumo"></p>
        <div id="grafico-perfis" class="grafico"></div>
      </div>

      <div class="cartao">
        <h3>Cursos que mais combinam com você</h3>
        <p class="cartao-dica">Toque em um curso para ver as áreas de atuação dele.</p>
        <ol id="lista-local" class="lista-cursos"></ol>
      </div>

      <div class="cartao destaque cartao-enviar">
        <div id="bloco-planilha" class="bloco-planilha" hidden>
          <p id="enviar-status" class="copiar-status" role="status" aria-live="polite"></p>
          <button id="btn-enviar" class="btn btn-primario btn-enviar" type="button" hidden>Tentar salvar de novo</button>
        </div>
        <h3>Quer um feedback personalizado?</h3>
        <p>
          Mande o texto abaixo pelo WhatsApp. Uma pessoa vai ler suas respostas e preparar um retorno para você.
        </p>
        <div class="acoes-enviar">
          <a id="btn-whatsapp" class="btn btn-whatsapp" href="#" target="_blank" rel="noopener">Enviar por WhatsApp</a>
          <button id="btn-copiar" class="btn" type="button">Copiar meu resultado</button>
        </div>
        <p id="copiar-status" class="copiar-status" role="status" aria-live="polite"></p>
        <label class="rotulo-texto" for="texto-resultado">Texto que será enviado</label>
        <textarea id="texto-resultado" class="texto-resultado" rows="9" readonly></textarea>
      </div>

      <!-- Análise por IA desativada no site estático (GitHub Pages). Para reativar no
           futuro, volte este cartão e descomente o bloco "Análise da IA" mais abaixo:
      <div class="cartao destaque">
        <h3>Análise personalizada</h3>
        <div id="ia-status" class="ia-status" aria-live="polite"></div>
        <div id="ia-conteudo" hidden></div>
      </div>
      -->

      <!-- Só aparece no PDF: organogramas dos cursos escolhidos na exportação -->
      <section id="pdf-areas" class="so-pdf pdf-areas" hidden></section>

      <p class="aviso">
        Este resultado é uma sugestão para você explorar. Converse com pessoas da área,
        pesquise sobre os cursos e, se puder, procure um(a) orientador(a) vocacional.
      </p>
      <div class="acoes acoes-resultado">
        <button id="btn-refazer" class="btn" type="button">${textoRefazer}</button>
        <button id="btn-salvar" class="btn btn-primario" type="button">Salvar como PDF</button>
      </div>`;
  }

  const MARCACAO_DIALOGOS = `
    <!-- ORGANOGRAMA: áreas de atuação de um curso -->
    <dialog id="dialogo-areas" class="dialogo" aria-labelledby="areas-titulo">
      <div class="dialogo-corpo">
        <div class="dialogo-topo">
          <p class="sobretitulo">Áreas de atuação</p>
          <button id="btn-fechar-areas" class="btn-fechar" type="button" aria-label="Fechar">✕</button>
        </div>
        <div id="organograma"></div>
        <p class="aviso">
          A afinidade compara suas respostas com o jeito de trabalhar típico de cada área.
          Não é uma previsão: dentro de qualquer curso tem espaço para pessoas bem diferentes.
        </p>
      </div>
    </dialog>

    <!-- EXPORTAR PDF: escolher quais áreas de atuação incluir -->
    <dialog id="dialogo-pdf" class="dialogo dialogo-pequeno" aria-labelledby="pdf-titulo">
      <div class="dialogo-corpo">
        <div class="dialogo-topo">
          <h2 id="pdf-titulo">Salvar como PDF</h2>
        </div>
        <p class="dialogo-texto">
          Seu perfil e os cursos já vão no PDF. Quer incluir também as áreas de atuação de algum curso?
        </p>
        <div id="pdf-opcoes" class="pdf-opcoes"></div>
        <p class="dialogo-texto dialogo-nota">
          Na próxima tela, escolha <strong>"Salvar como PDF"</strong> como impressora.
        </p>
        <div class="acoes acoes-dialogo">
          <button id="btn-cancelar-pdf" class="btn" type="button">Cancelar</button>
          <button id="btn-gerar-pdf" class="btn btn-primario" type="button">Gerar PDF</button>
        </div>
      </div>
    </dialog>`;

  // ----- Perfil e cursos -----
  function renderGrafico(perfis) {
    const box = $("grafico-perfis");
    box.innerHTML = "";
    const ordenados = LETRAS.slice().sort((a, b) => perfis[b] - perfis[a]);
    const barras = [];
    ordenados.forEach((l, i) => {
      const linha = document.createElement("div");
      linha.className = `barra-linha perfil-${l}` + (i < 2 ? " forte" : "");
      const nome = document.createElement("span");
      nome.className = "barra-nome";
      nome.textContent = PERFIS[l].nome;
      const fundo = document.createElement("div");
      fundo.className = "barra-fundo";
      const valor = document.createElement("div");
      valor.className = "barra-valor";
      fundo.appendChild(valor);
      const pct = document.createElement("span");
      pct.className = "barra-pct";
      pct.textContent = perfis[l] + "%";
      linha.append(nome, fundo, pct);
      box.appendChild(linha);
      barras.push([valor, perfis[l]]);
    });
    // Anima as barras depois que entram na página
    requestAnimationFrame(() => requestAnimationFrame(() => {
      barras.forEach(([el, v]) => { el.style.width = v + "%"; });
    }));
    const [p1, p2] = ordenados;
    $("perfil-resumo").textContent =
      `Seus perfis mais fortes: ${PERFIS[p1].nome} (${PERFIS[p1].descricao.toLowerCase()}) ` +
      `e ${PERFIS[p2].nome} (${PERFIS[p2].descricao.toLowerCase()})`;
  }

  function renderCursosLocais(lista) {
    const ol = $("lista-local");
    ol.innerHTML = "";
    lista.forEach(c => {
      const li = document.createElement("li");
      const topo = document.createElement("div");
      topo.className = "curso-topo";
      const strong = document.createElement("strong");
      strong.textContent = c.nome;
      const afinidade = document.createElement("span");
      // Mostra só o rótulo: a % serve para ordenar, mas parece uma nota e não é
      const nivel = nivelAfinidade(c.afinidade);
      afinidade.className = "curso-afinidade nivel-" + nivel.split(" ").pop().toLowerCase();
      afinidade.textContent = nivel;
      topo.append(strong, afinidade);
      const span = document.createElement("span");
      span.className = "curso-resumo";
      span.textContent = c.resumo;
      li.append(topo, span);
      if (c.areas && c.areas.length) li.appendChild(botaoAreas(c));
      ol.appendChild(li);
    });
  }

  // ----- Organograma de áreas de atuação -----
  function botaoAreas(curso) {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "btn-areas";
    b.textContent = `Ver ${curso.areas.length} áreas de atuação →`;
    b.addEventListener("click", () => abrirAreas(curso));
    return b;
  }

  // Monta a árvore (curso + áreas). Usada na janela e no PDF.
  // Retorna os elementos e os medidores, para quem chama decidir se anima.
  function montarOrganograma(curso, tagTitulo, idTitulo) {
    const afinidadeCurso = afinidadeCodigo(perfisAtuais, curso.codigo);

    const raiz = document.createElement("div");
    raiz.className = `organo-raiz perfil-${curso.codigo[0]}`;
    const titulo = document.createElement(tagTitulo);
    if (idTitulo) titulo.id = idTitulo;
    titulo.textContent = curso.nome;
    const resumo = document.createElement("p");
    resumo.textContent = curso.resumo;
    const nivel = document.createElement("span");
    nivel.className = "organo-nivel";
    nivel.textContent = `${nivelAfinidade(afinidadeCurso)} com você · ${afinidadeCurso}%`;
    raiz.append(titulo, resumo, nivel);

    const ramos = document.createElement("ul");
    ramos.className = "organo-ramos";
    const medidores = [];
    ranquearAreas(perfisAtuais, curso).forEach((a, i) => {
      const li = document.createElement("li");
      li.className = `organo-ramo perfil-${a.codigo[0]}` + (i === 0 ? " melhor" : "");

      const topo = document.createElement("div");
      topo.className = "organo-no-topo";
      const nome = document.createElement("strong");
      nome.textContent = a.nome;
      topo.appendChild(nome);
      if (i === 0) {
        const selo = document.createElement("span");
        selo.className = "selo-melhor";
        selo.textContent = "Mais a sua cara";
        topo.appendChild(selo);
      }

      const desc = document.createElement("p");
      desc.className = "organo-desc";
      desc.textContent = a.descricao;

      const medidor = document.createElement("div");
      medidor.className = "medidor";
      medidor.setAttribute("aria-hidden", "true");
      const valor = document.createElement("div");
      valor.className = "medidor-valor";
      medidor.appendChild(valor);
      medidores.push([valor, a.afinidade]);

      const rodape = document.createElement("div");
      rodape.className = "organo-rodape";
      const nivelArea = document.createElement("span");
      nivelArea.className = "organo-nivel-area";
      nivelArea.textContent = `${nivelAfinidade(a.afinidade)} · ${a.afinidade}%`;
      const perfisArea = document.createElement("span");
      perfisArea.className = "organo-perfis";
      perfisArea.textContent = a.codigo.split("").map(l => PERFIS[l].nome).join(" · ");
      rodape.append(nivelArea, perfisArea);

      const no = document.createElement("div");
      no.className = "organo-no";
      no.append(topo, desc, medidor, rodape);
      li.appendChild(no);
      ramos.appendChild(li);
    });

    return { elementos: [raiz, ramos], medidores };
  }

  function abrirAreas(curso) {
    const box = $("organograma");
    box.innerHTML = "";
    const { elementos, medidores } = montarOrganograma(curso, "h2", "areas-titulo");
    box.append(...elementos);
    $("dialogo-areas").showModal();
    $("dialogo-areas").querySelector(".dialogo-corpo").scrollTop = 0;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      medidores.forEach(([el, v]) => { el.style.width = v + "%"; });
    }));
  }

  // ----- Exportar PDF -----
  // Pergunta de quais cursos incluir as áreas de atuação, depois abre a impressão.
  function abrirExportar() {
    const lista = $("pdf-opcoes");
    lista.innerHTML = "";
    cursosLocais.forEach((c, i) => {
      if (!c.areas || !c.areas.length) return;
      const label = document.createElement("label");
      label.className = "opcao-pdf";
      const caixa = document.createElement("input");
      caixa.type = "checkbox";
      caixa.value = i;
      caixa.checked = i === 0;
      const nome = document.createElement("span");
      nome.textContent = c.nome;
      const qtd = document.createElement("small");
      qtd.textContent = `${c.areas.length} áreas`;
      label.append(caixa, nome, qtd);
      lista.appendChild(label);
    });
    $("dialogo-pdf").showModal();
  }

  function gerarPdf() {
    const escolhidos = Array.from($("pdf-opcoes").querySelectorAll("input:checked"))
      .map(c => cursosLocais[Number(c.value)]);
    montarPdfAreas(escolhidos);
    $("dialogo-pdf").close();
    // Espera a janela fechar antes de abrir a impressão
    setTimeout(() => window.print(), 100);
  }

  // Seção que só aparece no PDF, com o organograma de cada curso escolhido
  function montarPdfAreas(cursos) {
    const box = $("pdf-areas");
    box.innerHTML = "";
    box.hidden = !cursos.length;
    if (!cursos.length) return;

    const titulo = document.createElement("h3");
    titulo.textContent = "Áreas de atuação dos cursos que você escolheu";
    box.appendChild(titulo);
    cursos.forEach(c => {
      const bloco = document.createElement("div");
      bloco.className = "pdf-curso";
      const { elementos, medidores } = montarOrganograma(c, "h4");
      bloco.append(...elementos);
      medidores.forEach(([el, v]) => { el.style.width = v + "%"; });
      box.appendChild(bloco);
    });
  }

  // Encontra o curso da base que corresponde ao nome escrito pela IA.
  // Aceita variações: sem acento, sem o trecho entre parênteses ou só uma das
  // partes separadas por "/" (ex.: "Engenharia Mecânica" casa com
  // "Engenharia Mecânica / Elétrica" e "Design" com "Design (gráfico, produto ou UX)").
  function semAcento(texto) {
    return String(texto || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
  }

  function variacoes(nome) {
    const base = semAcento(nome);
    const semParenteses = base.replace(/\s*\(.*?\)\s*/g, " ").trim();
    const partes = semParenteses.split("/").map(t => t.trim());
    // "Engenharia Mecânica / Elétrica": a 2ª parte herda o começo da 1ª
    const prefixo = partes[0].split(" ").slice(0, -1).join(" ");
    const herdadas = partes.slice(1).map(t => (t.split(" ").length === 1 && prefixo ? `${prefixo} ${t}` : t));
    return new Set([base, semParenteses, ...partes, ...herdadas]);
  }

  function cursoPorNome(nome) {
    const alvo = variacoes(nome);
    return PROFISSOES.find(p => {
      const opcoes = variacoes(p.nome);
      return [...alvo].some(a => opcoes.has(a));
    });
  }

  // ----- Copiar e enviar o resultado -----
  // A API de clipboard exige HTTPS. Fora disso (ou se ela falhar), usa o jeito antigo.
  function copiarSemApi() {
    const caixa = $("texto-resultado");
    caixa.focus();
    caixa.select();
    caixa.setSelectionRange(0, caixa.value.length);
    try { return document.execCommand("copy"); } catch (e) { return false; }
  }

  async function copiarTexto() {
    try {
      await navigator.clipboard.writeText(textoAtual);
      return true;
    } catch (e) {
      return copiarSemApi();
    }
  }

  async function aoCopiar() {
    const copiou = await copiarTexto();
    const status = $("copiar-status");
    status.classList.toggle("falhou", !copiou);
    status.textContent = copiou
      ? "Copiado! Agora é só colar na conversa."
      : "Não consegui copiar sozinho. O texto abaixo ficou selecionado: copie com o menu do aparelho ou Ctrl+C.";
    if (!copiou) copiarSemApi();
  }

  // Texto puro não dispara a checagem prévia de CORS, que o Apps Script não atende
  // Chamada ao finalizar o formulário. keepalive: o envio continua mesmo se a pessoa fechar a página.
  async function enviarParaPlanilha() {
    if (!PLANILHA_URL || !envioAtual) return;
    const botao = $("btn-enviar");
    const status = $("enviar-status");
    botao.hidden = true;
    status.classList.remove("falhou");
    status.textContent = "Salvando suas respostas…";
    try {
      const resp = await fetch(PLANILHA_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(envioAtual),
        keepalive: true
      });
      const dados = await resp.json();
      if (!dados.ok) throw new Error(dados.erro || "falha");
      status.textContent = `Suas respostas foram salvas. Seu código é ${envioAtual.codigo}. ` +
        "Guarde esse código: com ele você pode pedir para apagar suas respostas.";
    } catch (e) {
      botao.hidden = false;
      status.classList.add("falhou");
      status.textContent = "Não consegui salvar suas respostas. Confira a internet e tente de novo.";
    }
  }

  function novoCodigo() {
    const letras = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    return Array.from(crypto.getRandomValues(new Uint8Array(6)), n => letras[n % letras.length]).join("");
  }

  function linkWhatsapp(texto) {
    return `https://wa.me/${WHATSAPP_NUMERO.replace(/\D/g, "")}?text=${encodeURIComponent(texto)}`;
  }

  /* ----- Análise da IA -----
     DESATIVADA: o site publicado no GitHub Pages é estático, sem backend e sem chave.
     Hoje a pessoa copia o resultado e envia, e a análise é feita à parte.
     Para reativar no futuro: descomente este bloco e a chamada em mostrar(), volte o
     cartão "Análise personalizada" em marcacaoTela() e publique em um lugar com backend.

  async function buscarAnaliseIA(perfis, abertas, candidatos) {
    const status = $("ia-status");
    const conteudo = $("ia-conteudo");
    const cartao = status.closest(".cartao");
    cartao.classList.remove("sem-ia");
    conteudo.hidden = true;
    conteudo.innerHTML = "";
    status.innerHTML = "";
    const carregando = document.createElement("div");
    carregando.className = "ia-carregando";
    const msg = document.createElement("p");
    msg.textContent = "Lendo suas respostas… isso leva alguns segundos.";
    const esqueleto = document.createElement("div");
    esqueleto.className = "esqueleto";
    esqueleto.setAttribute("aria-hidden", "true");
    for (let i = 0; i < 4; i++) esqueleto.appendChild(document.createElement("div"));
    carregando.append(msg, esqueleto);
    status.appendChild(carregando);

    try {
      const resp = await fetch("api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          perfis,
          abertas,
          candidatos: candidatos.map(c => ({ nome: c.nome, afinidade: c.afinidade }))
        })
      });
      if (!resp.ok) throw new Error("HTTP " + resp.status);
      const dados = await resp.json();
      renderAnaliseIA(dados);
      status.innerHTML = "";
    } catch (e) {
      cartao.classList.add("sem-ia"); // o PDF esconde o cartão quando não há análise
      status.textContent =
        "Não foi possível gerar a análise personalizada agora. " +
        "Os cursos acima já são uma boa base para você começar a explorar.";
    }
  }

  function secao(titulo) {
    const h = document.createElement("h4");
    h.textContent = titulo;
    return h;
  }

  function lista(itens) {
    const ul = document.createElement("ul");
    (itens || []).forEach(t => {
      const li = document.createElement("li");
      li.textContent = t;
      ul.appendChild(li);
    });
    return ul;
  }

  function renderAnaliseIA(d) {
    const c = $("ia-conteudo");
    c.innerHTML = "";

    if (d.resumo) {
      c.appendChild(secao("Como você apareceu nas suas respostas"));
      const p = document.createElement("p");
      p.textContent = d.resumo;
      c.appendChild(p);
    }

    if (Array.isArray(d.cursos) && d.cursos.length) {
      c.appendChild(secao("Cursos para explorar"));
      d.cursos.forEach(cu => {
        const div = document.createElement("div");
        div.className = "ia-curso";
        const s = document.createElement("strong");
        s.textContent = cu.nome;
        const curso = cursoPorNome(cu.nome);
        if (!curso) {
          // Curso que a IA sugeriu mas que ainda não está na base: sem organograma
          div.classList.add("fora-da-base");
          const selo = document.createElement("span");
          selo.className = "selo-ia";
          selo.textContent = "Sugestão da IA";
          s.appendChild(selo);
        }
        const p = document.createElement("span");
        p.textContent = cu.porque;
        div.append(s, p);
        if (curso && curso.areas && curso.areas.length) div.appendChild(botaoAreas(curso));
        c.appendChild(div);
      });
    }

    if (Array.isArray(d.atencao) && d.atencao.length) {
      c.appendChild(secao("Pontos para pensar"));
      c.appendChild(lista(d.atencao));
    }

    if (Array.isArray(d.proximos_passos) && d.proximos_passos.length) {
      c.appendChild(secao("Próximos passos"));
      c.appendChild(lista(d.proximos_passos));
    }

    c.hidden = false;
  }
  ----- fim do bloco da Análise da IA ----- */

  // ----- API -----
  function iniciar({ container, titulo, textoRefazer, aoRefazer }) {
    container.innerHTML = marcacaoTela(titulo, textoRefazer);
    document.body.insertAdjacentHTML("beforeend", MARCACAO_DIALOGOS);

    $("btn-fechar-areas").addEventListener("click", () => $("dialogo-areas").close());
    // Clicar fora da janela fecha
    ["dialogo-areas", "dialogo-pdf"].forEach(id => {
      const d = $(id);
      d.addEventListener("click", e => { if (e.target === d) d.close(); });
    });
    $("btn-salvar").addEventListener("click", abrirExportar);
    $("btn-gerar-pdf").addEventListener("click", gerarPdf);
    $("btn-cancelar-pdf").addEventListener("click", () => $("dialogo-pdf").close());
    $("btn-refazer").addEventListener("click", aoRefazer);
    $("btn-copiar").addEventListener("click", aoCopiar);
    $("btn-enviar").addEventListener("click", enviarParaPlanilha);
    $("bloco-planilha").hidden = !PLANILHA_URL;
    // Copia junto: se o WhatsApp não abrir com o texto, a pessoa ainda consegue colar
    $("btn-whatsapp").addEventListener("click", () => { copiarTexto(); });
    // Data no cabeçalho do PDF (vale também para Ctrl+P)
    window.addEventListener("beforeprint", () => {
      $("pdf-data").textContent = new Date().toLocaleDateString("pt-BR");
    });
  }

  function mostrar({ perfis, abertas, extra, modo, respostas }) {
    const ranking = ranquearCursos(perfis, PROFISSOES);
    perfisAtuais = perfis;
    cursosLocais = ranking.slice(0, 5);

    const slot = $("resultado-extra");
    slot.innerHTML = "";
    if (extra) slot.appendChild(extra);

    montarPdfAreas([]); // limpa escolhas de um resultado anterior
    renderGrafico(perfis);
    renderCursosLocais(cursosLocais);
    // buscarAnaliseIA(perfis, abertas, ranking.slice(0, 8)); // desativada: veja o bloco "Análise da IA"

    const nomesPerfis = {};
    LETRAS.forEach(l => { nomesPerfis[l] = PERFIS[l].nome; });
    const codigo = novoCodigo();
    const participante = Comum.participante();
    textoAtual = montarTextoResultado({
      codigo,
      participante,
      modo,
      data: new Date().toLocaleDateString("pt-BR"),
      perfis,
      nomesPerfis,
      cursos: cursosLocais,
      respostas,
      perguntasAbertas: PERGUNTAS_ABERTAS,
      abertas
    });
    $("texto-resultado").value = textoAtual;
    $("btn-whatsapp").href = linkWhatsapp(textoAtual);
    $("copiar-status").textContent = "";

    envioAtual = {
      tipo: "quiz-vocacional-v1",
      codigo,
      modo,
      apelido: participante.apelido,
      faixa: participante.faixa,
      perfis,
      cursos: cursosLocais.map(c => c.nome).join("; "),
      abertas,
      texto: textoAtual
    };
    $("btn-enviar").hidden = true;
    $("enviar-status").textContent = "";
  }

  window.Resultado = {
    iniciar,
    mostrar,
    enviar: enviarParaPlanilha,
    // Atalhos usados pelo modo de teste
    teste: {
      abrirAreas(i) { if (cursosLocais[i]) abrirAreas(cursosLocais[i]); },
      exportar() { abrirExportar(); },
      prepararPdf(indices) { montarPdfAreas(indices.map(i => cursosLocais[i]).filter(Boolean)); },
      cursoPorNome
    }
  };
})();
