// Peças de interface usadas pelo quiz (index.html) e pelo jogo (jogo.html):
// tema claro/escuro, foco em títulos e o formulário das perguntas abertas.

(function () {
  const $ = id => document.getElementById(id);
  const MAX_TEXTO = 600;
  const MIN_TEXTO = 10;

  // ----- Foco -----
  // Leva o foco ao primeiro título da tela (ajuda leitores de tela)
  function focarTitulo(tela) {
    const titulo = tela.querySelector("h1, h2");
    if (!titulo) return;
    titulo.setAttribute("tabindex", "-1");
    titulo.focus({ preventScroll: true });
  }

  // ----- Tema claro/escuro -----
  // O tema inicial é aplicado por tema-inicial.js no <head>.
  function iniciarTema() {
    const botao = $("btn-tema");
    if (!botao) return;
    const midiaEscura = window.matchMedia("(prefers-color-scheme: dark)");

    function aplicar(tema) {
      document.documentElement.setAttribute("data-tema", tema);
      botao.setAttribute("aria-label",
        tema === "escuro" ? "Mudar para tema claro" : "Mudar para tema escuro");
    }

    function salvo() {
      try { return localStorage.getItem("tema"); } catch (e) { return null; }
    }

    botao.addEventListener("click", () => {
      const novo = document.documentElement.getAttribute("data-tema") === "escuro" ? "claro" : "escuro";
      aplicar(novo);
      try { localStorage.setItem("tema", novo); } catch (e) { /* modo privado: só não lembra */ }
    });

    // Se a pessoa nunca escolheu, acompanha o tema do sistema
    midiaEscura.addEventListener("change", e => {
      if (!salvo()) aplicar(e.matches ? "escuro" : "claro");
    });

    aplicar(document.documentElement.getAttribute("data-tema") || (midiaEscura.matches ? "escuro" : "claro"));
  }

  // ----- Entrada: apelido, faixa etária, aviso de privacidade e consentimento -----
  // Fica no sessionStorage só para o quiz e o jogo compartilharem o que foi preenchido.
  // Some quando a aba é fechada e nunca sai do aparelho sozinho.
  const CHAVE_PARTICIPANTE = "participante";
  const FAIXAS = ["Até 14 anos", "15 a 16 anos", "17 a 18 anos", "19 a 21 anos", "22 anos ou mais"];
  let participante = { apelido: "", faixa: "", concordou: false };

  function salvarParticipante() {
    try { sessionStorage.setItem(CHAVE_PARTICIPANTE, JSON.stringify(participante)); } catch (e) { /* modo privado */ }
  }

  function lerParticipante() {
    try { return JSON.parse(sessionStorage.getItem(CHAVE_PARTICIPANTE)) || {}; } catch (e) { return {}; }
  }

  function montarEntrada(box) {
    participante = { ...participante, ...lerParticipante() };
    box.className = "entrada";
    box.innerHTML = `
      <label class="entrada-campo" for="ent-apelido">
        <span>Apelido <span class="selo-opcional">Opcional</span></span>
        <input id="ent-apelido" type="text" maxlength="20" autocomplete="off" placeholder="Não use seu nome completo">
      </label>
      <label class="entrada-campo" for="ent-faixa">
        <span>Faixa etária <span class="selo-opcional">Opcional</span></span>
        <select id="ent-faixa"><option value="">Prefiro não informar</option></select>
      </label>
      <p class="entrada-aviso">
        <strong>Aviso de privacidade.</strong> Suas respostas só saem deste aparelho se você decidir enviar.
        O que você enviar fica salvo numa planilha privada do Google, por até 3 meses depois do fim do teste,
        e será analisado manualmente por uma pessoa, que pode usar uma ferramenta de inteligência artificial
        para preparar o seu feedback. Você pode pedir para apagar a qualquer momento, pelo WhatsApp do projeto,
        informando o código que aparece no resultado. Use só um apelido e não escreva dados sensíveis
        (nome completo, telefone, endereço, saúde, religião). Se você tem menos de 18 anos, um responsável
        precisa estar ciente.
      </p>
      <label class="entrada-concordo" for="ent-concordo">
        <input id="ent-concordo" type="checkbox">
        <span>Li e concordo</span>
      </label>
      <p id="ent-erro" class="erro" role="alert" hidden>Marque "Li e concordo" para começar.</p>`;

    const apelido = box.querySelector("#ent-apelido");
    const faixa = box.querySelector("#ent-faixa");
    const concordo = box.querySelector("#ent-concordo");
    FAIXAS.forEach(f => faixa.add(new Option(f, f)));
    apelido.value = participante.apelido;
    faixa.value = participante.faixa;
    concordo.checked = participante.concordou;

    function atualizar() {
      participante = { apelido: apelido.value.trim(), faixa: faixa.value, concordou: concordo.checked };
      if (concordo.checked) $("ent-erro").hidden = true;
      salvarParticipante();
    }
    [apelido, faixa, concordo].forEach(c => c.addEventListener("change", atualizar));
    apelido.addEventListener("input", atualizar);
  }

  // Retorna true se a pessoa concordou. Se não, mostra o erro e leva até o checkbox.
  function exigirConsentimento() {
    if (participante.concordou) return true;
    $("ent-erro").hidden = false;
    $("ent-concordo").focus();
    return false;
  }

  // ----- Perguntas abertas -----
  // estado: objeto { interesses, facilidades, ... } atualizado enquanto a pessoa digita.
  function montarAbertas(form, estado) {
    if (form.childElementCount) return; // já montado
    PERGUNTAS_ABERTAS.forEach(q => {
      const campo = document.createElement("div");
      campo.className = "campo";

      const label = document.createElement("label");
      label.htmlFor = "campo-" + q.id;
      label.textContent = q.texto;
      if (!q.obrigatoria) {
        const selo = document.createElement("span");
        selo.className = "selo-opcional";
        selo.textContent = "Opcional";
        label.appendChild(selo);
      }

      const dica = document.createElement("span");
      dica.className = "dica";
      dica.id = "dica-" + q.id;
      dica.textContent = q.dica;

      const ta = document.createElement("textarea");
      ta.id = "campo-" + q.id;
      ta.maxLength = MAX_TEXTO;
      ta.value = estado[q.id] || "";
      ta.setAttribute("aria-describedby", dica.id);
      if (q.obrigatoria) ta.required = true;

      const cont = document.createElement("div");
      cont.className = "contagem";
      cont.textContent = `${ta.value.length}/${MAX_TEXTO}`;
      ta.addEventListener("input", () => {
        estado[q.id] = ta.value;
        cont.textContent = `${ta.value.length}/${MAX_TEXTO}`;
        if (campo.classList.contains("invalido") && ta.value.trim().length >= MIN_TEXTO) {
          campo.classList.remove("invalido");
          ta.removeAttribute("aria-invalid");
        }
      });

      campo.append(label, dica, ta, cont);
      form.appendChild(campo);
    });
    const erro = document.createElement("p");
    erro.className = "erro erro-abertas";
    erro.setAttribute("role", "alert");
    erro.hidden = true;
    form.appendChild(erro);
  }

  // Marca os campos obrigatórios vazios. Retorna true se está tudo certo.
  function validarAbertas(form, estado) {
    const faltando = PERGUNTAS_ABERTAS.filter(
      q => q.obrigatoria && (estado[q.id] || "").trim().length < MIN_TEXTO
    );
    PERGUNTAS_ABERTAS.forEach(q => {
      const ta = form.querySelector("#campo-" + q.id);
      const invalido = faltando.includes(q);
      ta.parentElement.classList.toggle("invalido", invalido);
      if (invalido) ta.setAttribute("aria-invalid", "true");
      else ta.removeAttribute("aria-invalid");
    });

    const erro = form.querySelector(".erro-abertas");
    if (faltando.length) {
      erro.textContent = faltando.length === 1
        ? "Falta escrever pelo menos uma frase na pergunta marcada."
        : "Falta escrever pelo menos uma frase nas perguntas marcadas.";
      erro.hidden = false;
      form.querySelector("#campo-" + faltando[0].id).focus();
      return false;
    }
    erro.hidden = true;
    return true;
  }

  window.Comum = {
    focarTitulo, iniciarTema, montarAbertas, validarAbertas,
    montarEntrada, exigirConsentimento,
    participante: () => ({ ...participante })
  };
})();
