// Mundo: Refúgio Alvorada (apocalíptico, sobrevivência)
// Mundo original no gênero "sobrevivência depois de uma epidemia": não usa personagens,
// nomes ou termos de nenhuma série ou filme. Público a partir de 15 anos: tensão no clima,
// sem violência explícita, e nenhuma opção é atacar alguém. O foco é sobreviver e reconstruir.
// Segue as regras de escrita do topo de data/mundos/medieval.js.
// Pares de perfis que cada cena deixa de fora, na ordem das cenas:
// IS, RC, AE, SC, RI, AC, IE, RS, EC, IA, RE, AS, IC, RA, SE (os 15 pares, uma vez cada).

window.MUNDOS = window.MUNDOS || [];
window.MUNDOS.push({
  id: "apocaliptico",
  nome: "Refúgio Alvorada",
  noMundo: "no Refúgio Alvorada",
  genero: "Apocalíptico",
  emoji: "🏚️",
  resumo: "Um ano depois do Apagão Cinza, uma escola virou refúgio. Sobreviver é só o começo.",
  intro: "Faz um ano do Apagão Cinza, a epidemia que esvaziou as cidades. Quem foi infectado virou um oco: anda sem rumo, não reconhece ninguém e segue qualquer barulho. Numa escola cercada no alto de um morro, cerca de oitenta pessoas formaram o Refúgio Alvorada. Você acaba de chegar ao portão, com uma mochila e muitas perguntas.",
  acampamento: "Noite de lua cheia. No telhado da escola, com a cidade escura lá embaixo, o grupo faz uma promessa: cada um conta quem era antes de tudo isso, na vida real.",
  tema: { a: "#57534e", b: "#7f1d1d" },

  personagens: [
    { nome: "Mel", emoji: "👩🏼", item: "🔦", descricao: "Atravessou a cidade sozinha, de noite, só com uma lanterna." },
    { nome: "Benê", emoji: "👦🏿", item: "🔧", descricao: "Consertava bicicletas no bairro e não larga a chave inglesa." },
    { nome: "Yuki", emoji: "👧🏻", item: "📻", descricao: "Passa horas no rádio procurando outras vozes." },
    { nome: "Zé", emoji: "👨🏾", item: "🐕", descricao: "Chegou com um cachorro que nunca sai do lado dele." }
  ],

  titulos: {
    R: { nome: "Mão da Barricada", frase: "resolve as coisas com as próprias mãos" },
    I: { nome: "Olho da Torre", frase: "quer entender o porquê de tudo" },
    A: { nome: "Cor do Recomeço", frase: "cria o que ninguém tinha imaginado" },
    S: { nome: "Abraço do Refúgio", frase: "cuida de quem está por perto" },
    E: { nome: "Voz da Alvorada", frase: "toma a frente e convence as pessoas" },
    C: { nome: "Diário do Refúgio", frase: "coloca ordem onde tem bagunça" }
  },

  cenas: [
    {
      titulo: "O portão",
      texto: "Os guardas do portão olham você de cima a baixo. A regra do refúgio é clara: quem entra precisa ajudar. \"O que você sabe fazer?\", pergunta a guarda mais velha.",
      opcoes: [
        { perfil: "R", texto: "Mostrar que dá para consertar o próprio portão, que range e quase não fecha.", reacao: "Com um pouco de graxa e um parafuso novo, o portão fecha em silêncio. Você está dentro." },
        { perfil: "A", texto: "Pintar no muro de fora um sinal que avise outros sobreviventes que ali é seguro.", reacao: "Dois dias depois, uma família chega dizendo que viu o seu sinal de longe." },
        { perfil: "E", texto: "Convencer os guardas de que seu grupo vai somar, e não pesar.", reacao: "A guarda mais velha sorri pela primeira vez e abre o portão." },
        { perfil: "C", texto: "Abrir a mochila, listar o que você traz e propor como dividir.", reacao: "Sua lista impressiona: ninguém ali tinha pensado em contar as pilhas." }
      ]
    },
    {
      titulo: "A horta no telhado",
      texto: "A comida enlatada está acabando, e o refúgio precisa plantar. O problema: sobrou pouco espaço seguro dentro da cerca.",
      opcoes: [
        { perfil: "I", texto: "Descobrir quais sementes crescem mais rápido com pouca água.", reacao: "Em três semanas, os primeiros brotos aparecem. Você acertou na escolha." },
        { perfil: "A", texto: "Projetar uma horta em degraus no telhado da escola.", reacao: "Seu projeto triplica o espaço de plantio. Do alto, o telhado virou um jardim." },
        { perfil: "S", texto: "Ensinar as crianças do refúgio a cuidar da horta.", reacao: "As crianças agora disputam quem rega primeiro. A horta virou o lugar preferido delas." },
        { perfil: "E", texto: "Convencer o conselho a transformar o ginásio em estufa.", reacao: "Depois de uma reunião difícil, o conselho aprova. O ginásio vira a maior horta do refúgio." }
      ]
    },
    {
      titulo: "Barulho na cerca",
      texto: "De madrugada, uma lata cai lá fora e o barulho atrai um grupo de ocos para a cerca dos fundos. Eles não conseguem entrar, mas a cerca está velha.",
      opcoes: [
        { perfil: "R", texto: "Reforçar a cerca com tábuas e arame antes que ela ceda.", reacao: "Quando o sol nasce, a cerca está mais firme do que nunca, e os ocos já foram embora." },
        { perfil: "I", texto: "Observar do alto o que atrai os ocos e o que faz eles irem embora.", reacao: "Você percebe que eles seguem o som mais forte. Isso muda o jeito de proteger o refúgio." },
        { perfil: "S", texto: "Acalmar as crianças que acordaram assustadas com o barulho.", reacao: "Você conta uma história baixinho até todas dormirem de novo." },
        { perfil: "C", texto: "Organizar os turnos de vigia da noite para isso não se repetir.", reacao: "Com a escala nova, sempre tem alguém de olho nos fundos." }
      ]
    },
    {
      titulo: "O gerador",
      texto: "O gerador que mantém a geladeira dos remédios funcionando começa a falhar, e o combustível está no fim.",
      opcoes: [
        { perfil: "R", texto: "Desmontar o gerador e consertar o que estiver gasto.", reacao: "Era uma peça entupida. O gerador volta a roncar, e os remédios estão salvos." },
        { perfil: "I", texto: "Calcular quanta energia cada parte do refúgio gasta de verdade.", reacao: "Seus cálculos mostram onde economizar. O combustível passa a durar o dobro." },
        { perfil: "A", texto: "Inventar um gerador de vento com peças de sucata.", reacao: "Ninguém acreditava, mas a hélice de ventilador velho gira e acende as luzes da enfermaria." },
        { perfil: "E", texto: "Negociar combustível com o refúgio do outro lado do vale.", reacao: "Você troca sementes por combustível, e ainda volta com um aliado." }
      ]
    },
    {
      titulo: "A enfermaria",
      texto: "A enfermaria do refúgio é uma sala de aula com seis camas. Os remédios estão acabando, e o único enfermeiro está exausto.",
      opcoes: [
        { perfil: "A", texto: "Deixar a enfermaria menos assustadora, com cor, luz e desenhos.", reacao: "Os pacientes dizem que dá vontade de melhorar só de olhar as paredes." },
        { perfil: "S", texto: "Ajudar o enfermeiro a cuidar dos doentes durante a semana.", reacao: "O enfermeiro finalmente consegue dormir uma noite inteira." },
        { perfil: "E", texto: "Organizar uma expedição até a farmácia abandonada da cidade.", reacao: "Você convence quatro voluntários. A expedição volta com remédios para meses." },
        { perfil: "C", texto: "Catalogar todos os remédios, com quantidade e validade.", reacao: "Você descobre uma caixa inteira de antibióticos esquecida no armário." }
      ]
    },
    {
      titulo: "Ida à cidade",
      texto: "A expedição à cidade vai sair. A caminhonete é barulhenta, as ruas estão bloqueadas, e qualquer barulho pode atrair ocos.",
      opcoes: [
        { perfil: "R", texto: "Ajustar o motor e o escapamento da caminhonete para fazer menos barulho.", reacao: "A caminhonete passa pelas ruas quase em silêncio." },
        { perfil: "I", texto: "Estudar o mapa e escolher as ruas mais vazias e silenciosas.", reacao: "Sua rota evita três quarteirões cheios de ocos. Ninguém nem chega perto deles." },
        { perfil: "S", texto: "Cuidar do grupo, principalmente de quem nunca saiu da cerca.", reacao: "O mais novo do grupo diz que só conseguiu ir porque você estava junto." },
        { perfil: "E", texto: "Liderar a expedição e decidir a hora de voltar.", reacao: "Você manda voltar na hora certa, e todo mundo chega bem antes de escurecer." }
      ]
    },
    {
      titulo: "Os desconhecidos",
      texto: "Uma família que ninguém conhece aparece no portão: um casal, duas crianças e uma avó. Eles falam pouco português e pedem para entrar.",
      opcoes: [
        { perfil: "R", texto: "Montar para eles um alojamento provisório perto do portão.", reacao: "Em algumas horas, a família tem um lugar seco e seguro para dormir." },
        { perfil: "A", texto: "Usar desenhos e gestos para conversar com eles.", reacao: "Com seus desenhos, você descobre que eles vieram de longe e que a avó é médica." },
        { perfil: "S", texto: "Ouvir a história deles, mesmo com a dificuldade da língua.", reacao: "A avó segura sua mão e agradece em três línguas diferentes." },
        { perfil: "C", texto: "Registrar quem eles são, do que precisam e o que podem oferecer.", reacao: "Seu registro mostra que eles trazem sementes raras. O conselho aprova a entrada na hora." }
      ]
    },
    {
      titulo: "Uma voz no rádio",
      texto: "Numa noite, o rádio pega uma voz fraca: alguém repete coordenadas e diz que existe uma comunidade grande no litoral.",
      opcoes: [
        { perfil: "I", texto: "Descobrir de onde vem o sinal e se as coordenadas fazem sentido.", reacao: "As coordenadas apontam para uma ilha perto da costa. Parece verdade." },
        { perfil: "A", texto: "Criar uma mensagem de resposta que chame atenção no meio do chiado.", reacao: "Sua mensagem é respondida na noite seguinte. Do outro lado, alguém ri de alívio." },
        { perfil: "E", texto: "Falar no rádio e propor uma aliança com o litoral.", reacao: "O líder do litoral aceita conversar toda semana. É o primeiro aliado de longe." },
        { perfil: "C", texto: "Anotar horários e frequências e montar uma rotina de escuta.", reacao: "Com a sua rotina, o refúgio nunca mais perde uma transmissão." }
      ]
    },
    {
      titulo: "A escola reaberta",
      texto: "O refúgio funciona numa escola, mas faz um ano que ninguém tem aula. Os pais pedem para as crianças voltarem a estudar.",
      opcoes: [
        { perfil: "R", texto: "Consertar as carteiras, a lousa e as janelas de uma sala.", reacao: "A sala fica pronta, e as crianças entram como se fosse o primeiro dia de aula." },
        { perfil: "I", texto: "Dar aulas de ciências usando o que existe no refúgio.", reacao: "Você ensina a purificar água com areia e carvão. As crianças contam para todo mundo." },
        { perfil: "A", texto: "Montar uma peça de teatro com as crianças.", reacao: "A peça é a primeira noite de risadas no refúgio desde o Apagão." },
        { perfil: "S", texto: "Acompanhar de perto as crianças que estão mais abaladas.", reacao: "Uma menina que não falava desde que chegou responde a uma pergunta na aula." }
      ]
    },
    {
      titulo: "O inverno chegando",
      texto: "As noites estão cada vez mais frias, e o refúgio nunca passou um inverno inteiro. Falta lenha, falta cobertor, e o estoque de comida preocupa.",
      opcoes: [
        { perfil: "R", texto: "Vedar as janelas e cortar lenha para os dormitórios.", reacao: "Os dormitórios ficam quentinhos, mesmo nas noites de geada." },
        { perfil: "S", texto: "Garantir que os mais velhos e as crianças tenham cobertores.", reacao: "Você recolhe roupas e monta cobertores para todo mundo. Ninguém passa frio." },
        { perfil: "E", texto: "Convencer todos a dividir o estoque em partes iguais.", reacao: "Não é fácil, mas sua proposta passa. O inverno vai ser apertado, mas justo." },
        { perfil: "C", texto: "Calcular quanta comida e lenha precisam durar até a primavera.", reacao: "Com o seu cálculo, o refúgio sabe exatamente quanto pode gastar por dia." }
      ]
    },
    {
      titulo: "A cientista",
      texto: "Uma cientista chega ao refúgio com cadernos cheios de anotações. Ela diz que está perto de entender o vírus do Apagão, mas está esgotada e sozinha.",
      opcoes: [
        { perfil: "I", texto: "Ajudar a cientista nos testes e nas análises.", reacao: "Juntos, vocês descobrem por que algumas pessoas nunca foram infectadas." },
        { perfil: "A", texto: "Explicar a descoberta para o refúgio com desenhos simples, sem espalhar pânico.", reacao: "Pela primeira vez, todo mundo entende o vírus. O medo diminui." },
        { perfil: "S", texto: "Cuidar da cientista, que não come nem dorme direito há dias.", reacao: "Depois de uma noite de sono, ela diz que voltou a pensar com clareza." },
        { perfil: "C", texto: "Organizar os cadernos bagunçados dela em ordem.", reacao: "No meio da bagunça, você acha uma anotação que ela tinha esquecido. Era a peça que faltava." }
      ]
    },
    {
      titulo: "A ponte caída",
      texto: "O conselho estuda levar o refúgio para o litoral, mas a única ponte da estrada caiu. Sem ela, ninguém atravessa o rio.",
      opcoes: [
        { perfil: "R", texto: "Ajudar a reconstruir a ponte com cabos e madeira.", reacao: "Depois de duas semanas de trabalho pesado, a ponte aguenta a caminhonete." },
        { perfil: "I", texto: "Estudar o rio para achar um ponto raso onde dá para atravessar.", reacao: "Você encontra uma passagem rasa que ninguém conhecia. A ponte vira plano B." },
        { perfil: "E", texto: "Convencer o refúgio do vale a ajudar na obra.", reacao: "Dez voluntários do vale aparecem com ferramentas. A obra anda em dobro." },
        { perfil: "C", texto: "Planejar o material e o tempo que a obra vai levar.", reacao: "Com o seu plano, não falta nem sobra madeira." }
      ]
    },
    {
      titulo: "A primeira colheita",
      texto: "A horta deu a primeira colheita de verdade. O refúgio decide fazer uma festa, a primeira desde o Apagão.",
      opcoes: [
        { perfil: "R", texto: "Montar as mesas e um fogão a lenha no pátio.", reacao: "O fogão funciona tão bem que vira o fogão oficial do refúgio." },
        { perfil: "A", texto: "Cuidar da música e da decoração com o que tem à mão.", reacao: "Luzes de pisca-pisca, um violão e um tambor de lata: o pátio fica irreconhecível." },
        { perfil: "S", texto: "Servir a comida e garantir que ninguém fique sem prato.", reacao: "Você leva comida até quem está de vigia no portão. Eles não esquecem." },
        { perfil: "E", texto: "Fazer um discurso para lembrar o quanto o refúgio conquistou.", reacao: "No fim do discurso, até quem estava mais desanimado está sorrindo." }
      ]
    },
    {
      titulo: "A grande decisão",
      texto: "O conselho precisa decidir: ficar no refúgio que já funciona ou atravessar a ponte rumo à comunidade do litoral, maior e mais segura.",
      opcoes: [
        { perfil: "I", texto: "Reunir tudo o que se sabe sobre o litoral antes da votação.", reacao: "Seu levantamento responde às dúvidas de todo mundo, e a votação fica muito mais tranquila." },
        { perfil: "S", texto: "Ouvir quem tem medo de partir e levar essas vozes ao conselho.", reacao: "O conselho decide que quem quiser pode ficar, com rádio e apoio do litoral." },
        { perfil: "E", texto: "Defender a mudança na assembleia e convencer os indecisos.", reacao: "Seu discurso vira a votação. A maioria decide partir na primavera." },
        { perfil: "C", texto: "Montar um plano de mudança, com etapas, grupos e datas.", reacao: "Seu plano é tão claro que a mudança passa a parecer possível." }
      ]
    },
    {
      titulo: "Um ano depois",
      texto: "A nova comunidade no litoral está de pé, e o conselho oferece a você um papel fixo nela. Qual você escolhe?",
      opcoes: [
        { perfil: "R", texto: "A oficina, construindo casas, cercas e máquinas.", reacao: "Sua primeira obra: a casa da família que chegou falando outra língua." },
        { perfil: "I", texto: "O laboratório, continuando a pesquisa sobre o vírus.", reacao: "A cientista guarda para você a bancada ao lado da dela." },
        { perfil: "A", texto: "O ateliê e a rádio, contando a história da Alvorada para quem vier depois.", reacao: "Seu primeiro programa de rádio é ouvido em três comunidades diferentes." },
        { perfil: "C", texto: "O almoxarifado e o planejamento, cuidando para que nada falte.", reacao: "Você recebe a chave do estoque e a confiança de todo mundo." }
      ]
    }
  ]
});
