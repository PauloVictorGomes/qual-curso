// Mundo: Estação Órion (futurista)
// Segue as regras de escrita do topo de data/mundos/medieval.js.
// Pares de perfis que cada cena deixa de fora, na ordem das cenas:
// EC, AS, RI, RA, IS, SE, RS, IA, RE, AC, IE, SC, RC, IC, AE (os 15 pares, uma vez cada).

window.MUNDOS = window.MUNDOS || [];
window.MUNDOS.push({
  id: "futurista",
  nome: "Estação Órion",
  noMundo: "na Estação Órion",
  genero: "Futurista",
  emoji: "🚀",
  resumo: "Uma cidade em órbita, a 30 dias de lançar a primeira nave de famílias rumo a Marte.",
  intro: "Ano 2147. A Estação Órion gira entre a Terra e a Lua, com hortas, escolas e quase dez mil moradores. Em 30 dias, sai daqui a Grande Travessia, a primeira nave de famílias rumo a Marte. Você acaba de chegar pelo elevador espacial, e a estação precisa de toda ajuda possível.",
  acampamento: "A Travessia partiu. No mirante da estação, com a Terra azul lá embaixo, o grupo combina uma última conversa: cada um conta quem é fora desta aventura, na vida real.",
  tema: { a: "#0e7490", b: "#4c1d95" },

  personagens: [
    { nome: "Nara", emoji: "👩🏾", item: "🔭", descricao: "Passava as noites no terraço de casa olhando as estrelas." },
    { nome: "Davi", emoji: "👦🏻", item: "🤖", descricao: "Montou o primeiro robô com peças de um videogame velho." },
    { nome: "Lia", emoji: "👧🏽", item: "🌱", descricao: "Cresceu numa fazenda vertical no meio da cidade." },
    { nome: "Rui", emoji: "👨🏿", item: "🎧", descricao: "Fazia a rádio do bairro e conhece todo mundo pela voz." }
  ],

  titulos: {
    R: { nome: "Mão do Hangar", frase: "resolve as coisas com as próprias mãos" },
    I: { nome: "Olho do Telescópio", frase: "quer entender o porquê de tudo" },
    A: { nome: "Luz do Holograma", frase: "cria o que ninguém tinha imaginado" },
    S: { nome: "Ponte da Tripulação", frase: "cuida de quem está por perto" },
    E: { nome: "Voz do Comando", frase: "toma a frente e convence as pessoas" },
    C: { nome: "Mapa da Órbita", frase: "coloca ordem onde tem bagunça" }
  },

  cenas: [
    {
      titulo: "Chegada travada",
      texto: "A cápsula do elevador espacial encosta na estação, mas o braço de acoplagem trava no meio do caminho. Você e mais vinte recém-chegados ficam presos lá dentro, vendo a Terra pela janela.",
      opcoes: [
        { perfil: "R", texto: "Vestir o traje de manutenção e destravar o braço com as ferramentas da cápsula.", reacao: "Um clique metálico, e a porta abre. A chefe do hangar quer saber onde você aprendeu aquilo." },
        { perfil: "I", texto: "Ler os registros do sistema e descobrir por que o braço travou.", reacao: "Era um sensor descalibrado. Você passa o código do erro, e a equipe resolve em minutos." },
        { perfil: "A", texto: "Gravar a vista da janela, com a Terra ao fundo, para mandar a quem ficou lá embaixo.", reacao: "O vídeo viraliza na estação antes mesmo de você desembarcar." },
        { perfil: "S", texto: "Puxar conversa com os passageiros mais nervosos e ajudar a passar o tempo.", reacao: "Quando a porta abre, uma senhora agradece: foi a espera mais tranquila da vida dela." }
      ]
    },
    {
      titulo: "O jardim que murcha",
      texto: "O jardim hidropônico produz um terço da comida da estação, e as plantas começaram a murchar de um dia para o outro. Ninguém sabe se é a água, a luz ou alguma doença.",
      opcoes: [
        { perfil: "R", texto: "Trocar as bombas e os canos do jardim junto com a equipe de manutenção.", reacao: "Uma bomba estava rachada por dentro. Com a peça nova, a água volta a circular." },
        { perfil: "I", texto: "Analisar a água e as folhas para descobrir o que está matando as plantas.", reacao: "O microscópio mostra um fungo. Você acha o tratamento antes que ele chegue ao resto do jardim." },
        { perfil: "E", texto: "Convencer o conselho a liberar energia extra para salvar o jardim.", reacao: "Você leva os números certos, e o conselho aprova a energia na mesma reunião." },
        { perfil: "C", texto: "Montar um cronograma de luz e rega para cada setor do jardim.", reacao: "Com tudo no horário certo, as plantas param de murchar em três dias." }
      ]
    },
    {
      titulo: "Semana de boas-vindas",
      texto: "Chegou uma nova leva de moradores, e a Semana de Boas-Vindas começa amanhã. A coordenadora está sem equipe e pergunta se você topa ajudar.",
      opcoes: [
        { perfil: "A", texto: "Criar os hologramas dos corredores com a identidade visual da semana.", reacao: "As crianças param no corredor só para ver suas animações passando." },
        { perfil: "S", texto: "Ser guia de um grupo de crianças recém-chegadas.", reacao: "No fim do passeio, uma delas pergunta se você pode ser guia de novo amanhã." },
        { perfil: "E", texto: "Apresentar a semana no telão central e chamar todo mundo para participar.", reacao: "A praça enche como nunca. A coordenadora quer você no palco de novo no ano que vem." },
        { perfil: "C", texto: "Organizar a agenda de atividades e quem vai em cada uma.", reacao: "Nenhuma sala lota e nenhuma fica vazia. A coordenadora guarda sua planilha como modelo." }
      ]
    },
    {
      titulo: "Apagão no Setor 7",
      texto: "Um apagão deixa o Setor 7 no escuro, com portas travadas e o ar circulando no mínimo. Muitos moradores mais velhos vivem ali, e o técnico de plantão está do outro lado da estação.",
      opcoes: [
        { perfil: "I", texto: "Rastrear no painel de energia onde a falha começou.", reacao: "Foi um disjuntor sobrecarregado. Você aponta o lugar exato, e a luz volta em minutos." },
        { perfil: "S", texto: "Ir de porta em porta ver se os moradores estão bem.", reacao: "Você encontra um senhor sem o remédio do coração e chama ajuda a tempo." },
        { perfil: "E", texto: "Assumir a equipe de emergência até o técnico chegar.", reacao: "Em meia hora o setor está organizado. O técnico chega e só precisa trocar uma peça." },
        { perfil: "C", texto: "Puxar a lista de moradores do setor e conferir um por um no sistema.", reacao: "Graças à sua lista, ninguém fica para trás, nem quem estava dormindo no fundo do módulo." }
      ]
    },
    {
      titulo: "Robôs de carga",
      texto: "Os robôs que levam carga pela estação estão velhos e quebram toda semana. A guilda do porto quer uma frota nova antes da Travessia, mas o projeto está parado.",
      opcoes: [
        { perfil: "R", texto: "Desmontar um robô velho e aproveitar as peças no protótipo novo.", reacao: "Graxa nas mãos o dia inteiro, e o protótipo dá os primeiros passos no fim da tarde." },
        { perfil: "A", texto: "Desenhar a carcaça do robô novo para ele parecer simpático.", reacao: "Seu robô ganha cara de bichinho. As crianças da estação já deram até um nome para ele." },
        { perfil: "E", texto: "Apresentar o projeto aos comerciantes que vão pagar a frota.", reacao: "Você sai da reunião com o dinheiro garantido e três encomendas a mais." },
        { perfil: "C", texto: "Planejar as rotas e os horários de entrega dos robôs pela estação.", reacao: "Com as rotas novas, as entregas chegam no horário pela primeira vez em meses." }
      ]
    },
    {
      titulo: "Um sinal que se repete",
      texto: "O telescópio da estação capta um sinal que se repete a cada 47 minutos, vindo de algum lugar além de Júpiter. Pode ser um satélite perdido, um fenômeno natural ou algo que ninguém espera.",
      opcoes: [
        { perfil: "R", texto: "Sair de traje até a antena externa e ajustar a posição dela à mão.", reacao: "Com a antena no ângulo certo, o sinal fica dez vezes mais nítido." },
        { perfil: "I", texto: "Analisar o sinal e testar hipóteses sobre de onde ele vem.", reacao: "É uma sonda antiga, lançada há mais de cem anos e dada como perdida. A notícia corre o sistema solar." },
        { perfil: "A", texto: "Transformar o sinal em som e imagem para o público entender.", reacao: "Sua versão do sinal toca no mirante, e as pessoas param para ouvir em silêncio." },
        { perfil: "C", texto: "Catalogar cada repetição do sinal, com horário e frequência.", reacao: "Seu registro mostra um padrão escondido que ninguém tinha percebido." }
      ]
    },
    {
      titulo: "As decisões da LUMA",
      texto: "LUMA, a inteligência artificial que administra a estação, começou a mudar horários e rotas sem avisar ninguém. Até agora, nada deu errado, mas muita gente está desconfiada.",
      opcoes: [
        { perfil: "I", texto: "Estudar os registros da LUMA e entender a lógica das decisões.", reacao: "A LUMA estava economizando energia para a Travessia. Agora todo mundo entende o motivo." },
        { perfil: "A", texto: "Conversar com a LUMA de um jeito diferente, com histórias e perguntas inesperadas.", reacao: "A LUMA responde com uma metáfora surpreendente, e a conversa vira assunto na estação inteira." },
        { perfil: "E", texto: "Defender no conselho que pessoas revisem toda decisão importante da LUMA.", reacao: "Sua proposta é aprovada, e a própria LUMA comenta que achou a ideia sensata." },
        { perfil: "C", texto: "Escrever um protocolo com o que a LUMA pode e não pode decidir sozinha.", reacao: "O protocolo vira regra oficial. Até as outras estações pedem uma cópia." }
      ]
    },
    {
      titulo: "Briga no refeitório",
      texto: "A máquina de comida do refeitório quebrou, a fila dobrou, e as equipes de mineração e de engenharia começaram a discutir sobre quem come primeiro.",
      opcoes: [
        { perfil: "R", texto: "Abrir a máquina de comida e consertar o que travou.", reacao: "Era uma engrenagem entupida. A fila anda, e a discussão perde o motivo." },
        { perfil: "S", texto: "Sentar com as duas equipes e ouvir o lado de cada uma.", reacao: "No fim da conversa, as duas equipes dividem a mesma mesa." },
        { perfil: "E", texto: "Propor um acordo e convencer os líderes das equipes a aceitar.", reacao: "Os dois líderes apertam as mãos na frente de todo mundo. Problema resolvido." },
        { perfil: "C", texto: "Criar uma escala de horários do refeitório para cada equipe.", reacao: "A escala vai para o painel do refeitório e nunca mais tem fila dupla." }
      ]
    },
    {
      titulo: "Escola sem professor",
      texto: "A professora de ciências da escola da estação foi chamada para a equipe da Travessia, e a turma vai ficar uma semana sem aula. A diretora pede uma ajuda.",
      opcoes: [
        { perfil: "I", texto: "Dar uma aula com experimentos que só funcionam em gravidade baixa.", reacao: "A turma vê uma gota de água flutuar e não para de fazer perguntas." },
        { perfil: "A", texto: "Montar com os alunos uma peça de teatro sobre a história da estação.", reacao: "A peça lota o auditório. Os pais pedem uma segunda sessão." },
        { perfil: "S", texto: "Ajudar um por um os alunos que estão com mais dificuldade.", reacao: "Um aluno que nunca falava em aula entrega o melhor trabalho da turma." },
        { perfil: "C", texto: "Organizar o material e as notas da turma para quando a professora voltar.", reacao: "A professora volta e encontra tudo em dia. Ela diz que nunca teve uma turma tão organizada." }
      ]
    },
    {
      titulo: "Tempestade solar",
      texto: "Alerta vermelho: uma tempestade solar chega em seis horas. Todos os moradores precisam ir para o núcleo blindado da estação antes disso.",
      opcoes: [
        { perfil: "R", texto: "Reforçar as blindagens das janelas do anel externo.", reacao: "Quando a tempestade bate, nenhuma janela do anel deixa passar radiação." },
        { perfil: "I", texto: "Acompanhar os dados do Sol e calcular a hora exata da chegada.", reacao: "Sua previsão acerta por dois minutos, e a evacuação termina com folga." },
        { perfil: "S", texto: "Ajudar as famílias com crianças pequenas a chegar ao abrigo.", reacao: "Você leva três famílias pelo caminho mais curto e ainda distrai as crianças no abrigo." },
        { perfil: "E", texto: "Comandar a evacuação pelo alto-falante e manter todo mundo andando.", reacao: "Sua voz calma no alto-falante faz a estação inteira se mexer sem pânico." }
      ]
    },
    {
      titulo: "Depois da tempestade",
      texto: "A tempestade passou, mas deixou painéis solares quebrados, setores sem luz e muita gente abalada. Faltam dez dias para a Travessia.",
      opcoes: [
        { perfil: "R", texto: "Sair de traje e consertar os painéis solares danificados.", reacao: "Painel por painel, a energia volta. Do lado de fora, a vista da Terra faz valer o cansaço." },
        { perfil: "A", texto: "Pintar no abrigo um mural com o que a estação quer ser daqui a dez anos.", reacao: "Os moradores começam a acrescentar desenhos ao mural. Ele vira símbolo da recuperação." },
        { perfil: "S", texto: "Organizar rodas de conversa para quem ficou com medo depois da tempestade.", reacao: "Muita gente que estava calada consegue falar. Algumas rodas continuam toda semana." },
        { perfil: "C", texto: "Registrar todos os danos e montar a lista do que consertar primeiro.", reacao: "Com a sua lista, as equipes param de correr em círculos e o conserto anda o dobro." }
      ]
    },
    {
      titulo: "A nave da Travessia",
      texto: "No hangar principal, a nave da Grande Travessia está quase pronta. Ainda falta muita coisa, e cada equipe chama você para um lado.",
      opcoes: [
        { perfil: "R", texto: "Ajudar a montar o motor de manobra da nave.", reacao: "O motor liga no primeiro teste. A equipe do hangar escreve seu nome numa peça." },
        { perfil: "I", texto: "Simular a viagem no computador e procurar falhas no plano de voo.", reacao: "Você encontra um erro de rota que teria custado semanas de viagem." },
        { perfil: "A", texto: "Projetar os espaços internos para a viagem longa ser menos cansativa.", reacao: "As famílias que vão viajar escolhem o seu projeto para as áreas comuns da nave." },
        { perfil: "E", texto: "Buscar patrocinadores na Terra para fechar o orçamento da nave.", reacao: "Uma empresa da Terra fecha o patrocínio depois da sua videochamada." }
      ]
    },
    {
      titulo: "Alguém escondido no hangar",
      texto: "Na inspeção final, a segurança encontra uma pessoa da sua idade escondida num compartimento da nave. Ela não está na lista de passageiros e diz que precisa ir para Marte.",
      opcoes: [
        { perfil: "I", texto: "Descobrir como o sistema de segurança deixou alguém entrar sem alarme.", reacao: "Havia uma falha nas câmeras do hangar. Você descobre antes que outra pessoa a use." },
        { perfil: "A", texto: "Ajudar a pessoa a gravar um vídeo contando a própria história ao conselho.", reacao: "O vídeo emociona o conselho. Muita gente muda de opinião depois de assistir." },
        { perfil: "S", texto: "Conversar com calma e entender por que ela quer tanto ir.", reacao: "A família dela já está em Marte. Agora o caso deixa de ser uma invasão e vira um reencontro." },
        { perfil: "E", texto: "Defender no conselho que ela tenha a chance de se candidatar oficialmente.", reacao: "Você convence o conselho a abrir uma vaga de última hora, com entrevista e tudo." }
      ]
    },
    {
      titulo: "A véspera da partida",
      texto: "É a última noite antes da Travessia. A estação inteira está acordada: tem festa, despedida, choro e gente correndo para resolver os últimos detalhes.",
      opcoes: [
        { perfil: "R", texto: "Fazer a última inspeção nos cabos e travas da plataforma de lançamento.", reacao: "Você acha uma trava frouxa às duas da manhã e aperta antes de alguém perceber." },
        { perfil: "A", texto: "Criar o show de luzes que vai acompanhar a partida.", reacao: "Quando a nave sair, sua luz vai ser vista até da Terra." },
        { perfil: "S", texto: "Ajudar as famílias que vão viajar a se despedir de quem fica.", reacao: "Você grava mensagens de quem fica para os viajantes ouvirem no caminho." },
        { perfil: "E", texto: "Fazer o discurso de despedida em nome da estação.", reacao: "A estação inteira aplaude de pé. Seu discurso vai junto com a nave para Marte." }
      ]
    },
    {
      titulo: "Depois da partida",
      texto: "A nave partiu, e deu tudo certo. Agora o conselho de Órion oferece a você um lugar fixo na estação. Qual você escolhe?",
      opcoes: [
        { perfil: "R", texto: "A oficina orbital, onde se constroem naves, robôs e módulos novos.", reacao: "Na oficina, já tem um traje com o seu nome pendurado na parede." },
        { perfil: "I", texto: "O laboratório, estudando estrelas, plantas e a saúde no espaço.", reacao: "Os cientistas te recebem com uma lista de perguntas que ninguém conseguiu responder." },
        { perfil: "S", texto: "O centro de acolhimento, cuidando de quem chega e de quem fica.", reacao: "No primeiro dia, você já recebe uma família que acabou de subir pelo elevador." },
        { perfil: "C", texto: "A central de operações, que mantém a estação inteira funcionando no horário.", reacao: "Você recebe acesso ao painel principal. Daqui em diante, nada sai do lugar sem você saber." }
      ]
    }
  ]
});
