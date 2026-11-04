// Mundo: Reino de Valdora (medieval)
//
// Regras para escrever um mundo (conferidas por jogo.html?teste&verificar):
// - 15 cenas com 4 opções; cada opção tem um perfil RIASEC (R, I, A, S, E, C).
// - Cada cena deixa 2 perfis de fora, e cada um dos 15 pares possíveis fica de fora
//   exatamente uma vez. Assim cada perfil aparece 10 vezes no mundo.
// - Nenhuma opção pode parecer a "certa": todas devem ser atraentes, sem bem contra mal.
// - Texto da cena com até ~280 caracteres; opção até ~90; reação até ~140.
// - O personagem é só visual. Os títulos não têm gênero ("Mão da Forja", não "Ferreiro").
// - "noMundo" é o nome com a preposição certa, usado na revelação ("no Reino de Valdora").
// - Use só emojis antigos (até a versão 11): sem combinações com cabelo (🧑‍🦱) e sem
//   emojis recentes (🪶, 🪄…), que aparecem quebrados no Windows 10 e em Androids antigos.

window.MUNDOS = window.MUNDOS || [];
window.MUNDOS.push({
  id: "medieval",
  nome: "Reino de Valdora",
  noMundo: "no Reino de Valdora",
  genero: "Medieval",
  emoji: "🏰",
  resumo: "Um reino saindo de um inverno de três anos, e um festival que precisa acontecer.",
  intro: "Valdora acaba de sair de um inverno que durou três anos. A rainha marcou o Festival da Primavera para celebrar, mas estradas, pontes e guildas ainda estão de pé por um fio. Você chega à fronteira sem saber muito bem qual será o seu lugar.",
  acampamento: "A caravana para numa clareira. Em volta da fogueira, alguém propõe uma brincadeira: cada um conta quem é fora desta aventura, na vida real.",
  tema: { a: "#b45309", b: "#7f1d1d" },

  personagens: [
    { nome: "Juno", emoji: "👦🏾", item: "🎒", descricao: "Veio das montanhas com uma mochila e muita curiosidade." },
    { nome: "Iara", emoji: "👩🏽", item: "🛶", descricao: "Cresceu na beira do rio e conhece cada trilha da floresta." },
    { nome: "Teo", emoji: "👱🏻", item: "⚓", descricao: "Trabalhou no porto e já viu navios de todo canto." },
    { nome: "Dandara", emoji: "👩🏿", item: "🏹", descricao: "Chegou do sul com um arco e nenhuma pressa." }
  ],

  titulos: {
    R: { nome: "Mão da Forja", frase: "resolve as coisas com as próprias mãos" },
    I: { nome: "Olho das Estrelas", frase: "quer entender o porquê de tudo" },
    A: { nome: "Voz das Canções", frase: "cria o que ninguém tinha imaginado" },
    S: { nome: "Coração da Vila", frase: "cuida de quem está por perto" },
    E: { nome: "Estandarte do Reino", frase: "toma a frente e convence as pessoas" },
    C: { nome: "Pena das Crônicas", frase: "coloca ordem onde tem bagunça" }
  },

  cenas: [
    {
      titulo: "A ponte rachada",
      texto: "Você chega a Pedralva, a vila na entrada de Valdora. A ponte que liga a vila ao mercado rachou com a cheia do rio, e todo mundo está parado na margem sem saber o que fazer.",
      opcoes: [
        { perfil: "R", texto: "Pegar tábuas e cordas e ajudar a escorar a ponte.", reacao: "Em uma hora a ponte aguenta de novo. O ferreiro da vila te dá um martelo de presente." },
        { perfil: "I", texto: "Examinar a rachadura para entender por que a ponte cedeu.", reacao: "A água tinha corroído os pilares por baixo. O mestre de obras anota tudo o que você explicou." },
        { perfil: "A", texto: "Desenhar o projeto de uma ponte nova, mais bonita e mais forte.", reacao: "Seu desenho passa de mão em mão. Alguém diz que parece uma ponte de conto." },
        { perfil: "S", texto: "Acalmar as famílias presas na margem e cuidar das crianças.", reacao: "As crianças param de chorar, e no fim do dia uma senhora já te chama pelo nome." }
      ]
    },
    {
      titulo: "O mercado em pé de guerra",
      texto: "O mercado de Pedralva virou um caos: comerciantes brigam por espaço, ninguém sabe o preço justo do trigo depois do inverno e a fila do poço não anda.",
      opcoes: [
        { perfil: "I", texto: "Comparar os preços das bancas e descobrir por que o trigo encareceu.", reacao: "Um moinho quebrou rio acima. Quando você conta isso, as brigas por preço diminuem." },
        { perfil: "S", texto: "Ouvir os comerciantes e ajudar a resolver as brigas entre eles.", reacao: "Duas famílias que não se falavam há anos acabam dividindo uma banca." },
        { perfil: "E", texto: "Reunir os comerciantes e propor uma feira com turnos para cada um.", reacao: "Eles topam, com uma condição: você coordena o primeiro dia." },
        { perfil: "C", texto: "Fazer um mapa das bancas e uma escala de horários para o poço.", reacao: "A fila some. Seu mapa vai parar pregado na porta da taverna." }
      ]
    },
    {
      titulo: "A caravana",
      texto: "Uma caravana vai partir para Aldemar, a capital, e aceita levar você. Antes de sair, a líder pergunta: \"Como você pode ajudar na viagem?\"",
      opcoes: [
        { perfil: "R", texto: "Cuidar dos cavalos e checar as rodas das carroças.", reacao: "Uma roda estava quase solta. Você evita um acidente logo no primeiro dia." },
        { perfil: "A", texto: "Animar as noites com histórias e músicas na fogueira.", reacao: "Na terceira noite, até os guardas mais sérios pedem bis." },
        { perfil: "E", texto: "Negociar com os comerciantes das vilas no caminho.", reacao: "Você consegue comida mais barata, e a líder te oferece uma parte do lucro." },
        { perfil: "C", texto: "Organizar os suprimentos e controlar o que entra e o que sai.", reacao: "Graças à sua lista, ninguém passa fome no trecho mais longo da estrada." }
      ]
    },
    {
      titulo: "Febre na estrada",
      texto: "No quarto dia, metade da caravana amanhece com febre. O curandeiro mais próximo mora a dois dias de distância, e ninguém sabe o que causou isso.",
      opcoes: [
        { perfil: "R", texto: "Buscar ervas e lenha na floresta e montar abrigos para os doentes.", reacao: "Antes do anoitecer, todos estão protegidos do frio e com chá quente." },
        { perfil: "I", texto: "Investigar o que todo mundo comeu e bebeu para achar a causa.", reacao: "Era a água de um poço. Você avisa a tempo de proteger quem ainda não tinha bebido." },
        { perfil: "S", texto: "Ficar com os doentes, dar água e fazer companhia durante a noite.", reacao: "Ninguém passa a noite sozinho. De manhã, a febre de vários já baixou." },
        { perfil: "E", texto: "Montar um grupo a cavalo e trazer o curandeiro até a caravana.", reacao: "Você convence três pessoas a ir junto e volta com o curandeiro em tempo recorde." }
      ]
    },
    {
      titulo: "A torre dos livros",
      texto: "Vocês param numa torre antiga cheia de livros mofados. Dizem que ali estão os registros de como Valdora sobreviveu ao último grande inverno, cem anos atrás.",
      opcoes: [
        { perfil: "I", texto: "Ler os registros e descobrir o que funcionou da última vez.", reacao: "Você encontra um jeito antigo de guardar sementes que pode salvar a próxima colheita." },
        { perfil: "A", texto: "Copiar as ilustrações dos livros antes que se percam de vez.", reacao: "Seus desenhos ficam tão bons que a guilda dos escribas quer conhecer você." },
        { perfil: "S", texto: "Ensinar as crianças da caravana a ler com os livros que dá para salvar.", reacao: "Na volta para a estrada, uma das crianças lê uma história em voz alta para todos." },
        { perfil: "C", texto: "Catalogar os livros e decidir quais levar para a capital.", reacao: "Sua lista vira o primeiro inventário da torre em cem anos." }
      ]
    },
    {
      titulo: "Gente na estrada",
      texto: "Um grupo bloqueia a passagem. Não são bandidos: são famílias que perderam a vila na cheia e estão sem rumo, com fome e desconfiadas da caravana.",
      opcoes: [
        { perfil: "R", texto: "Usar a madeira da caravana para ajudar a montar abrigos para eles.", reacao: "Em uma tarde o acampamento deles fica de pé, e a desconfiança vai embora." },
        { perfil: "I", texto: "Conversar e entender o que aconteceu com a vila deles.", reacao: "A cheia veio de uma represa mal construída. Agora o conselho vai precisar ouvir isso." },
        { perfil: "A", texto: "Criar um estandarte novo que represente os dois grupos viajando juntos.", reacao: "O estandarte tremula na frente da caravana, e os dois grupos começam a se misturar." },
        { perfil: "E", texto: "Propor um acordo: eles seguem com a caravana em troca de ajuda na estrada.", reacao: "O acordo é fechado com um aperto de mão. A caravana agora é o dobro do tamanho." }
      ]
    },
    {
      titulo: "As guildas de Aldemar",
      texto: "Finalmente, a capital! Faltam poucos dias para o festival, e cada guilda está atrás de gente para ajudar. Você só tem tempo para uma delas.",
      opcoes: [
        { perfil: "R", texto: "A guilda dos ferreiros, que está forjando as estruturas do festival.", reacao: "Calor, faíscas e barulho. No fim do dia, você ajudou a erguer o portal da praça." },
        { perfil: "A", texto: "A guilda dos artistas, que pinta os estandartes e os cenários.", reacao: "Você recebe um pincel e uma parede inteira para pintar como quiser." },
        { perfil: "S", texto: "A casa de cura, lotada com quem chegou doente da viagem.", reacao: "Os curadores agradecem: chegou mais gente do que eles conseguiam atender." },
        { perfil: "C", texto: "A tesouraria, que precisa registrar todas as doações do festival.", reacao: "Pela primeira vez, a tesouraria sabe exatamente quanto tem e para onde vai." }
      ]
    },
    {
      titulo: "O conselho da guilda",
      texto: "Sua guilda precisa apresentar uma atração para o festival, e o conselho quer ouvir a sua ideia antes de decidir.",
      opcoes: [
        { perfil: "I", texto: "Pesquisar o que deu certo nos festivais antigos antes de propor algo.", reacao: "Você chega com fatos que ninguém conhecia, e o conselho ouve com atenção." },
        { perfil: "A", texto: "Inventar uma atração que ninguém em Valdora jamais viu.", reacao: "Sua ideia é tão diferente que metade do conselho ri e a outra metade fica fascinada." },
        { perfil: "E", texto: "Defender sua ideia na frente de todos e convencer quem duvida.", reacao: "Você termina o discurso e a votação é quase unânime." },
        { perfil: "C", texto: "Montar o plano com custos, prazos e quem faz o quê.", reacao: "O conselho aprova na hora: é a primeira proposta que diz exatamente como vai funcionar." }
      ]
    },
    {
      titulo: "O relógio parado",
      texto: "O grande relógio da praça parou. Sem ele, ninguém sabe a hora das cerimônias, e o festival depende disso.",
      opcoes: [
        { perfil: "R", texto: "Subir na torre e consertar as engrenagens.", reacao: "Graxa até os cotovelos, mas o relógio volta a bater. A praça inteira aplaude." },
        { perfil: "I", texto: "Descobrir qual peça falhou e por quê, antes de mexer em qualquer coisa.", reacao: "Era uma mola gasta pelo frio. Agora todo mundo sabe o que vigiar nos próximos invernos." },
        { perfil: "S", texto: "Ensinar os aprendizes da torre a cuidar do relógio daqui para frente.", reacao: "Os aprendizes ganham confiança. Um deles diz que agora quer ser relojoeiro." },
        { perfil: "C", texto: "Criar uma tabela de horários marcada por sinos enquanto o relógio não volta.", reacao: "Os sinos tocam na hora certa, e ninguém perde uma cerimônia." }
      ]
    },
    {
      titulo: "Uma carta sem assinatura",
      texto: "Você recebe uma carta anônima: alguém planeja sabotar o festival. Pouca gente acredita, mas o aviso parece sério.",
      opcoes: [
        { perfil: "R", texto: "Fazer a ronda pelas barracas e checar cada estrutura de perto.", reacao: "Você encontra cordas cortadas no palco principal e troca tudo antes que alguém se machuque." },
        { perfil: "A", texto: "Criar um disfarce e circular pelo festival sem ser notado.", reacao: "Ninguém te reconhece. Você ouve conversas que jamais ouviria de outro jeito." },
        { perfil: "S", texto: "Conversar com a gente da cidade: quem sabota às vezes está desesperado.", reacao: "Você descobre um artesão endividado e ajuda a resolver o problema antes que ele faça besteira." },
        { perfil: "E", texto: "Levar a carta ao conselho e exigir que montem uma guarda.", reacao: "Você convence o conselho, e a guarda fica de prontidão durante toda a festa." }
      ]
    },
    {
      titulo: "O cofre vazio",
      texto: "A guilda gastou mais do que devia, e faltam moedas para terminar os preparativos do festival.",
      opcoes: [
        { perfil: "A", texto: "Criar peças únicas para vender no próprio festival.", reacao: "Suas peças acabam em uma hora. Alguém já encomenda mais para o ano que vem." },
        { perfil: "S", texto: "Chamar vizinhos e voluntários para um mutirão em troca de comida e festa.", reacao: "Aparece tanta gente que o trabalho termina um dia antes." },
        { perfil: "E", texto: "Procurar uma família nobre e convencê-la a patrocinar o festival.", reacao: "Depois de uma longa conversa, você sai com o patrocínio e o nome da família no estandarte." },
        { perfil: "C", texto: "Revisar as contas da guilda e cortar o que não é essencial.", reacao: "Você acha gastos repetidos e o dinheiro passa a dar, com sobra." }
      ]
    },
    {
      titulo: "O dragão de papel",
      texto: "A grande atração é um dragão de papel e madeira que deve voar sobre a praça. No teste final, ele não sai do chão.",
      opcoes: [
        { perfil: "R", texto: "Reforçar a estrutura e trocar as varetas mais pesadas.", reacao: "Mais leve e firme, o dragão sobe meio metro. Já é um começo." },
        { perfil: "I", texto: "Medir o vento e calcular quanto peso ele aguenta.", reacao: "Seus cálculos mostram exatamente quanto ele precisa perder. Na próxima tentativa, ele voa." },
        { perfil: "A", texto: "Redesenhar as asas para ficarem mais leves e mais bonitas.", reacao: "As novas asas parecem de verdade. Quando o vento bate, o dragão quase ganha vida." },
        { perfil: "C", texto: "Listar cada peça e testar uma por vez, em ordem.", reacao: "Na peça número 37 você encontra o problema: uma junta presa. Resolvido." }
      ]
    },
    {
      titulo: "A véspera",
      texto: "Na noite antes do festival chega uma notícia: uma tempestade pode atingir a cidade amanhã. O conselho está dividido.",
      opcoes: [
        { perfil: "I", texto: "Observar o céu e os ventos para prever se a tempestade vem mesmo.", reacao: "Pelos seus cálculos, ela passa ao norte. Na manhã seguinte, você acerta." },
        { perfil: "A", texto: "Repensar o festival para acontecer sob as arcadas, com luzes e música.", reacao: "A nova versão fica tão bonita que muita gente prefere ela à original." },
        { perfil: "S", texto: "Garantir que idosos e crianças tenham onde se abrigar, se precisar.", reacao: "Ninguém fica desprotegido. As famílias dormem mais tranquilas." },
        { perfil: "E", texto: "Convencer o conselho a manter o festival e assumir a responsabilidade.", reacao: "Você bate o martelo. É arriscado, mas o conselho confia em você." }
      ]
    },
    {
      titulo: "O grande dia",
      texto: "O festival começou! Milhares de pessoas na praça, música por todo lado, e tudo pode dar muito certo… ou muito errado.",
      opcoes: [
        { perfil: "R", texto: "Ficar nos bastidores consertando tudo o que quebra na hora.", reacao: "Três barracas, um palco e uma roda-gigante de madeira: tudo segue de pé graças a você." },
        { perfil: "S", texto: "Ficar na tenda de acolhida, cuidando de quem se perde ou passa mal.", reacao: "Você reúne cinco crianças perdidas com as famílias antes do pôr do sol." },
        { perfil: "E", texto: "Subir ao palco e abrir o festival com um discurso.", reacao: "A praça inteira grita junto. É um começo que ninguém vai esquecer." },
        { perfil: "C", texto: "Coordenar o horário de cada apresentação, de relógio na mão.", reacao: "Nada atrasa nem um minuto. Os artistas juram que nunca viram nada igual." }
      ]
    },
    {
      titulo: "Depois da festa",
      texto: "O festival foi um sucesso. A rainha quer agradecer e oferece a você um lugar em Valdora. Qual você escolhe?",
      opcoes: [
        { perfil: "R", texto: "A oficina real, onde se constroem pontes, máquinas e barcos.", reacao: "Na oficina, já tem uma bancada com o seu nome esperando por você." },
        { perfil: "I", texto: "O observatório, onde se estudam as estrelas, as plantas e os remédios.", reacao: "Os sábios do observatório te recebem com uma pilha de perguntas sem resposta." },
        { perfil: "E", texto: "Uma cadeira no conselho, para ajudar a decidir o futuro do reino.", reacao: "Na primeira reunião, você já tem três propostas na mesa." },
        { perfil: "C", texto: "O arquivo real, cuidando dos registros e das leis do reino.", reacao: "Você recebe a chave do arquivo e a missão de nunca deixar Valdora esquecer sua história." }
      ]
    }
  ]
});
