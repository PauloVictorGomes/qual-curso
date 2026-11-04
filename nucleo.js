// Lógica de pontuação (pura, sem DOM). Usada pelo quiz, pelo jogo e pelos scripts em Node.

const LETRAS = ["R", "I", "A", "S", "E", "C"];

// Quiz: respostas é um array de números 1-5, na mesma ordem de PERGUNTAS.
// Retorna a pontuação de cada perfil em porcentagem (0-100).
function calcularPerfis(respostas, perguntas) {
  const soma = {}, qtd = {};
  LETRAS.forEach(l => { soma[l] = 0; qtd[l] = 0; });
  perguntas.forEach((p, i) => {
    soma[p.perfil] += respostas[i];
    qtd[p.perfil] += 1;
  });
  const pct = {};
  LETRAS.forEach(l => {
    const min = qtd[l], max = qtd[l] * 5;
    pct[l] = max === min ? 0 : Math.round(((soma[l] - min) / (max - min)) * 100);
  });
  return pct;
}

// Jogo: escolhas é um array com a letra escolhida em cada cena (na ordem de cenas).
// Cada perfil vale (vezes que foi escolhido / vezes que foi oferecido) × 100,
// então o resultado tem o mesmo formato 0-100 do quiz.
function calcularPerfisPorEscolhas(escolhas, cenas) {
  const escolhido = {}, oferecido = {};
  LETRAS.forEach(l => { escolhido[l] = 0; oferecido[l] = 0; });
  cenas.forEach((cena, i) => {
    cena.opcoes.forEach(o => { oferecido[o.perfil] += 1; });
    if (escolhas[i]) escolhido[escolhas[i]] += 1;
  });
  const pct = {};
  LETRAS.forEach(l => {
    pct[l] = oferecido[l] ? Math.round((escolhido[l] / oferecido[l]) * 100) : 0;
  });
  return pct;
}

// Compara o perfil da pessoa com um código RIASEC (peso 3, 2, 1). Retorna 0-100.
// A soma ponderada é multiplicada por um fator que depende de quão forte é,
// na pessoa, a 1ª letra do curso: 1 se é o perfil mais forte dela, até 0,5 se é zero.
// Sem esse fator, um curso cuja letra principal é só o 2º perfil da pessoa
// (ex.: Direito "ESI" para quem é S100/E75) empatava com os cursos do 1º perfil.
function afinidadeCodigo(perfis, codigo) {
  const pesos = [3, 2, 1];
  let pontos = 0, maximo = 0;
  codigo.split("").forEach((letra, i) => {
    pontos += (perfis[letra] || 0) * pesos[i];
    maximo += 100 * pesos[i];
  });
  const maisForte = Math.max(...LETRAS.map(l => perfis[l] || 0));
  const fator = maisForte ? 0.5 + 0.5 * (perfis[codigo[0]] || 0) / maisForte : 1;
  return Math.round((pontos / maximo) * fator * 100);
}

function ranquearCursos(perfis, profissoes) {
  return profissoes
    .map(p => ({ ...p, afinidade: afinidadeCodigo(perfis, p.codigo) }))
    .sort((a, b) => b.afinidade - a.afinidade);
}

// Áreas de atuação de um curso, da que mais combina para a que menos combina.
function ranquearAreas(perfis, curso) {
  return (curso.areas || [])
    .map(a => ({ ...a, afinidade: afinidadeCodigo(perfis, a.codigo) }))
    .sort((a, b) => b.afinidade - a.afinidade);
}

// Traduz a afinidade em palavras, para não soar como previsão exata.
function nivelAfinidade(valor) {
  if (valor >= 75) return "Combina muito";
  if (valor >= 55) return "Combina";
  return "Combina pouco";
}

// As duas letras mais fortes, em ordem (empate: ordem de LETRAS).
function perfisMaisFortes(perfis, quantos = 2) {
  return LETRAS.slice().sort((a, b) => perfis[b] - perfis[a]).slice(0, quantos);
}

// Texto simples do resultado, para a pessoa copiar e enviar, sem HTML.
// respostas: [{ perfil, pergunta, resposta }]; cursos: saída de ranquearCursos.
function montarTextoResultado({ participante, modo, data, perfis, nomesPerfis, cursos, respostas, perguntasAbertas, abertas }) {
  const naoInformado = "(não informado)";
  const linhas = [
    "RESULTADO DO QUIZ VOCACIONAL",
    `Apelido: ${participante.apelido || naoInformado}`,
    `Faixa etária: ${participante.faixa || naoInformado}`,
    `Modo: ${modo}`,
    `Data: ${data}`,
    "",
    "PONTUAÇÃO POR PERFIL"
  ];
  LETRAS.slice().sort((a, b) => perfis[b] - perfis[a]).forEach(l => {
    linhas.push(`- ${nomesPerfis[l]} (${l}): ${perfis[l]}%`);
  });

  linhas.push("", "CURSOS MAIS COMPATÍVEIS");
  cursos.forEach((c, i) => {
    linhas.push(`${i + 1}. ${c.nome} (${nivelAfinidade(c.afinidade)}, ${c.afinidade}%)`);
  });

  linhas.push("", "RESPOSTAS");
  respostas.forEach((r, i) => {
    linhas.push(`${i + 1}. [${r.perfil}] ${r.pergunta} -> ${r.resposta}`);
  });

  linhas.push("", "PERGUNTAS ABERTAS");
  perguntasAbertas.forEach(q => {
    linhas.push(`P: ${q.texto}`, `R: ${(abertas[q.id] || "").trim() || "(sem resposta)"}`, "");
  });

  return linhas.join("\n").trim();
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    LETRAS, calcularPerfis, calcularPerfisPorEscolhas, afinidadeCodigo,
    ranquearCursos, ranquearAreas, nivelAfinidade, perfisMaisFortes, montarTextoResultado
  };
}
