// Perguntas baseadas no modelo RIASEC (Holland).
// R = Realista, I = Investigativo, A = Artístico, S = Social, E = Empreendedor, C = Convencional
// Escala de resposta: 1 (nada a ver comigo) a 5 (tudo a ver comigo)

window.PERFIS = {
  R: { nome: "Prático", descricao: "Gosta de mexer com coisas concretas: construir, consertar, estar ao ar livre." },
  I: { nome: "Investigador", descricao: "Gosta de entender como as coisas funcionam, pesquisar e resolver problemas." },
  A: { nome: "Criativo", descricao: "Gosta de criar, imaginar e se expressar de forma original." },
  S: { nome: "Cuidador", descricao: "Gosta de ajudar, ensinar e conviver com pessoas." },
  E: { nome: "Líder", descricao: "Gosta de liderar, convencer, tomar iniciativa e empreender." },
  C: { nome: "Organizador", descricao: "Gosta de ordem, precisão, planejamento e processos bem definidos." }
};

window.PERGUNTAS = [
  // Realista
  { perfil: "R", texto: "Montar, consertar ou construir coisas com as mãos." },
  { perfil: "I", texto: "Descobrir por que as coisas acontecem, fazendo testes e experimentos." },
  { perfil: "A", texto: "Criar desenhos, músicas, vídeos, textos ou designs." },
  { perfil: "S", texto: "Ajudar alguém que está com um problema pessoal." },
  { perfil: "E", texto: "Liderar um grupo para alcançar uma meta." },
  { perfil: "C", texto: "Organizar informações em planilhas, listas ou arquivos." },

  { perfil: "R", texto: "Trabalhar ao ar livre, com natureza, animais ou máquinas." },
  { perfil: "I", texto: "Resolver problemas de lógica, matemática ou ciências." },
  { perfil: "A", texto: "Ter liberdade para inventar minhas próprias ideias." },
  { perfil: "S", texto: "Ensinar ou explicar algo para outras pessoas." },
  { perfil: "E", texto: "Convencer pessoas a apoiar uma ideia ou a comprar algo." },
  { perfil: "C", texto: "Seguir um passo a passo e fazer tudo com precisão." },

  { perfil: "R", texto: "Entender como equipamentos e máquinas funcionam por dentro." },
  { perfil: "I", texto: "Ler e pesquisar a fundo sobre um assunto que me interessa." },
  { perfil: "A", texto: "Contar histórias ou expressar emoções por meio da arte." },
  { perfil: "S", texto: "Cuidar da saúde e do bem-estar de outras pessoas." },
  { perfil: "E", texto: "Ter meu próprio negócio e tomar as decisões." },
  { perfil: "C", texto: "Cuidar de contas, dinheiro e documentos." },

  { perfil: "R", texto: "Ter um trabalho mais físico ou técnico, sem ficar só sentado." },
  { perfil: "I", texto: "Analisar dados para encontrar padrões e respostas." },
  { perfil: "A", texto: "Trabalhar em um ambiente criativo, sem regras muito rígidas." },
  { perfil: "S", texto: "Trabalhar em equipe e conversar com muita gente no dia a dia." },
  { perfil: "E", texto: "Assumir riscos para ter a chance de crescer mais rápido." },
  { perfil: "C", texto: "Ter uma rotina estável e previsível." }
];

window.PERGUNTAS_ABERTAS = [
  {
    id: "interesses",
    texto: "Que assuntos ou atividades fazem você perder a noção do tempo?",
    dica: "Ex.: jogos, séries, cozinhar, ajudar amigos, mexer em celular, esportes…",
    obrigatoria: true
  },
  {
    id: "facilidades",
    texto: "Em que você se sente bom(boa)? E o que você evita ou acha chato?",
    dica: "Pode ser matéria da escola, hobby, algo que as pessoas elogiam em você…",
    obrigatoria: true
  },
  {
    id: "futuro",
    texto: "Como você imagina seu dia de trabalho ideal daqui a 10 anos?",
    dica: "Onde você está, com quem, fazendo o quê, o que não aceitaria de jeito nenhum…",
    obrigatoria: true
  },
  {
    id: "extra",
    texto: "Tem algo que pesa na sua escolha?",
    dica: "Ex.: dinheiro, cidade, tempo de estudo, opinião da família, medo de errar…",
    obrigatoria: false
  }
];
