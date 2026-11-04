// Recebe os resultados enviados pelo botão "Enviar resultado" e salva numa planilha Google.
// Roda no Google Apps Script, não no site: o site não carrega este arquivo.
// Não coloque aqui senhas nem dados de pessoas: este arquivo fica público no repositório.
// Instalação: veja a seção "Salvar as respostas numa planilha" do README.md.
//
// O endereço deste script fica público no código do site, então qualquer um pode chamá-lo.
// Por isso ele valida tudo, limita o volume e impede que um texto vire fórmula na planilha.

const ABA = "Respostas";
const LIMITE_POR_HORA = 100; // envios aceitos por hora, somando todo mundo
const MAX_CAMPO = 700;       // caracteres por resposta aberta
const MAX_TEXTO = 10000;     // caracteres do texto completo
const COLUNAS = [
  "Recebido em", "Código", "Modo", "Apelido", "Faixa etária",
  "R", "I", "A", "S", "E", "C", "Cursos",
  "Interesses", "Facilidades", "Futuro", "O que pesa", "Texto completo"
];

function doPost(e) {
  try {
    const d = JSON.parse(e.postData.contents);
    if (!d || d.tipo !== "quiz-vocacional-v1" || !/^[A-Z0-9]{6}$/.test(String(d.codigo))) {
      return responder({ ok: false, erro: "dados inválidos" });
    }

    const cache = CacheService.getScriptCache();
    // Reenvio do mesmo resultado (ex.: a pessoa tentou de novo): não duplica a linha
    if (cache.get("codigo-" + d.codigo)) return responder({ ok: true });

    const trava = LockService.getScriptLock();
    trava.waitLock(10000);
    try {
      const hora = "hora-" + new Date().toISOString().slice(0, 13);
      const enviados = Number(cache.get(hora) || 0);
      if (enviados >= LIMITE_POR_HORA) return responder({ ok: false, erro: "limite" });

      abaRespostas().appendRow(montarLinha(d));
      cache.put(hora, String(enviados + 1), 3600);
      cache.put("codigo-" + d.codigo, "1", 21600);
    } finally {
      trava.releaseLock();
    }
    return responder({ ok: true });
  } catch (erro) {
    return responder({ ok: false, erro: "falha" });
  }
}

function montarLinha(d) {
  const perfis = d.perfis || {};
  const abertas = d.abertas || {};
  const nota = l => {
    const v = Number(perfis[l]);
    return Number.isFinite(v) && v >= 0 && v <= 100 ? Math.round(v) : "";
  };
  return [
    new Date(),
    limpar(d.codigo, 6), limpar(d.modo, 80), limpar(d.apelido, 20), limpar(d.faixa, 30),
    nota("R"), nota("I"), nota("A"), nota("S"), nota("E"), nota("C"),
    limpar(d.cursos, 500),
    limpar(abertas.interesses, MAX_CAMPO), limpar(abertas.facilidades, MAX_CAMPO),
    limpar(abertas.futuro, MAX_CAMPO), limpar(abertas.extra, MAX_CAMPO),
    limpar(d.texto, MAX_TEXTO)
  ];
}

// Corta o tamanho e impede que o texto seja interpretado como fórmula pelo Sheets
function limpar(valor, maximo) {
  const texto = String(valor === undefined || valor === null ? "" : valor).trim().slice(0, maximo);
  return /^[=+\-@\t\r]/.test(texto) ? "'" + texto : texto;
}

function abaRespostas() {
  const planilha = SpreadsheetApp.getActiveSpreadsheet();
  const aba = planilha.getSheetByName(ABA) || planilha.insertSheet(ABA);
  if (aba.getLastRow() === 0) {
    aba.appendRow(COLUNAS);
    aba.setFrozenRows(1);
  }
  return aba;
}

function responder(dados) {
  return ContentService.createTextOutput(JSON.stringify(dados)).setMimeType(ContentService.MimeType.JSON);
}
